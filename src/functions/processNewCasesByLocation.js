const FetchInfoFromUrl = require('./fetchInfofromURL')
const DailyDataAll = require('../models/dailyDataAll')
const DailyIncrease = require('../models/dailyIncrease')

const ProcessNewCasesByLocation = async (url, state) => {
    const increaseData = []
    var todaysData = []
    var oldData = []

    const todaysDataRaw = await FetchInfoFromUrl(url)
    if (state == 'NSW') {
        todaysData = await formatNSWData(todaysDataRaw)
    }
    else {
        todaysData = todaysDataRaw
    }

    const oldDataFromDB = await DailyDataAll.findOne({ state }).sort({ date: -1 })
    if (oldDataFromDB) {
        oldData = oldDataFromDB.data
    }

    for (const todaysRow of todaysData) {
        var foundPlace = false

        for (const oldRow of oldData) {
            if (todaysRow.place == oldRow.place) {
                foundPlace = true
                if (todaysRow.count !== oldRow.count) {
                    var caseIncrease = {
                        place: todaysRow.place,
                        count: todaysRow.count - oldRow.count
                    }
                    increaseData.push(caseIncrease)
                }
                else {
                    // just ignore the place 
                }
            }
        }

        if (!foundPlace) {
            var caseIncrease = {
                place: todaysRow.place,
                count: todaysRow.count
            }
            increaseData.push(caseIncrease)
        }
    }

    totalCases = checkTotalCasesByState(todaysData)
    totalIncreasedCases = checkTotalCasesByState(increaseData)

    todaysDataModel = new DailyDataAll({
        date: new Date(),
        state,
        totalCases,
        data: todaysData
    })

    inCreaseDataModel = new DailyIncrease({
        date: new Date(),
        state,
        totalCases: totalIncreasedCases,
        data: increaseData
    })

    todaysDataModel.save()
    inCreaseDataModel.save()

    return increaseData
}

const checkTotalCasesByState = (data) => {
    var totalCases = 0
    for (const place of data) {
        totalCases = totalCases + place.count
    }
    return totalCases
}

const formatNSWData = (data) => {
    var newData = []
    for (const place of data) {
        var newPlace = null
        if (place.count == '1-4') {
            newPlace = {
                place: place.place,
                count: 4
            }
        }
        else {
            newPlace = {
                place: place.place,
                count: parseInt(place.count)
            }
        }
        newData.push(newPlace)
    }

    //Filter out totals row at bottom of NSW data
    lengthArray = newData.length
    newData.length = lengthArray - 1

    return newData
}

module.exports =
{
    ProcessNewCasesByLocation,
    checkTotalCasesByState
}
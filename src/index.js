const express = require('express')
require('./db/mongoose')
const { ProcessNewCasesByLocation, checkTotalCasesByState } = require('./functions/processNewCasesByLocation')
const sendTelegramAlarmBot = require('./telegram/telegram')
var CronJob = require('cron').CronJob
const getCasesRouter = require('./routers/getCases')

const app = express()
const port = process.env.PORT

app.use(express.json())
app.use(getCasesRouter)

app.listen(port, () => {
    console.log('Server is up on port ' + port)
})

var job = new CronJob('00 00 06 * * *', function () {
    main()
}, null, true, 'Australia/Victoria');
job.start();

const main = async () => {
    const newVICCases = await ProcessNewCasesByLocation('https://interactive.guim.co.uk/covidfeeds/victoria.json', 'VIC')
    const newNSWCases = await ProcessNewCasesByLocation('https://interactive.guim.co.uk/covidfeeds/nsw.json', 'NSW')

    const totalNewVICCases = checkTotalCasesByState(newVICCases)
    const totalNewNSWCases = checkTotalCasesByState(newNSWCases)

    var msg = `Daily corona news! \n \nNew Cases in VIC = ${totalNewVICCases} \n`
    for (const place of newVICCases) {
        msg = msg + `- ${place.place} = ${place.count} \n`
    }
    msg = msg + `\nNew Cases in NSW = ${totalNewNSWCases} \n`
    for (const place of newNSWCases) {
        msg = msg + `- ${place.place} = ${place.count} \n`
    }
    sendTelegramAlarmBot(msg, process.env.TEST_TELEGRAM_USERID)
}
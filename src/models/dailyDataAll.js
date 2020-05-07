const mongoose = require('mongoose')

const dailyDataAllSchema = new mongoose.Schema({
    date: {
        type: Date,
        required: true
    },
    state: {
        type: String,
        required: true
    },
    totalCases: {
        type: Number
    },
    data: {}
}, {
    timestamps: true
})

const DailyDataAll = mongoose.model('DailyDataAll', dailyDataAllSchema)

module.exports = DailyDataAll
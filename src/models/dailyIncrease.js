const mongoose = require('mongoose')

const dailyIncreaseSchema = new mongoose.Schema({
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

const DailyIncrease = mongoose.model('DailyIncrease', dailyIncreaseSchema)

module.exports = DailyIncrease
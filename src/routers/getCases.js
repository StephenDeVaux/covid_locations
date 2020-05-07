const express = require('express')
const DailyIncrease = require('../models/dailyIncrease')
const router = new express.Router()

//GET /dayincrease?limit=10&skip=0&sortBy=createdAt:asc
router.get('/dayincrease/:state', async (req, res) => {
    const sort = {}
    if (req.query.sortBy) {
        const parts = req.query.sortBy.split(':')
        sort[parts[0]] = parts[1] === 'desc' ? -1 : 1  //This called a ternary operator
    }
    try {
        const dailyIncrease = await DailyIncrease
        .find({ state: req.params.state})
        .limit(parseInt(req.query.limit))
        .skip(parseInt(req.query.skip))
        .sort(sort)
        if (!dailyIncrease) {
            return res.status(404).send()
        }
        res.send(dailyIncrease)
    } catch (e) {
        res.status(500).send()
    }
})

module.exports = router
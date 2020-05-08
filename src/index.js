const express = require('express')
require('./db/mongoose') 
const ProcessNewCasesByLocation = require('./functions/processNewCasesByLocation')
var CronJob = require('cron').CronJob
const getCasesRouter = require('./routers/getCases')

const app = express()
const port = process.env.PORT 

app.use(express.json())
app.use(getCasesRouter)

app.listen(port, () => {
    console.log('Server is up on port ' + port)
})

var job = new CronJob('00 34 11 * * *', function () {
    ProcessNewCasesByLocation('https://interactive.guim.co.uk/covidfeeds/victoria.json', 'VIC')
    ProcessNewCasesByLocation('https://interactive.guim.co.uk/covidfeeds/nsw.json', 'NSW')
}, null, true, 'Australia/Victoria');
job.start();
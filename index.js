const express = require('express')
require('./src/db/mongoose') 
const ProcessNewCasesByLocation = require('./src/functions/processNewCasesByLocation')
var CronJob = require('cron').CronJob
const getCasesRouter = require('./src/routers/getCases')

const app = express()
const port = 3000 //npmprocess.env.PORT 

app.use(express.json())
app.use(getCasesRouter)

app.listen(port, () => {
    console.log('Server is up on port ' + port)
})

    ProcessNewCasesByLocation('https://interactive.guim.co.uk/covidfeeds/victoria.json', 'VIC')
    ProcessNewCasesByLocation('https://interactive.guim.co.uk/covidfeeds/nsw.json', 'NSW')

// var job = new CronJob('00 30 06 * * *', function () {
//     ProcessNewCasesByLocation('https://interactive.guim.co.uk/covidfeeds/victoria.json', 'VIC')
//     ProcessNewCasesByLocation('https://interactive.guim.co.uk/covidfeeds/nsw.json', 'NSW')
// }, null, true, 'Australia/Victoria');
// job.start();
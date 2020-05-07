require('./src/db/mongoose') //The purpose of this is to ensure that the file runs and that Mongoose then connects to the database
const ProcessNewCasesByLocation = require('./src/functions/processNewCasesByLocation')

ProcessNewCasesByLocation('https://interactive.guim.co.uk/covidfeeds/victoria.json', 'VIC')
ProcessNewCasesByLocation('https://interactive.guim.co.uk/covidfeeds/nsw.json', 'NSW')

console.log('End')



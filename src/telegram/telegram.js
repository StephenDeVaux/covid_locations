const fetch = require('node-fetch')

const send = async (msg, telegramUserID, telegramBotId) => {
    return new Promise((resolve, reject) => {
        fetch(`https://api.telegram.org/bot${telegramBotId}/sendMessage?chat_id=${telegramUserID}&text=${encodeURIComponent(msg)}`)
            .then(res => {
                if (res.ok) { // res.status >= 200 && res.status < 300
                    resolve(res.status)
                } else {
                    resolve(res.status)
                    // reject('Unable to send telegram') //removed so dont have unhandled promises
                }
            })
    })
}

const sendTelegramAlarmBot = async (msg, telegramUserID) => {
    return send(msg, telegramUserID, process.env.TELEGRAM_BOT_ID_ALARM)
}

module.exports = sendTelegramAlarmBot
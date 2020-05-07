const request = require('request')

let FetchInfoFromURL = (url) => {
    return new Promise(
        (resolve, reject) => {
            request.get({ url, json: true }, function (error, response, data) {
                if (error) reject(error);
                resolve(data);
            })
        }
    );
};

module.exports = FetchInfoFromURL
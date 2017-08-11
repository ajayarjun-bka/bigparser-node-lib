const request = require('request');

var rest = {

    // Generic method to make post calls and response is returned through callback. 

     post: function (uri, headers, data, callback) {
        request.post({
            url: uri,
            json: true,
            headers: headers,
            body: data
        }, (error, response, body) => {
            if (error) {
                callback('Unable to connect to server');
            } else if (response.statusCode === 400) {
                if(body.errorMessage){
                    callback(body.errorMessage);
                }
                else{
                callback(body);
                }
            } else if (response.statusCode === 200) {
                callback(undefined, {
                    body:body
                });
            }
        });
    },

    // Generic method to make get calls and response is returned through callback. 

    get: function (uri, headers, callback) {
        request.get({
            url: uri,
            json: true,
            headers: headers
        }, (error, response, body) => {
            if (error) {
                callback('Unable to connect to server');
            } else if (response.statusCode === 400) {
                if (body.errorMessage) {
                    callback(body.errorMessage);
                } else {
                    callback(body);
                }
            } else if (response.statusCode === 200) {
                callback(undefined, {
                    body: body
                });
            }
        });
    }
}


module.exports = rest;
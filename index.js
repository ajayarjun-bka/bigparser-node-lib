class Grid {

    constructor(email, password, gridId, callback) {
        this.rest = require('./rest');
        this.email = email;
        this.password = password;
        this.gridId = gridId;
        this.login(email, password, function (authId) {
            callback(authId)
        })
    }

    login(email, password, callback) {
        console.log("Logging into: " + email);
        var uri = "https://www.bigparser.com/APIServices/api/common/login";
        var data = {
            'emailId': email,
            'password': password
        }
        var headers = {
            'content-type': 'application/json'
        }
        this.rest.post(uri, headers, data, (errorMessage, response) => {
            if (errorMessage) {
                console.log(errorMessage);
            } else {
                this.authId = response.body.authId;
                callback();
            }
        });
    }

    getHeaders(callback) {
        var headers = {
            authId: this.authId
        };
        var uri = `https://www.bigparser.com/APIServices/api/grid/headers?gridId=${this.gridId}`;
        this.rest.get(uri, headers, function (errorMessage, response) {
            if (errorMessage) {
                console.log(errorMessage);
            } else {
                callback(response.body.columns);
            }
        });
    }



    getRows(parameters, callback) {
        var gridId = this.gridId;
        var authId = this.authId;
        var rest = this.rest;
        this.getHeaders(function (result) {
            var data = {};
            if (parameters) {
                if (parameters.hasOwnProperty('search')) {
                    for (var key in parameters.search) {
                        for (var json in result) {
                            if (result[json]['columnName'].toLowerCase() == key.toLowerCase()) {
                                var val = parameters.search[key];
                                data[result[json]['columnStoreName']] = val;
                            }
                        }
                    }
                    if (parameters.search.hasOwnProperty('global')) {
                        parameters.keywords = parameters.search.global;
                        delete parameters.search.global;
                    }
                    parameters.search = data;
                    if (Object.keys(parameters.search).length != 0) {
                        for (var key in parameters.search) {
                            parameters.tags = [];
                            for (var tagentry in parameters.search[key]) {
                                parameters.tags.push({
                                    "columnValue": parameters.search[key][tagentry],
                                    "columnStoreName": key
                                });
                            }
                        }
                    }
                }
                delete parameters.search
                if (parameters.hasOwnProperty('sort')) {
                    var sortkeys = []
                    for (var key in parameters.sort) {
                        for (var json in result) {
                            if (result[json]['columnName'].toLowerCase() === key.toLowerCase()) {
                                var temp = {};
                                temp['columnStoreName'] = result[json]['columnStoreName'];
                                var val = parameters.sort[key];
                                if (val === "ASC") {
                                    temp['ascending'] = true
                                } else if (val === "DSC") {
                                    temp['ascending'] = false;
                                }
                                sortkeys.push(temp);
                            }
                        }
                    }
                    parameters.sortKeys = sortkeys;
                }
                delete parameters.sort
                if (parameters.hasOwnProperty('columns')) {
                    var columns = []
                    for (key in parameters.columns) {
                        for (var json in result) {
                            if (result[json]['columnName'].toLowerCase() === parameters.columns[key].toLowerCase()) {
                                columns.push(result[json]['columnStoreName']);
                            }
                        }
                    }
                    parameters.selectColumnsStoreName = columns;
                }
                delete parameters.columns
            } else {
                parameters = {}
            }
            parameters.gridId = gridId;
            var headers = {
                "authId": authId
            };
            var uri = "https://www.bigparser.com/APIServices/api/query/table";
            rest.post(uri, headers, parameters, function (errorMessage, response) {
                if (errorMessage) {
                    console.log(errorMessage);
                } else {
                    if (response.body.rows == undefined) {
                        callback("your request did not return any results. please review your parameters");
                    } else {
                        callback(response.body.rows);
                    }
                }
            });
        });
    }

    getLastRow(parameters, callback) {
        var gridId = this.gridId;
        var authId = this.authId;
        var rest = this.rest;
        this.getHeaders(function (result) {
            var data = {};
            if (parameters) {
                if (parameters.hasOwnProperty('search')) {
                    for (var key in parameters.search) {
                        for (var json in result) {
                            if (result[json]['columnName'].toLowerCase() == key.toLowerCase()) {
                                var val = parameters.search[key];
                                data[result[json]['columnStoreName']] = val;
                            }
                        }
                    }
                    if (parameters.search.hasOwnProperty('global')) {
                        parameters.keywords = parameters.search.global;
                        delete parameters.search.global;
                    }
                    parameters.search = data;
                    if (Object.keys(parameters.search).length != 0) {
                        for (var key in parameters.search) {
                            parameters.tags = [];
                            for (var tagentry in parameters.search[key]) {
                                parameters.tags.push({
                                    "columnValue": parameters.search[key][tagentry],
                                    "columnStoreName": key
                                });
                            }
                        }
                    }
                }
                delete parameters.search
                if (parameters.hasOwnProperty('sort')) {
                    var sortkeys = []
                    for (var key in parameters.sort) {
                        for (var json in result) {
                            if (result[json]['columnName'].toLowerCase() === key.toLowerCase()) {
                                var temp = {};
                                temp['columnStoreName'] = result[json]['columnStoreName'];
                                var val = parameters.sort[key];
                                if (val === "ASC") {
                                    temp['ascending'] = true
                                } else if (val === "DSC") {
                                    temp['ascending'] = false;
                                }
                                sortkeys.push(temp);
                            }
                        }
                    }
                    parameters.sortKeys = sortkeys;
                }
                delete parameters.sort
                if (parameters.hasOwnProperty('columns')) {
                    var columns = []
                    for (key in parameters.columns) {
                        for (var json in result) {
                            if (result[json]['columnName'].toLowerCase() === parameters.columns[key].toLowerCase()) {
                                columns.push(result[json]['columnStoreName']);
                            }
                        }
                    }
                    parameters.selectColumnsStoreName = columns;
                }
                delete parameters.columns
            } else {
                parameters = {}
            }
            parameters.gridId = gridId;
            var headers = {
                "authId": authId
            };
            var uri = "https://www.bigparser.com/APIServices/api/query/table";
            rest.post(uri, headers, parameters, function (errorMessage, response) {
                if (errorMessage) {
                    console.log(errorMessage);
                } else {
                    var count = response.body.count
                    uri = `https://www.bigparser.com/APIServices/api/query/table?startIndex=${count}&endIndex=${count}`
                    delete parameters.rowCount;
                    rest.post(uri, headers, parameters, function (errorMessage, response) {
                        if (errorMessage) {
                            console.log(errorMessage);
                        } else {
                            if (response.body.rows == undefined) {
                                callback("your request did not return any results. please review your parameters");
                            } else {
                                callback(response.body.rows);
                            }
                        }
                    });
                }
            });
        });
    }


    fullSignUp(emailId, password, fullname, mobilenumber, srcname, visitId, callback) {
        this.masterSignUp(emailId, password, fullname, mobilenumber, srcname, visitId, function (result) {
            callback(result);
        });
    }

    signUp(emailId, password, fullname) {
        this.masterSignUp(emailId, password, fullname, null, null, null, function (result) {
            callback(result);
        });
    }


    masterSignUp(emailId, password, fullName, mobileNumber, srcName, visitId, callback) {
        console.log("Signing Up: " + fullName);
        data = {};
        headers = {
            'content-type': 'application/json'
        }
        var uri = "https://www.bigparser.com/APIServices/api/common/signup";
        data.emailId = emailId;
        data.password = password;
        data.fullName = fullName;
        if (mobileNumber != null) data.mobileNumber = mobileNumber;
        if (srcName != null) data.srcName = srcName
        if (visitId != null) data.visitId = visitId
        request.post({
            url: uri,
            json: true,
            headers: headers,
            body: data
        }, function (error, response, body) {
            console.log("Signed Up: " + fullName);
            if (error) callback("failure");
            if (response.statusCode != '200') callback("failure " + r);
            else callback("success");
        });
    }
};
module.exports = Grid;
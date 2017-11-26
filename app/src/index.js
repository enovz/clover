import { SIGINT } from "constants";

//dependencies
const request = require("request");

//exports
module.exports = exports = init;

function init() {
  if (process.argv.length < 1) {
    console.log(
      "Usage: \n" +
        "node index.js <message> [<api> <api-key> <organization> <username> <password>]"
    );
    process.exit();
  }


  var MESSAGE = process.argv[2],
    var API = {
        url: process.argv[3] || "https://spika.chat/api/v3/messages",
        key: process.argv[4] || "GMUwQIHielm7b1ZQNNJYMAfCC508Giof"
    }
    var CREDENTIALS = {
        org: process.argv[5] || "clover",
        usr: process.argv[6] || "jobapplicant",
        pass: process.argv[7] || "pQw4md4YZR"
    }

    signIn(API, CREDENTIALS, function(err, accessToken) {
      if (err) {
            console.error(err, err.stack);
            process.exit();
        }
        
        process.env.ACCESSTOKEN = accessToken;
        return sendMessage(API, MESSAGE, accessToken, function(err, status){
            if(err) console.log(err, err.stack);
            console.log(status);
            if(status < 400) console.log("Status nice");
            if(status > 400) console.log("Status bad");
        });
        
    });

}

function signIn(API, CREDENTIALS, cb) {

  let options = {
    uri: `${API.url}/signin`,
    method: "POST",
    headers: {
        "apikey": API.key,
        "Content-Type": "application/json; charset=utf-8"
    },
    json: true,
    body: CREDENTIALS,
    encoding: null
  };

  return request(options, function(err, res, body){

    if(err){
        return cb(err);
    }
    var data = [], dataLen = 0;
    
    request.on('data', function (chunk) {
            data.push(chunk);
            dataLen += chunk.length;
    });
    request.on('end', function (chunk) {
        var buf = new Buffer(dataLen);
        for (var i = 0, len = data.length, pos = 0; i < len; i++) {
            data[i].copy(buf, pos);
            pos += data[i].length;
        }
    });

    return cb(data.toString());
  });
}

function sendMessage(API, MESSAGE, ACCTOKEN,  cb) {

  let payload = {
    targetType : 3,
    messageType : 1,
    target : "5a05ccd4829e64fd1dcd7732",
    message: MESSAGE
  };

  let options = {
    uri: `${API.url}/messages`,
    method: "POST",
    headers: {
        "apikey": API.key,
        "Content-Type": "application/json; charset=utf-8",
        "access-token": ACCTOKEN
    },
    json: true,
    body: payload,
    encoding: null
  };
  
  return request(options, function(err, res, body){
      if(err) return cb(err);
      return cb(res.statusCode);
  });
}


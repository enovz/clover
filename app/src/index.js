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

    getAccessToken(API, CREDENTIALS, function(err, res, body) {
      if (err) {
        console.error(err, err.stack);
        process.exit();
      }
      return sendMessage(MESSAGES, API);
    });
}

function getAccessToken(API, APIKEY, cb) {
    - Method : POST
    - Request URL : "https://spika.chat/api/v3/signin"
    - Request Header
        - "apikey: GMUwQIHielm7b1ZQNNJYMAfCC508Giof"
        - "Content-Type: application/json; charset=utf-8"
    
    - Request Json Body
        - organization : clover
        - username : jobapplicant
        - password : pQw4md4YZR


  let message = data;
  let options = {
    uri: `${API.url}/singin`,
    method: "POST",
    headers: {
      "content-type": "application/json"
    },
    json: true,
    body: message,
    encoding: null
  };
  return request(options, cb);
}

function sendMessage(data, destionationUri, cb) {
    - Method : POST
    - Request URL : "https://spika.chat/api/v3/messages"
    - Request Header
        - "apikey: GMUwQIHielm7b1ZQNNJYMAfCC508Giof"
        - "Content-Type: application/json; charset=utf-8"
        - "access-token: xxxxxxxxxxxxxxxx" <- Use access token from previous step
    
    - Request Json Body
        - targetType : 3
        - messageType : 1
        - target : 5a05ccd4829e64fd1dcd7732
        - message : "your email address" <- Please send us your email address.
  let message = data;
  let options = {
    uri: destionationUri,
    method: "POST",
    headers: {
      "content-type": "application/json"
    },
    json: true,
    body: message,
    encoding: null
  };
  return request(options, cb);
}

function handleResponse(error, response, body) {
  if (error) {
    console.log(error, error.stack);
    return process.exit(1);
  } else {
    return console.log(response.statusCode);
  }
}

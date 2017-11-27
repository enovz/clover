//dependencies
const request = require("request");

//exports
module.exports = exports = init;

//methods
function init() {
  if (process.argv.length < 3) {
    console.log(
      "Usage: \n" +
        "node index.js <message> [<api> <api-key> <organization> <username> <password>]"
    );
    process.exit();
  }

  var MESSAGE = process.argv[2];
  var API = {
    url: process.argv[3] || "https://spika.chat/api/v3",
    key: process.argv[4] || "GMUwQIHielm7b1ZQNNJYMAfCC508Giof"
  };
  var CREDENTIALS = {
    organization: process.argv[5] || "clover",
    username: process.argv[6] || "jobapplicant",
    password: process.argv[7] || "pQw4md4YZR"
  };

  console.info(MESSAGE);
  console.info(JSON.stringify(API, 0, " "));
  console.info(JSON.stringify(CREDENTIALS, 0, " "));

  return signIn(API, CREDENTIALS, resolveSignIn);

  function resolveSignIn(err, accessToken) {
    if (err) {
      console.error(err, err.stack);
      process.exit();
    }
    process.env.ACCESSTOKEN = accessToken;
    return sendMessage(API, MESSAGE, accessToken, resolveMessages);
  }

  function resolveMessages(err, status) {
    if (err) {
      console.error(err, err.stack);
      process.exit();
    }
    if (status < 400) console.info("Status nice");
    if (status > 400) console.info("Status bad");
    console.info("Send Message completed with : " + status);
  }
}

function signIn(API, CREDENTIALS, cb) {
  let options = {
    uri: `${API.url}/signin`,
    method: "POST",
    headers: {
      apikey: API.key,
      "Content-Type": "application/json; charset=utf-8"
    },
    json: true,
    body: CREDENTIALS,
    encoding: null
  };

  return request(options, function(err, res, body) {
    if (err) {
      return cb(err);
    }
    console.log("Sign in done with: " + res.statusCode);
    return cb(null, body["access-token"]);
  });
}

function sendMessage(API, MESSAGE, ACCTOKEN, cb) {
  let payload = {
    targetType: 3,
    messageType: 1,
    target: "5a05ccd4829e64fd1dcd7732",
    message: MESSAGE
  };

  let options = {
    uri: `${API.url}/messages`,
    method: "POST",
    headers: {
      apikey: API.key,
      "Content-Type": "application/json; charset=utf-8",
      "access-token": ACCTOKEN
    },
    json: true,
    body: payload,
    encoding: null
  };

  return request(options, function(err, res, body) {
    if (err) return cb(err);
    return cb(null, res.statusCode);
  });
}

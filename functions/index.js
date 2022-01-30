const functions = require("firebase-functions");

const {requestUser} = require("./requestUser");
const {updateUser} = require("./updateUser");

// Export Cloud funtions
exports.requestUser = functions.https.onRequest(async (request, response) =>{
  try {
    functions.logger.log(request);
    const resp = await requestUser(request);
    if(resp.data) {
      response.json(resp.data);
    } else if(resp.error) {
      response.status(400).end(resp.error);
    }
  } catch (e) {
    functions.logger.log(e);
    response.status(500).end("Something went wrong");
  }
});

exports.updateUser = functions.https.onRequest(async (request, response) =>{
  try {
    functions.logger.log(request);
    await updateUser(request);
    response.end("The user has been successfully updated");
  } catch (e) {
    functions.logger.log(e);
    response.status(500).end("Something went wrong");
  }
});

"use strict";

const {getDoc} = require("../firestore");

module.exports = async (request) => {
  const doc = await getDoc("users", request.body.id);
  if (doc.exists) {
    return {
      data: doc.data()
    };
  } else {
    return {
      error: "Invalid user id has been provided"
    };
  }
};

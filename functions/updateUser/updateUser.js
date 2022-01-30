"use strict";

const {getDoc, setDoc} = require("../firestore");
const usersCollectionName = "users";

// These are the fields that are numbers but don't need to be overwriten
const overwriteKeys = ["coins_left"];

module.exports = async (request) => {
  const user = await getDoc(usersCollectionName, request.body.id);
  if (user.exists) {
    const newUser = { ...user.data() };
    for (const key in request.body) {
      // numbers fields need to be += if they didn't specifically mentioned in the overwriteKeys array
      if(typeof request.body[key] === "number" && !overwriteKeys.includes(key) && newUser[key] !== undefined) {
        newUser[key] += request.body[key];
      } else {
        newUser[key] = request.body[key];
      }
    }

    await setDoc(usersCollectionName, newUser);
  } else {
    await setDoc(usersCollectionName, request.body);
  }
};

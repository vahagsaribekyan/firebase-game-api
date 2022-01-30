"use strict";

const functions = require('firebase-functions');
const admin = require('firebase-admin');
admin.initializeApp(functions.config().firebase);

module.exports.getDoc = (collection, docId) => {
  const db = admin.firestore();
  const docRef = db.collection(collection).doc(docId);
  return docRef.get();
};

module.exports.setDoc = (collection, doc) => {
  const db = admin.firestore();
  const docRef = db.collection(collection);
  return docRef.doc(doc.id).set(doc);
}

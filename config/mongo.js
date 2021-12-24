"use strict";
const {MongoClient} = require("mongodb");

const uri = process.env.DB_URL;
const client = new MongoClient(uri, {useNewUrlParser: true, useUnifiedTopology: true});

module.exports.mongoConnect = async function() {
  try {
    await client.connect()
    console.log("Successfully connected to MongoDB");
  } catch (err) {
    console.error(err, "<<<< Failed connecting to MongoDB");
  } finally {
    await client.close();
  }
}
import { MongoClient } from "mongodb";
const express = require('express');

const connectionString = process.env.ATLAS_URI || "";

const client = new MongoClient(connectionString);

let conn;
try {
  conn = await client.connect();
} catch (e) {
  console.log("Cann't connect DB" + e);
}

let db = conn.db("expense-tracker");

export default db;
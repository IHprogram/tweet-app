const mongodb = require('mongodb');
const mongoose = require('mongoose');
const config = require("config");
const db = config.get("mongoURI"); // コピーしてきたURIを取得

const connectDB = async () => {
  try {
    await mongoose.connect(db, { useCreateIndex: true, useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false });
    console.log('mongooseの接続成功!');
  } catch (err) {
    console.log(err.message);
    process.exit(1);
  }
}

module.exports = connectDB;

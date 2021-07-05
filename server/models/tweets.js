import mongoose from 'mongoose';

const tweetsSchema = new mongoose.Schema({
  tweet: String,
  userId: String,
  userName: String
})

const TweetSchema = mongoose.model('TweetSchema', tweetsSchema);

export default TweetSchema;
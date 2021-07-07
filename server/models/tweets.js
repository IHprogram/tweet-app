import mongoose from 'mongoose';

const tweetsSchema = new mongoose.Schema({
  tweet: String,
  userId: String,
  userName: String,
  tweetImage: String
})

const Tweet = mongoose.model('Tweet', tweetsSchema);

export default Tweet;
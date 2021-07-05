import Tweet from "../models/tweets.js";

export const getTweets = async (req, res) => {
  try {
    const tweet = await Tweet.find();
    console.log('tweetの中身', tweet);
    res.status(200).json(tweet);
  } catch (error) {
    console.log(error);
  }
}
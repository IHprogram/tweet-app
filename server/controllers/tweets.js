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

export const createTweet = async (req, res) => {
  const tweet = req.body.tweet;
  const userId = req.body.userId;
  const userName = req.body.userName;
  const newTweet = new Tweet({ tweet: tweet, userId: userId, userName: userName });
  try {
    await newTweet.save().then(() => {
      res.status(201).json(newTweet);
    })
  } catch (error) {
    console.log(error)
  }
}
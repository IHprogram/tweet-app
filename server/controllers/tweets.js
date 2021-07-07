import Tweet from "../models/tweets.js";
import path from "path";

console.log('pathです', path);

export const getTweets = async (req, res) => {
  try {
    const tweet = await Tweet.find();
    res.status(200).json(tweet);
  } catch (error) {
    console.log(error);
  }
}

export const createTweet = async (req, res) => {
  console.log(req.body);
  const tweet = req.body.tweet;
  const userId = req.body.userId;
  const userName = req.body.userName;
  const tweetImage = req.body.tweetImage;
  const newTweet = new Tweet({ tweet: tweet, userId: userId, userName: userName, tweetImage: tweetImage });
  try {
    await newTweet.save().then(() => {
      res.status(201).json(newTweet);
    })
  } catch (error) {
    console.log(error)
  }
}

export const updateTweet = async (req, res) => {
  console.log(req.body)
  const tweetId = req.body._id;
  const tweet = req.body.tweet;
  try {
    await Tweet.findOneAndUpdate({ _id: tweetId }, { $set: { tweet } })
    // 更新したツイート内容とツイートのIDを返す
    const updatedTweet = {
      _id: tweetId,
      tweet
    };
    res.status(200).json(updatedTweet);
  } catch (error) {
    console.log(error)
  }
}

export const deleteTweet = async (req, res) => {
  const id = req.params.id;
  try {
    await Tweet.deleteOne({ _id: id });

    // 削除したツイートのID(定数id)を返している
    res.status(200).json(id);
  } catch (error) {
    console.log(error);
  }
}
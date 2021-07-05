import firebase from '../firebase/firebase'
import { UserInfo, Tweet } from '../Types';
import axios from 'axios';


export const SET_USER_INFO = 'SET_USER_INFO';
export const LOGOUT_USER = 'LOGOUT_USER';
export const SET_TWEETS = 'SET_TWEETS';
export const ADD_NEW_TWEET = 'ADD_NEW_TWEET';
export const DELETE_STATE_TWEET = 'DELETE_STATE_TWEET';

export const setUserInfo = (name, email) => {
  return (
    {
      type: SET_USER_INFO,
      name: name,
      email: email,
      login_user: true
    }
  )
}

export const logoutUser = () => {
  return (
    {
      type: LOGOUT_USER
    }
  )
}

export const setTweets = (tweets) => {
  return (
    {
      type: SET_TWEETS,
      tweets: tweets
    }
  )
}

export const addNewTweet = (tweet) => {
  return (
    {
      type: ADD_NEW_TWEET,
      tweet: tweet
    }
  )
}

export const deleteStateTweet = (tweetId) => {
  return (
    {
      type: DELETE_STATE_TWEET,
      tweetId: tweetId
    }
  )
}

export const fetchAllTweets = () => (dispatch) => {
  const tweetArray: Tweet[] = [];
  axios.get('http://localhost:3001/tweets')
    .then(res => {
      // console.log('resです', res);
      res.data.forEach(doc => {
        const getTweetInfo: Tweet = {
          tweet: doc.tweet,
          tweetId: doc._id,
          userId: doc.userId,
          userName: doc.userName
        };
        tweetArray.push(getTweetInfo);
      })
      console.log('axiosです', tweetArray);
      // 取得したツイート情報がstoreに格納される。
      dispatch(setTweets(tweetArray))
    })

  // 以下はfirestoreからデータを取得する場合の処理

  // firebase
  //   .firestore()
  //   .collection(`tweets/`)
  //   .get()
  //   .then((snapshot) => {
  //     snapshot.forEach((doc) => {
  //       // ツイートを取得

  //       const getTweetInfo: Tweet = {
  //         tweet: doc.data().tweet,
  //         tweetId: doc.id,
  //         userId: doc.data().userId,
  //         userName: doc.data().userName
  //       };
  //       tweetArray.push(getTweetInfo);
  //     });
  //     // 取得したツイート情報がstoreに格納される。
  //     dispatch(setTweets(tweetArray))
  //   });
}


export const addTweet = (tweet, loginUserId) => (dispatch) => {
  firebase
    .firestore()
    .collection(`tweets`)
    .add({ tweet: tweet.tweet, userName: tweet.userName, userId: loginUserId })
    .then(result => {

      const getTweet: Tweet = {
        tweet: tweet.tweet,
        tweetId: result.id,
        userId: loginUserId,
        userName: tweet.userName
      };
      dispatch(addNewTweet(getTweet));
      return loginUserId;
    })
    .catch(errors => {
      console.dir(errors)
    })
}

export const deleteTweet = (tweetId) => (dispatch) => {
  console.log('deleteするよ！')
  console.log(tweetId)
  firebase
    .firestore()
    .collection(`tweets`)
    .doc(tweetId)
    .delete()
    .then(() => {
      dispatch(deleteStateTweet(tweetId))
    })
    .catch(errors => {
      console.dir(errors)
    })
}


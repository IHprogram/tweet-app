import firebase from '../firebase/firebase'
import { UserInfo, Tweet } from '../Types';

export const SET_USER_INFO = 'SET_USER_INFO';
export const LOGOUT_USER = 'LOGOUT_USER';
export const SET_TWEETS = 'SET_TWEETS';
export const ADD_NEW_TWEET = 'ADD_NEW_TWEET';
export const DELETE_STATE_TWEET = 'DELETE_STATE_TWEET';

export const setUserInfo = (name, email) => {
  return (
    {
      type: SET_USER_INFO,
      // uid: uid,
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
  firebase
    .firestore()
    .collection(`tweets/`)
    .get()
    .then((snapshot) => {
      // ユーザー一人一人のツイートをまとめる
      snapshot.forEach((doc) => {
        // ユーザーに紐づいたツイートを取得
        // console.log(doc.id)
        // console.log(doc.data())

        const getTweetInfo: Tweet = {
          tweet: doc.data().tweet,
          tweetId: doc.id,
          userId: doc.data().userId
        };
        // console.log(getTweetInfo)
        tweetArray.push(getTweetInfo);
      });
      console.log(tweetArray);
      // ユーザーに紐づいたツイートとユーザーのIDが格納される。
      // const newTweetArray = {
      //   usersTweets: tweetArray,
      // };
      // console.log(newTweetArray);
      dispatch(setTweets(tweetArray))
    });
}


export const addTweet = (tweet, loginUserId) => (dispatch) => {
  console.log('addTweetです')
  console.log(loginUserId)
  firebase
    .firestore()
    .collection(`tweets`)
    .add({ tweet: tweet.tweet, userId: loginUserId })
    .then(result => {

      const getTweet: Tweet = {
        tweet: tweet.tweet,
        tweetId: result.id,
        userId: loginUserId
      };
      dispatch(addNewTweet(getTweet));
      return loginUserId;
    })
    .then(result2 => {
      console.log(result2)
      console.log('呼ばれたぜ！')

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


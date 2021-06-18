import firebase from '../firebase/firebase'
import { UserInfo, Tweet } from '../Types';
// import * as admin from 'firebase-admin';

export const SET_USER_INFO = 'SET_USER_INFO';
export const LOGOUT_USER = 'LOGOUT_USER';
export const SET_TWEETS = 'SET_TWEETS';
export const ADD_NEW_TWEET = 'ADD_NEW_TWEET';

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

export const fetchUserId = () => (dispatch) => {
  const usersId: string[] = []
  console.log('呼びましたね！')

  // 没
  // async function fetchAllAuthUsers() {
  //   const result: admin.auth.UserRecord[] = [];
  //   let listUsersResult = await admin.auth().listUsers(1000);
  //   result.push(...listUsersResult.users)
  //   console.log(result)
  //   return result;
  // }

  // const user = fetchAllAuthUsers;
  // console.log(user);

  firebase
    .firestore()
    .collection(`users`)
    .get()
    .then((snapshot) => {
      console.log(snapshot)
      snapshot.forEach((doc) => {
        console.log(doc.data())
        console.log(typeof doc.id)
        // ユーザー情報を一人ずつ取得
        const oneUserId: string = doc.id;
        usersId.push(oneUserId)
        return usersId;
      })
    })
    .then(() => {
      // console.log('これは！？')
      dispatch(fetchTweets(usersId))
    })
    .catch((errors) => {
      console.log(errors)
      console.log('エラー発生です')
    })
}

export const fetchTweets = (usersId) => (dispatch) => {
  usersId.forEach(userId => {
    const tweetArray: any[] = [];

    console.log(usersId)
    console.log(typeof userId)
    firebase
      .firestore()
      .collection(`users/${userId}/tweets/`)
      .get()
      .then((snapshot) => {
        // ユーザー一人一人のツイートをまとめる
        snapshot.forEach((doc) => {
          // ユーザーに紐づいたツイートを取得
          console.log(doc.id)

          const getTweet: Tweet = {
            tweet: doc.data().tweet,
            tweetId: doc.id
          };
          console.log(getTweet)
          tweetArray.push(getTweet);
          console.log(tweetArray);
        });
        // ユーザーに紐づいたツイートとユーザーのIDが格納される。
        const newTweetArray = {
          usersTweets: tweetArray,
          userId: userId,
        };
        console.log(newTweetArray);
        dispatch(setTweets(newTweetArray))
      });
  })
}

export const addTweet = (tweet, loginUserId) => (dispatch) => {
  console.log('addTweetです')
  console.log(loginUserId)
  firebase
    .firestore()
    .collection(`users/${loginUserId}/tweets`)
    .add(tweet)
    .then(result => {

      const getTweet: Tweet = {
        tweet: tweet.tweet,
        tweetId: result.id
      };
      const newTweetArray = {
        ...getTweet,
        userId: loginUserId
      };
      dispatch(addNewTweet(newTweetArray));
      return loginUserId;
    })
    .then(result2 => {
      console.log(result2)
      console.log('呼ばれたぜ！')

      // ログイン中のuidを渡す
      // dispatch(addUser(result2))
    })
    .catch(errors => {
      console.dir(errors)
    })
}

export const addUser = (loginUserId) => (dispatch) => {
  console.log('addUserです')
  console.log(loginUserId)
  interface LoginUserOb {
    loginUserId: string
  }
  const newLoginUserId: LoginUserOb = {
    loginUserId: loginUserId
  }
  console.log(newLoginUserId)
  firebase
    .firestore()
    .collection(`users/${loginUserId}`)
    .add(newLoginUserId)
    .then(result => {
      console.log(result)
      // const getTweet: Tweet = {
      //   tweet: tweet.tweet,
      //   tweetId: result.id
      // };
      // const newTweetArray = {
      //   ...getTweet,
      //   userId: loginUserId
      // };
      // dispatch(addNewTweet(newTweetArray));
      return result;
    })
    .then(result => {
      console.log(result)
      console.log('終了')
    })
    .catch(errors => {
      console.dir(errors)
    })
}
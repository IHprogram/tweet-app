import firebase from '../firebase/firebase'
import { UserInfo, Tweet } from '../Types';

export const SET_USER_INFO = 'SET_USER_INFO';
export const LOGOUT_USER = 'LOGOUT_USER';
export const SET_TWEETS = 'SET_TWEETS';

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

export const fetchUserId = () => (dispatch) => {
  const usersId: string[] = []

  firebase
    .firestore()
    .collection(`users/`)
    .get()
    .then(async (snapshot) => {
      snapshot.forEach((doc) => {
        // ユーザー情報を一人ずつ取得
        const oneUserId: string = doc.id;
        usersId.push(oneUserId)
        return usersId;
      })
    })
    .then(() => {
      console.log('ここまで来たぜ')
      dispatch(fetchTweets(usersId))
    })
}

export const fetchTweets = (usersId) => (dispatch) => {
  usersId.forEach(userId => {
    const tweetArray: any[] = [];

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
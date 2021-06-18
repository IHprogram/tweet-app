import { SET_TWEETS, ADD_NEW_TWEET, DELETE_STATE_TWEET } from '../actions/index'

// Typesで定義したUserInfoという型のみが入る配列を定義
const initialState: any[] = [];

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_TWEETS:
      const newArray = [...state, action.tweets]
      return newArray
    case ADD_NEW_TWEET:
      console.log(state)
      console.log(action)
      // state(配列)のうち、userIdが一致するオブジェクトのindex番号を取得
      // const found = state[0].usersTweets.findIndex(element => element.userId === action.tweet.userId);

      const newUsersTweets1 = [...state[0].usersTweets, { tweet: action.tweet.tweet, tweetId: action.tweet.tweetId, userId: action.tweet.userId }]
      console.log(newUsersTweets1)

      // const newState1 = [...state, newUsersTweets1]
      // console.log(newState1)
      state.splice(1);
      console.log(state[0])
      state[0] = { usersTweets: newUsersTweets1 }
      console.log(state)

      // console.log(found)
      // if (found !== -1) {
      // const newUsersTweets = [...state[found].usersTweets, { tweet: action.tweet.tweet, tweetId: action.tweet.tweetId }]
      // 対象のstateに入っているツイート情報を上書きすることで、新しくツイートを追加する。
      // const targetState = {
      //   ...state[found],
      //   usersTweets: newUsersTweets
      // }
      // state.splice(found, 1);
      // return [...state, targetState];
      // } else {
      // const newUsersTweets = [{ tweet: action.tweet.tweet, tweetId: action.tweet.tweetId }]
      // const targetState = {
      //   userId: action.tweet.userId,
      //   usersTweets: newUsersTweets
      // }
      // return [...state, targetState];
      // }

      return state
    case DELETE_STATE_TWEET:
      const found2 = state[0].usersTweets.findIndex(element => element.tweetId === action.tweetId);

      if (found2 !== -1) {
        state[0].usersTweets.splice(found2, 1)
        const newUsersTweets2 = [...state[0].usersTweets];
        return [...state]
      } else {
        return state
      }
      return state
    default:
      return state
  }
}
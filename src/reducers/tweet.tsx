import { SET_TWEETS, ADD_NEW_TWEET, DELETE_STATE_TWEET } from '../actions/index'
import { Tweet } from '../Types'

// Typesで定義したUserInfoという型のみが入る配列を定義
const initialState: Tweet[] = [];

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_TWEETS:
      console.log(state)
      console.log(action)

      const newArray = [...state, ...action.tweets]
      console.log(newArray)
      return newArray
    case ADD_NEW_TWEET:
      // const newUsersTweets1 = [...state[0].usersTweets, { tweet: action.tweet.tweet, tweetId: action.tweet.tweetId, userId: action.tweet.userId }]
      // state.splice(1);
      // state[0] = { usersTweets: newUsersTweets1 }
      return state
    case DELETE_STATE_TWEET:
      // const found2 = state[0].usersTweets.findIndex(element => element.tweetId === action.tweetId);

      // if (found2 !== -1) {
      //   state[0].usersTweets.splice(found2, 1)
      //   const newUsersTweets2 = [...state[0].usersTweets];
      //   return [...state]
      // } else {
      //   return state
      // }
      return state
    default:
      return state
  }
}
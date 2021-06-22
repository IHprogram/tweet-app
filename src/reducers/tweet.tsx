import { SET_TWEETS, ADD_NEW_TWEET, DELETE_STATE_TWEET } from '../actions/index'
import { Tweet } from '../Types'

// Typesで定義したUserInfoという型のみが入る配列を定義
const initialState: Tweet[] = [];

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_TWEETS:
      state = [];
      const newArray = [...state, ...action.tweets]
      return newArray
    case ADD_NEW_TWEET:
      return [...state, action.tweet]
    case DELETE_STATE_TWEET:
      const found = state.findIndex(element => element.tweetId === action.tweetId);

      if (found !== -1) {
        state.splice(found, 1)
        return [...state]
      } else {
        return state
      }
    default:
      return state
  }
}
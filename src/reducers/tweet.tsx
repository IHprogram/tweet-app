import { SET_TWEETS } from '../actions/index'
import { Tweet } from '../Types'

// Typesで定義したUserInfoという型のみが入る配列を定義
const initialState: any[] = [];

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_TWEETS:
      console.log(state);
      console.log(action);
      const newArray = [...state, action.tweets]
      console.log(newArray)
      return newArray
    default:
      return state
  }
}
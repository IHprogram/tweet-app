import { SET_USER_INFO, LOGOUT_USER } from '../actions/index'

// 後でTypeScript型に直すこと。
const initialState = {
  // uid: '',
  name: '',
  email: '',
  login_user: false
}

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_USER_INFO:
      console.log(action)
      console.log(state)
      state.name = action.name
      state.email = action.email
      state.login_user = action.login_user
      console.log(state)
      return state
    case LOGOUT_USER:
      console.log(action)
      console.log(state)
      state.name = ''
      state.email = ''
      state.login_user = false
      console.log(state)
      return state
    default:
      return state
  }
}
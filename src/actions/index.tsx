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
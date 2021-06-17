import React, { useState, useEffect } from 'react';
import Header from './components/header/Header';
import Login from './components/Login';
import Register from './components/Register';
import TweetForm from './components/TweetForm';
import Detail from './components/Detail';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import firebase from './firebase/firebase'
import { UserInfo, Tweet } from './Types';
import { setTweets, fetchTweets, fetchUserId } from './actions';

const App: React.FC = () => {
  const styles = {
    'color': 'aqua'
  }

  const root = {
    'backgroundColor': '#ffd5c9',
    'height': '100vh',
    'width': '100vw',
    'display': 'flex',
    'justifyContent': 'center',
    'alignItems': 'center',
  }

  const wrapper = {
    'backgroundColor': '#f1f2f7',
    'height': '70vh',
    'width': '70vw',
    'padding': '10px 40px'
  }

  const dispatch = useDispatch();

  const initialTweetInfo: any[] = []

  const allState = useSelector((state: { Tweet: any }) => state.Tweet);
  const getState = useSelector((state: { User: UserInfo }) => state.User.login_user);
  const [loginUser, setLoginUser] = useState(getState),
    [tweetInfo, setTweetInfo] = useState(initialTweetInfo);

  useEffect(() => {
    console.log('初回レンダリング');
    // 以下、「誰がどんなツイートをしたか」をFirestoreから全て取得するための処理。
    dispatch(fetchUserId());
  }, []);

  const kakunin = () => {
    console.log(loginUser)
    console.log(allState)
    console.log(tweetInfo)
    if (tweetInfo) {
      tweetInfo.map((element) =>
        element.usersTweets.map(element2 =>
          console.log(element2.tweet)
        )
      )
    }
  }

  useEffect(() => {
    firebase.auth().onAuthStateChanged((user) => {
      setLoginUser(getState);
      if (user) {
        console.log('ログイン中です')
      } else {
        console.log('ログアウト中です')
      }
    })
  }, [getState]);

  useEffect(() => {
    console.log(allState);
    console.log(tweetInfo);
    setTweetInfo(allState);
    console.log(tweetInfo);
  }, [allState]);

  return (
    <Router>
      <div>
        <Header loginUser={loginUser} />

        <Switch>
          <Route exact path='/login'>
            <Login />
          </Route>

          <Route exact path='/register'>
            <Register />
          </Route>

          <Route exact path='/tweetform'>
            <TweetForm />
          </Route>

          <Route exact path='/detail/:id'>
            <Detail />
          </Route>

          <Route exact path='/'>
            <div style={root}>
              <div style={wrapper}>
                <button onClick={kakunin}>確認!</button>
                <ul>
                  {tweetInfo.length === 0 && (
                    <p>ツイートはありません</p>
                  )}
                  {tweetInfo.length > 0 && (
                    tweetInfo.map((element) => {
                      return element.usersTweets.map((element2) => {
                        return <li key={element2.tweetId}>{element2.tweet}</li>
                      })
                    })
                  )}
                </ul>
              </div>
            </div>
          </Route>
        </Switch>
      </div>
    </Router>
  )
}
export default App

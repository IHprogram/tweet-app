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
  Link
} from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import firebase from './firebase/firebase'
import { UserInfo, Tweet } from './Types';
import { fetchAllTweets } from './actions';

import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';

const App: React.FC = () => {
  const styles = {
    'listStyle': 'none',
    'marginBottom': '20px'
  }

  const ulStyle = {
    'padding': '0'
  }

  const root = {
    'backgroundColor': '#e0ffff',
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
    [tweetInfo, setTweetInfo] = useState(initialTweetInfo),
    [loginUserId, setLoginUserId] = useState('');

  useEffect(() => {
    console.log('初回レンダリング');

    // 以下、「誰がどんなツイートをしたか」をFirestoreから全て取得するための処理。
    dispatch(fetchAllTweets());

    firebase.auth().onAuthStateChanged((user) => {
      setLoginUser(getState);
      if (user) {
        console.log('ログイン中です')
        console.log(user)
        console.log(user.uid)
        console.log(typeof user.uid)
        setLoginUserId(user.uid);
        setLoginUser(true); //最終的には消す
      } else {
        console.log('ログアウト中です')
        setLoginUserId('');
      }
    })
  }, []);

  const kakunin = () => {
    console.log(loginUser)
    console.log(allState)
    console.log(tweetInfo)
    console.log(loginUserId)
  }

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
            <TweetForm loginUserId={loginUserId} />
          </Route>

          <Route exact path='/detail/:id'>
            <Detail loginUserId={loginUserId} />
          </Route>

          <Route exact path='/'>
            <div style={root}>
              <div style={wrapper}>
                <button onClick={kakunin}>確認!</button>
                <ul style={ulStyle}>
                  {tweetInfo.length === 0 && (
                    <p>ツイートはありません</p>
                  )}
                  {tweetInfo.length > 0 && (
                    tweetInfo.map((element, index) => {
                      return element.usersTweets.map((element2, index2) => {
                        return (
                          <li key={element2.tweetId} style={styles}>
                            <Card>
                              <CardContent>
                                <Typography>
                                  <Link to={{
                                    pathname: `/detail/${index + index2 + 1}`,
                                    state: { tweetdata: element2, userId: element2.userId, all: element2 }
                                  }}
                                  >
                                    {element2.tweet}
                                  </Link>
                                </Typography>
                              </CardContent>
                            </Card>
                          </li>
                        )
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

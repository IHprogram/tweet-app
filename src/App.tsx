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
import { setTweets } from './actions';

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

  const allState = useSelector((state: { Tweet: any }) => state.Tweet[0]);
  const getState = useSelector((state: { User: UserInfo }) => state.User.login_user);
  const [loginUser, setLoginUser] = useState(getState)

  // rowsには、ツイートの情報とユーザーIDの全てが格納される。
  const rows: any[] = [];

  // 実際にツイートを表示するための配列。
  const tweetsRows: any[] = [];

  useEffect(() => {
    console.log('初回レンダリング');
    // 以下、「誰がどんなツイートをしたか」をFirestoreから取得するための処理。

    firebase
      .firestore()
      .collection(`users/`)
      .get()
      .then(async (snapshot) => {
        console.log('やあ')
        console.log(snapshot)
        snapshot.forEach((doc) => {
          // ユーザー情報を一人ずつ取得
          const userId: string = doc.id;
          console.log(userId)

          const tweetArray: Tweet[] = [];

          firebase
            .firestore()
            .collection(`users/${userId}/tweets/`)
            .get()
            .then(async (snapshot2) => {
              // ユーザー一人一人のツイートをまとめる
              snapshot2.forEach((doc2) => {
                // ユーザーに紐づいたツイートを取得
                console.log(doc2.data().tweet)
                const getTweet: Tweet = {
                  tweet: doc2.data().tweet
                };
                console.log(getTweet)
                tweetArray.push(getTweet);
                console.log(tweetArray)
              })
            });

          console.log(tweetArray)

          const newTweetArray = {
            usersTweets: tweetArray,
            userId: userId
          };

          rows.push(newTweetArray)
          console.log(newTweetArray)
        })
        console.log(rows)
        dispatch(setTweets(rows))
      });
  }, []);

  const kakunin = () => {
    console.log(loginUser)
    console.log(rows)
    console.log(allState)
    allState.map((element) =>
      element.usersTweets.map(element2 =>
        console.log(element2.tweet)
      )
    )
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
                <button onClick={kakunin}>確認</button>
                <ul>
                  {/* この中身が空になっている */}
                  {!(allState) ?
                    <p>ツイートはありません</p>
                    :
                    allState.map((element) => {
                      element.usersTweets.map((element2, index) => {
                        // element2.tweetでツイートが取得できることは確認済みだが、表示されない。
                        <li key={index}>{element2.tweet}</li>
                      }
                      )
                    })
                  }
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

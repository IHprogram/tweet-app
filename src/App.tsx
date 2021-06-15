import React from 'react';
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

// type Props = {
//   getState: boolean
// }

const App = () => {
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

  const getState = useSelector((state) => state.Tweet.login_user);
  const kakunin = () => {
    console.log(getState)
  }

  return (
    <Router>
      <div>
        <Header getState={getState} />

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
              </div>
            </div>
          </Route>
        </Switch>
      </div>
    </Router>
  )
}

export default App

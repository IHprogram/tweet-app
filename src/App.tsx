import React from 'react';
import Header from './components/header/Header';
import Login from './components/Login';
import Register from './components/Register';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from 'react-router-dom';

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
  return (
    <Router>
      <div>
        <Header />

        <Switch>
          <Route exact path='/login'>
            <Login />
          </Route>

          <Route exact path='/register'>
            <Register />
          </Route>

          <Route exact path='/'>
            <div style={root}>
              <div style={wrapper}>
              </div>
            </div>
          </Route>
        </Switch>
      </div>
    </Router>
  )
}

export default App

import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import {
  Link
} from 'react-router-dom';
import { useHistory } from 'react-router-dom'
import firebase from '../../firebase/firebase'
import { useDispatch } from "react-redux";
import { logoutUser } from "../../actions";

interface Props {
  loginUser: boolean
}

const Header = ({ loginUser }: Props) => {
  const history = useHistory();
  const dispatch = useDispatch();

  const styles = {
    'color': '#ffffff',
    'textDecoration': 'none',
    'marginRight': '20px'
  }
  const wrapper = {
    'width': '100%',
    'display': 'flex',
    'justifyContent': 'spaceBetween',
    'alignItems': 'center',
    'height': '70px',
    'padding': '0 20px'
  }

  const buttonStyles = {
    'backgroundColor': 'transparent',
    'border': 'none',
    'cursor': 'pointer',
    'outline': 'none',
    'padding': '0',
    'color': '#ffffff',
    'fontSize': '16px'
  }

  const LoginOrLogout = (props) => {

    const clickLogout = () => {
      firebase.auth().signOut()
        .then(result => {
          dispatch(logoutUser());
          history.push("/");
        }).catch((error) => {
          alert('ログアウトに失敗しました。お手数ですがもう1度お試しください')
        })
    };

    if (props.loginUser === true) {
      return (
        <React.Fragment>
          <Link to='/tweetform' style={styles}>投稿する</Link>
          <button style={buttonStyles} onClick={() => { clickLogout(); }}>ログアウト</button>
        </React.Fragment>
      )
    } else {
      return (
        <React.Fragment>
          <Link to='/login' style={styles}>ログイン</Link>
          <Link to='/register' style={styles}>新規登録</Link>
        </React.Fragment>
      )
    }
  }

  return (
    <div>
      <AppBar position="static">
        <div style={wrapper}>
          <div>
            <Link to='/' style={styles}>Tweet App</Link>
          </div>
          <div>
            <LoginOrLogout loginUser={loginUser} />
          </div>
        </div>
      </AppBar>
    </div>
  );
}

export default Header

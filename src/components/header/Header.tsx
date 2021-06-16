import React, { useEffect } from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import {
  Link
} from 'react-router-dom';
import { useHistory } from 'react-router-dom'
import firebase from '../../firebase/firebase'
import { useDispatch, useSelector } from "react-redux";
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
  }

  const LoginOrLogout = (props) => {
    console.log(props)

    const clickLogout = () => {
      firebase.auth().signOut()
        .then(result => {
          console.log('ログアウト成功です！')
          dispatch(logoutUser());
          history.push("/");
        }).catch((error) => {
          alert('ログアウトに失敗しました。お手数ですがもう1度お試しください')
        })
    };

    if (props.loginUser === true) {
      return (
        <React.Fragment>
          <button color="secondary" onClick={() => { clickLogout(); }}>ログアウト</button>
        </React.Fragment>
      )
    } else {
      return (
        <React.Fragment>
          <Link to='/login' style={styles}>ログイン</Link>
          <Link to='/register' style={styles}>新規登録</Link>
          <Link to='/tweetform' style={styles}>投稿する</Link>
          <Link to='/detail/100' style={styles}>詳細画面(仮置き)</Link>
        </React.Fragment>
      )
    }
  }

  return (
    <div style={styles}>
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

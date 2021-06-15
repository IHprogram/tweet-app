import React from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import {
  Link
} from 'react-router-dom';

const Header: React.FC = () => {
  const styles = {
    'color': '#ffffff',
    'textDecoration': 'none'
  }
  const wrapper = {
    'width': '100%',
    'display': 'flex',
    'justifyContent': 'spaceBetween',
    'alignItems': 'center',
    'height': '70px'
  }
  return (
    <div style={styles}>
      <AppBar position="static">
        <div style={wrapper}>
          <div>
            <Link to='/' style={styles}>Tweet App</Link>
          </div>
          <div>
            <Link to='/login' style={styles}>ログイン</Link>
            <Link to='/register' style={styles}>新規登録</Link>
            <Link to='/tweetform' style={styles}>投稿する</Link>
            <Link to='/detail/100' style={styles}>詳細画面(仮置き)</Link>
          </div>
        </div>
      </AppBar>
    </div>
  );
}

export default Header

import React from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
// import styles from './Header.css'
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
    'alignItems': 'center'
  }
  return (
    <div style={styles}>
      <AppBar position="static">
        <Toolbar style={wrapper}>
          <Typography variant="h6" style={styles}>
            <Link to='/' style={styles}>Tweet App</Link>
          </Typography>
          <Link to='/login' style={styles}>ログイン</Link>
          <Link to='/register' style={styles}>新規登録</Link>
        </Toolbar>
      </AppBar>
    </div>
  );
}

export default Header

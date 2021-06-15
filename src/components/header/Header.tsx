import React from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
// import styles from './Header.css'

const Header: React.FC = () => {
  const styles = {
    'color': '#ffffff'
  }
  return (
    <div style={styles}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" style={styles}>
            Tweet App
          </Typography>
        </Toolbar>
      </AppBar>
    </div>
  );
}

export default Header

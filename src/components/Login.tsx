import React, { useState } from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import {
  Link
} from 'react-router-dom';
import firebase from '../firebase/firebase'
import { useDispatch } from "react-redux";
import { useHistory } from 'react-router-dom'
import { setUserInfo } from "../actions";


const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%',
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

const SignIn = () => {
  const classes = useStyles()

  const [email, setEmail] = useState(''),
    [password, setPassword] = useState('');

  const dispatch = useDispatch();

  const history = useHistory();

  const inputEmail = (e) => {
    const new_value = e.target.value;
    setEmail(new_value)
  };

  const inputPassword = (e) => {
    const new_value = e.target.value;
    setPassword(new_value)
  };

  const login = (): void => {
    const loginEmail: string = email
    const loginPassword: string = password

    firebase.auth().signInWithEmailAndPassword(loginEmail, loginPassword)
      .then(result => {
        const userName = result.user!.displayName;
        dispatch(setUserInfo(userName, loginEmail));
        history.push('/');
      }).catch((error) => {
        alert('メールアドレスかパスワードが間違えています')
      })
  }

  return (
    <Container component="main" maxWidth="xs" >
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          ログイン
        </Typography>
        <form className={classes.form} noValidate>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label="メールアドレス"
            name="email"
            autoComplete="email"
            autoFocus
            onChange={inputEmail}
          />

          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="パスワード"
            type="password"
            id="password"
            autoComplete="current-password"
            onChange={inputPassword}
          />

          <Button
            type="button"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            onClick={login}
          >
            ログインする
          </Button>
          <Grid container>
            <Grid item xs>
              <Link to="/register">
                登録していない方はこちらから
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
    </Container >
  );
}

export default SignIn
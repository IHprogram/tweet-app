import React, { useState } from 'react';
import { useDispatch } from "react-redux";
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import firebase from '../firebase/firebase'
import { setUserInfo } from "../actions";
import { useHistory } from 'react-router-dom'
import { UserInfo } from '../Types';

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
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));


const SignUp = () => {
  const history = useHistory();

  const [name, setName] = useState(''),
    [email, setEmail] = useState(''),
    [password, setPassword] = useState('');

  const inputName = (e) => {
    const new_value = e.target.value;
    setName(new_value)
  };

  const inputEmail = (e) => {
    const new_value = e.target.value;
    setEmail(new_value)
  };

  const inputPassword = (e) => {
    const new_value = e.target.value;
    setPassword(new_value)
  };

  const dispatch = useDispatch();

  const register = (): void => {
    console.log('registerです')

    // 入力した名前、メールアドレス、パスワードの型チェック
    const registerPassword: string = password;

    const newUserInfo: UserInfo = {
      name: name,
      email: email,
      login_user: true // 不要だが、配置しないとエラーが発生するため仮置き。
    }

    firebase.auth().createUserWithEmailAndPassword(newUserInfo.email, registerPassword)
      .then(async result => {
        await dispatch(setUserInfo(newUserInfo.name, newUserInfo.email));
        // 「firebase.auth().currentUser」の後に「!」で修飾することで、「firebase.auth().currentUserがnullならupdateProfileを行わない」という処理を行う。
        firebase.auth().currentUser!.updateProfile({
          displayName: newUserInfo.name
        })
          .then(result2 => {
            const user = result.user;
            if (user) {
              console.log(user)
            }
          }).catch((error) => {
            alert('ユーザー登録に失敗しました。お手数ですがもう一度やり直してください')
          })
        console.log(result);
        history.push('/');
      }).catch((error) => {
        console.log(error)
        alert('入力したメールアドレスはすでに使用されています。')
      })
  }

  const classes = useStyles();

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          新規登録
        </Typography>
        <form className={classes.form} noValidate>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="name"
                label="名前"
                name="name"
                autoComplete="name"
                onChange={inputName}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="email"
                label="メールアドレス"
                name="email"
                autoComplete="email"
                onChange={inputEmail}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                name="password"
                label="パスワード"
                type="password"
                id="password"
                autoComplete="current-password"
                onChange={inputPassword}
              />
            </Grid>
          </Grid>
          <Button
            type="button"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            onClick={register}
          >
            登録する
          </Button>
        </form>
      </div>
    </Container>
  );
}

export default SignUp;
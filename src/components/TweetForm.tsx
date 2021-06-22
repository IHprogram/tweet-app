import React, { useState } from 'react'
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { addTweet } from "../actions";
import { useDispatch } from "react-redux";
import { useHistory } from 'react-router-dom'

interface Props {
  loginUserId: string,
  userName: string
}

interface newTweet {
  tweet: string;
  userName: string;
}

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  form: {
    width: '100%',
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

const TweetForm = ({ loginUserId, userName }: Props) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const history = useHistory();

  const [tweet, setTweet] = useState('');

  const inputTweet = (e): void => {
    const new_value: string = e.target.value;
    setTweet(new_value)
  }

  const submit = (): void => {
    const newTweetOb: newTweet = {
      tweet: tweet,
      userName: userName
    }
    dispatch(addTweet(newTweetOb, loginUserId));
    history.push('/')
  }

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Typography component="h1" variant="h5">
          投稿
        </Typography>
        <form className={classes.form} noValidate>
          <TextField
            variant="standard"
            margin="normal"
            required
            fullWidth
            id="email"
            label="投稿内容を入力してください"
            name="email"
            autoComplete="email"
            autoFocus
            onChange={inputTweet}
          />
          <Button
            type="button"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            onClick={submit}
          >
            投稿する
          </Button>
        </form>
      </div>
    </Container>
  );
}

export default TweetForm

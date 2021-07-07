import React, { useState } from 'react'
import {
  useLocation, useParams
} from 'react-router-dom';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import { Button } from "@material-ui/core";
import Box from '@material-ui/core/Box';
import { updateTweet, deleteTweet } from '../actions/index';
import { useDispatch } from "react-redux";
import { useHistory } from 'react-router-dom'
import { Tweet } from '../Types';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import { spacing, sizing } from '@material-ui/system';

interface Props {
  loginUserId: string
}

interface LocationState {
  tweetdata: Tweet,
  userId: string
}

const Detail = ({ loginUserId }: Props) => {
  const location = useLocation();
  const state = location.state as LocationState;
  const tweet: string = state.tweetdata.tweet;
  const userName: string = state.tweetdata.userName;
  const userId: string = state.userId;
  const tweetId: string = state.tweetdata.tweetId;
  const tweetImage: string | undefined = state.tweetdata.tweetImage;

  const [formFlag, setFormFlag] = useState(false);
  const [newTweet, setNewTweet] = useState('');

  const history = useHistory();
  const dispatch = useDispatch();


  const theme = {
    spacing: 10, //「m(margin」や「p(padding)」が「1」につき10pxに設定される。
  }

  const styles = {
    'width': '70vw',
    'margin': '50px auto 0'
  }

  const styles2 = {
    'width': '70%',
    'margin': '0 auto'
  }

  const updateFormStyle = {
    'width': '100%',
    'height': '100%',
  }

  const deleteButton = () => {
    dispatch(deleteTweet(tweetId))
    history.push('/')
  }

  const updateFormButton = () => {
    setFormFlag(true);
  }

  const tweetChange = (e) => {
    const tweet: string = e.target.value;
    setNewTweet(tweet);
  }

  const updateButton = () => {
    dispatch(updateTweet(newTweet, tweetId));
    history.push('/')
  }

  const cancelButton = () => {
    setFormFlag(false);
  }

  return (
    <div>
      <Card style={styles}>
        <CardContent style={styles2}>
          <Typography>
            投稿者名：{userName}
          </Typography>
          <Typography>
            ツイート内容：{tweet}
          </Typography>
          {tweetImage ?
            <Typography>
              <img src={tweetImage} alt="tweetImage" />
            </Typography>
            :
            <Typography>
              画像がございません！
            </Typography>
          }
          {userId === loginUserId ?
            <Box mx="auto">
              <Button variant="outlined" color="secondary" onClick={deleteButton}>削除</Button>
              <Button variant="outlined" color="primary" onClick={updateFormButton}>更新する</Button>
            </Box>
            :
            (<div></div>
            )}
        </CardContent>
      </Card>

      {formFlag ?
        <Grid container style={styles} alignItems="center" justify="center">
          <Grid item xs={12}>
            <form>
              <Grid container alignItems="center" justify="space-between">
                <Grid item>
                  <TextField variant="outlined" label='更新内容' onChange={e => tweetChange(e)} style={updateFormStyle} />
                </Grid>
                <Grid item>
                  <Button variant="outlined" color="primary" onClick={updateButton} style={updateFormStyle}>更新</Button>
                  <Button variant="outlined" onClick={cancelButton} style={updateFormStyle}>キャンセル</Button>
                </Grid>
              </Grid>
            </form>
          </Grid>
        </Grid>
        :
        <div></div>
      }
    </div >
  )
}

export default Detail

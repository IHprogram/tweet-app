import React from 'react'
import {
  useLocation, useParams
} from 'react-router-dom';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import { Button } from "@material-ui/core";
import Box from '@material-ui/core/Box';
import { deleteTweet } from '../actions/index';
import { useDispatch } from "react-redux";
import { useHistory } from 'react-router-dom'
import { Tweet } from '../Types';


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

  const history = useHistory();
  const dispatch = useDispatch();

  const styles = {
    'width': '70vw',
    'margin': '50px auto 0'
  }

  const styles2 = {
    'width': '70%',
    'margin': '0 auto'
  }

  const buttonStyle = {
    'color': 'red',
  }

  const deleteButton = () => {
    dispatch(deleteTweet(tweetId))
    history.push('/')
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
          {userId === loginUserId ?
            <Box mx="auto">
              <Button variant="outlined" color="secondary" onClick={deleteButton}>削除</Button>
            </Box>
            :
            (<div></div>
            )}
        </CardContent>
      </Card>
    </div>
  )
}

export default Detail

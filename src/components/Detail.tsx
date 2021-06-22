import React from 'react'
import {
  useLocation
} from 'react-router-dom';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import { Button } from "@material-ui/core";
import Box from '@material-ui/core/Box';
import { deleteTweet } from '../actions/index';
import { useDispatch } from "react-redux";
import { useHistory } from 'react-router-dom'

interface Props {
  loginUserId: string
}

const Detail = ({ loginUserId }: Props) => {
  const location: any = useLocation();
  const tweet: string = location.state.tweetdata.tweet;
  const userName: string = location.state.tweetdata.userName;
  const userId: string = location.state.userId;
  const tweetId: string = location.state.tweetdata.tweetId;

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
          {/* <button onClick={() => console.log(location)}>確認</button> */}
          {/* <Typography>
            投稿者ID：{userId}
          </Typography> */}
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

import React from 'react'
import {
  useLocation
} from 'react-router-dom';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import { Button } from "@material-ui/core";
import Box from '@material-ui/core/Box';

interface Props {
  loginUserId: string
}

const Detail = ({ loginUserId }: Props) => {
  const location: any = useLocation();
  const tweet: string = location.state.tweetdata.tweet;
  const userId: string = location.state.userId;
  const all: any = location.state.all;

  console.log(tweet)
  console.log(location)

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
    console.log('削除します');
    console.log(loginUserId);
  }

  const check = () => {
    console.log(all);
    console.log(loginUserId)
  }

  return (
    <div>
      <Card style={styles}>
        <CardContent style={styles2}>
          <Typography>
            投稿者ID：{userId}
          </Typography>
          <Typography>
            ツイート内容：{tweet}
          </Typography>
          {/* <div style={buttonWrapper}> */}
          {userId === loginUserId ?
            <Box mx="auto">
              <Button variant="outlined" color="secondary" onClick={deleteButton}>削除</Button>
            </Box>
            :
            (<div>
              <Button onClick={check}>確認</Button>
            </div>
            )}
          {/* </div> */}
        </CardContent>
      </Card>
    </div>
  )
}

export default Detail

import React from 'react'
import {
  useLocation
} from 'react-router-dom';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';

const Detail = () => {
  const location: any = useLocation();
  const tweet: string = location.state.tweetdata.tweet;
  const userId: string = location.state.userId;

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
        </CardContent>
      </Card>
    </div>
  )
}

export default Detail

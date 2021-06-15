import React from 'react'
import {
  useLocation
} from 'react-router-dom';

const Detail = () => {
  // const location = useLocation();
  // const task = location.state.somedata;
  // console.log(location)
  return (
    <div>
      <div>
        <p>ユーザー名がここに入ります</p>
      </div>
      {/* <ul>
        <li>チケット名: {.title}</li>
        <li>詳細: {task.detail}</li>
        <li>担当者: {task.human}</li>
        <li>期日: {task.deadline}</li>
        <li>開始日: {task.start}</li>
      </ul> */}
      <div>
        ツイート内容を表示
      </div>
    </div>
  )
}

export default Detail

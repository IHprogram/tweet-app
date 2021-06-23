import { setTweets, addNewTweet, deleteStateTweet } from '../actions'
import { render, screen } from '@testing-library/react';
import Header from '../components/header/Header'
import TweetForm from '../components/TweetForm'
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import reducer from '../reducers/index';
import { MemoryRouter } from 'react-router-dom'
import { Tweet } from '../Types';

const store = createStore(reducer, applyMiddleware(thunk));

// import reducer from '../reducer/tweet'

describe('ヘッダーのテキストの確認', () => {
  test('ヘッダーロゴ「Tweet App」が表示されているか確認', () => {
    const loginUser = false;
    render(<Provider store={store}><MemoryRouter><Header loginUser={loginUser} /></MemoryRouter></Provider>);
    const linkElement = screen.getByText('Tweet App');
    expect(linkElement).toBeInTheDocument();
  })

  test('ログアウト時に、ログイン画面へのリンクボタンが表示されているか確認', () => {
    // ログアウト時、stateのloginUserの値はfalseになっている
    const loginUser = false;
    render(<Provider store={store}><MemoryRouter><Header loginUser={loginUser} /></MemoryRouter></Provider>);
    const linkElement = screen.getByText('ログイン');
    expect(linkElement).toBeInTheDocument();
  })

  test('ログアウト時に、新規画面へのリンクボタンが表示されているか確認', () => {
    const loginUser = false;
    render(<Provider store={store}><MemoryRouter><Header loginUser={loginUser} /></MemoryRouter></Provider>);
    const linkElement = screen.getByText('新規登録');
    expect(linkElement).toBeInTheDocument();
  })

  test('ログイン時に、ツイート投稿画面へのリンクボタンが表示されているか確認', () => {
    // ログイン時、stateのloginUserの値はtrueになっている
    const loginUser = true;
    render(<Provider store={store}><MemoryRouter><Header loginUser={loginUser} /></MemoryRouter></Provider>);
    const linkElement = screen.getByText('投稿する');
    expect(linkElement).toBeInTheDocument();
  })

  test('ログイン時に、ログアウトボタンが表示されているか確認', () => {
    const loginUser = true;
    render(<Provider store={store}><MemoryRouter><Header loginUser={loginUser} /></MemoryRouter></Provider>);
    const linkElement = screen.getByText('ログアウト');
    expect(linkElement).toBeInTheDocument();
  })
})

describe('ツイート投稿画面のテキストの確認', () => {
  test('タイトルが表示されているかを確認', () => {
    const loginUserId = 'UserId0123456789';
    const userName = 'テストユーザー';
    render(<Provider store={store}><MemoryRouter><TweetForm loginUserId={loginUserId} userName={userName} /></MemoryRouter></Provider>);
    const linkElement = screen.getByText('投稿');
    expect(linkElement).toBeInTheDocument();
  })

  test('投稿ボタンが表示されているかを確認', () => {
    const loginUserId = 'UserId0123456789';
    const userName = 'テストユーザー';
    render(<Provider store={store}><MemoryRouter><TweetForm loginUserId={loginUserId} userName={userName} /></MemoryRouter></Provider>);
    const linkElement = screen.getByText('投稿する');
    expect(linkElement).toBeInTheDocument();
  })

  test('投稿フォームのラベル確認', () => {
    const loginUserId = 'UserId0123456789';
    const userName = 'テストユーザー';
    render(<Provider store={store}><MemoryRouter><TweetForm loginUserId={loginUserId} userName={userName} /></MemoryRouter></Provider>);
    expect(screen.getByText('投稿内容を入力してください')).toBeInTheDocument();
  })
})

describe('Actions', () => {
  test('ActionCreatorのsetTweetsをテスト', () => {
    const tweets = [
      {
        tweet: 'ツイートです',
        tweetId: 'TwitterId0123456789',
        userId: 'UserId0123456789',
        userName: 'テストユーザー'
      }
    ];

    const result = setTweets(tweets);

    const expected = {
      type: 'SET_TWEETS',
      tweets: tweets
    }
    expect(result).toEqual(expected);
  })

  test('ActionCreatorのaddNewTweetをテスト', () => {
    const tweet = {
      tweet: 'ツイートです',
      tweetId: 'TwitterId0123456789',
      userId: 'UserId0123456789',
      userName: 'テストユーザー'
    };
    const result = addNewTweet(tweet);
    const expected = {
      type: 'ADD_NEW_TWEET',
      tweet: tweet
    }

    expect(result).toEqual(expected);
  })

  test('ActionCreatorのdeleteStateTweetをテスト', () => {
    const tweetId = 'TwitterId0123456789';
    const result = deleteStateTweet(tweetId);
    const expected = {
      type: 'DELETE_STATE_TWEET',
      tweetId: tweetId
    }
    expect(result).toEqual(expected)
  })
})



// describe('tweets Reducer', () => {
//   test('初期値', () => {
//     const state = undefined;
//     const action = {};
//     const result = reducer(state, action);
//     const expect = {

//     }
//   })
// })
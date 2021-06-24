import { setTweets, addNewTweet, deleteStateTweet, fetchAllTweets } from '../actions'
import { render, screen } from '@testing-library/react';
import Header from '../components/header/Header'
// import App from '../App.tsx'
import TweetForm from '../components/TweetForm'
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import reducer from '../reducers/index';
import { MemoryRouter } from 'react-router-dom';
import configureStore from 'redux-mock-store';
import firebase from '../firebase/firebase'

const store = createStore(reducer, applyMiddleware(thunk));
const middlewares = [thunk];
const mockStore = configureStore(middlewares);

// middlewareの関数を定義
const thunk2 =
  ({ dispatch, getState }) =>
    next =>
      action => {
        if (typeof action === 'function') {
          return action(dispatch, getState)
        }
        return next(action)
      }

const create = () => {
  const store2 = {
    getState: jest.fn(() => ({})),
    dispatch: jest.fn()
  }
  const next = jest.fn()
  const invoke = action => thunk2(store2)(next)(action)
  return { store2, next, invoke }
}

describe('非同期ActionCreatorに関するテスト', () => {
  test('fetchAllTweetsの確認', () => {
    const { next, invoke } = create();
    const action = { type: 'SET_TWEETS' };
    invoke(action)
    expect(next).toHaveBeenCalledWith(action)
  })

  test('addTweetの確認', () => {
    const { next, invoke } = create();
    const action = { type: 'ADD_NEW_TWEET' };
    invoke(action)
    expect(next).toHaveBeenCalledWith(action)
  })

  test('関数の呼び出しを確認', () => {
    const { invoke } = create()
    const fn = jest.fn();
    invoke(fn)
    expect(fn).toHaveBeenCalled()
  })

  test('dispatchとgetStateを返すことを確認', () => {
    const { store2, invoke } = create();
    invoke((dispatch, getState) => {
      dispatch('SET_TWEETS');
      getState();
    })
    expect(store2.dispatch).toHaveBeenCalledWith('SET_TWEETS')
    expect(store2.getState).toHaveBeenCalled()
  })
})

describe('ヘッダーのテキストの確認！', () => {

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
    // console.log(linkElement)
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

describe('Reducer', () => {
  test('初期値の確認', () => {
    const state = undefined;
    const action = {};
    const result = reducer(state, action);
    const expected = {
      User: {
        name: '',
        email: '',
        login_user: false
      },
      Tweet: []
    }
    expect(result).toEqual(expected)
  })

  test('SET_TWEETSアクションの動作確認', () => {
    const state = undefined;
    const action = {
      type: 'SET_TWEETS',
      tweets: [{
        tweet: 'ツイートです',
        tweetId: 'TwitterId0123456789',
        userId: 'UserId0123456789',
        userName: 'テストユーザー'
      }]
    };
    const result = reducer(state, action);
    const expected = {
      User: {
        name: '',
        email: '',
        login_user: false
      },
      Tweet: [
        {
          tweet: 'ツイートです',
          tweetId: 'TwitterId0123456789',
          userId: 'UserId0123456789',
          userName: 'テストユーザー'
        }
      ]
    };
    expect(result).toEqual(expected)
  })

  test('ADD_NEW_TWEETアクションの動作確認', () => {
    const state = undefined;
    const action = {
      type: 'ADD_NEW_TWEET',
      tweet: {
        tweet: 'ツイートです',
        tweetId: 'TwitterId0123456789',
        userId: 'UserId0123456789',
        userName: 'テストユーザー'
      }
    };
    const result = reducer(state, action);
    const expected = {
      User: {
        name: '',
        email: '',
        login_user: false
      },
      Tweet: [
        {
          tweet: 'ツイートです',
          tweetId: 'TwitterId0123456789',
          userId: 'UserId0123456789',
          userName: 'テストユーザー'
        }
      ]
    };
    expect(result).toEqual(expected);
  })

  test('DELETE_STATE_TWEETアクションの動作確認', () => {
    const state = {
      Tweet: [{
        tweet: 'ツイートです',
        tweetId: 'TwitterId0123456789',
        userId: 'UserId0123456789',
        userName: 'テストユーザー'
      }]
    };
    const action = {
      type: 'DELETE_STATE_TWEET',
      tweetId: 'TwitterId0123456789'
    };
    const result = reducer(state, action);
    const expected = {
      User: {
        name: '',
        email: '',
        login_user: false
      },
      Tweet: []
    };
    expect(result).toEqual(expected);
  })
})
// import { setUserInfo } from '../actions'
// import { useDispatch } from "react-redux";
import { render, screen } from '@testing-library/react';
import Header from '../components/header/Header'
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import reducer from '../reducers/index';
import { MemoryRouter } from 'react-router-dom'

const store = createStore(reducer, applyMiddleware(thunk));

// import reducer from '../reducer/tweet'

describe('ヘッダーのテキストの確認', () => {
  test('ヘッダーロゴ「Tweet App」が表示されているか確認', () => {
    const loginUser = false;
    render(<Provider store={store}><MemoryRouter><Header loginUser={loginUser} /></MemoryRouter></Provider>);
    const linkElement = screen.getByText(/Tweet App/i);
    expect(linkElement).toBeInTheDocument();
  })

  test('ログアウト時に、ログイン画面へのリンクボタンが表示されているか確認', () => {
    // ログアウト時、stateのloginUserの値はfalseになっている
    const loginUser = false;
    render(<Provider store={store}><MemoryRouter><Header loginUser={loginUser} /></MemoryRouter></Provider>);
    const linkElement = screen.getByText(/ログイン/i);
    expect(linkElement).toBeInTheDocument();
  })

  test('ログアウト時に、新規画面へのリンクボタンが表示されているか確認', () => {
    const loginUser = false;
    render(<Provider store={store}><MemoryRouter><Header loginUser={loginUser} /></MemoryRouter></Provider>);
    const linkElement = screen.getByText(/新規登録/i);
    expect(linkElement).toBeInTheDocument();
  })

  test('ログイン時に、ツイート投稿画面へのリンクボタンが表示されているか確認', () => {
    // ログイン時、stateのloginUserの値はtrueになっている
    const loginUser = true;
    render(<Provider store={store}><MemoryRouter><Header loginUser={loginUser} /></MemoryRouter></Provider>);
    const linkElement = screen.getByText(/投稿する/i);
    expect(linkElement).toBeInTheDocument();
  })

  test('ログイン時に、ログアウトボタンが表示されているか確認', () => {
    const loginUser = true;
    render(<Provider store={store}><MemoryRouter><Header loginUser={loginUser} /></MemoryRouter></Provider>);
    const linkElement = screen.getByText(/ログアウト/i);
    expect(linkElement).toBeInTheDocument();
  })
})

// describe('Actions', () => {
//   test('ActionCreatorのsetUserInfoをテスト', () => {

//     const name = "名前";
//     const email = 'email@email.com';
//     const result = dispatch(setUserInfo(name, email))
//     // const result = setUserInfo(name, email);
//     const login_user = true;
//     const expected = {
//       type: 'SET_USER_INFO',
//       name: name,
//       email: email,
//       login_user: login_user
//     }

//     expect(result).toEqual(expected);
//   })
// })

// describe('tweets Reducer', () => {
//   test('初期値', () => {
//     const state = undefined;
//     const action = {};
//     const result = reducer(state, action);
//     const expect = {

//     }
//   })
// })
import { render, screen } from '@testing-library/react';
import Login from '../components/Login'
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import reducer from '../reducers/index';
import { MemoryRouter } from 'react-router-dom'

const store = createStore(reducer, applyMiddleware(thunk));

describe('テキストが表示されているかの確認', () => {
  describe('ログイン画面のテキスト確認', () => {
    // render(<Provider store={store}><MemoryRouter><Login /></MemoryRouter></Provider>);
    test('ログイン画面のタイトル確認', () => {
      render(<Provider store={store}><MemoryRouter><Login /></MemoryRouter></Provider>);
      expect(screen.getByText('ログイン')).toBeInTheDocument();
    })

    test('ログインボタンのテキスト確認', () => {
      render(<Provider store={store}><MemoryRouter><Login /></MemoryRouter></Provider>);
      expect(screen.getByText('ログインする')).toBeInTheDocument();
    })

    test('新規登録画面へのリンクボタンのテキスト確認', () => {
      render(<Provider store={store}><MemoryRouter><Login /></MemoryRouter></Provider>);
      expect(screen.getByText('登録していない方はこちらから')).toBeInTheDocument();
    })

    test('メールアドレスのラベル確認', () => {
      render(<Provider store={store}><MemoryRouter><Login /></MemoryRouter></Provider>);
      expect(screen.getByText('メールアドレス')).toBeInTheDocument();
    })

    test('パスワードのラベル確認', () => {
      render(<Provider store={store}><MemoryRouter><Login /></MemoryRouter></Provider>);
      expect(screen.getByText('パスワード')).toBeInTheDocument();
    })
  })
})



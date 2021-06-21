import { setUserInfo } from '../actions'

describe('Actions', () => {

  // ActionCreatorのsetUserInfoをテスト
  test('set user', () => {
    const name = "名前";
    const email = 'email@email.com';
    const result = setUserInfo(name, email);
    const login_user = true;
    const expected = {
      type: 'SET_USER_INFO',
      name: name,
      email: email,
      login_user: login_user
    }

    expect(result).toEqual(expected);
  })
})
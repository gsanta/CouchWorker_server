import { LoginModel } from './LoginModel';

export const LOGIN = 'LOGIN';

export function login(login: LoginModel) {
  return {
    type: LOGIN,
    login
  }
}
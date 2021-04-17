import React, {useReducer} from 'react';
import {setCookie} from '../utils/cookie';
import cuid from 'cuid';
import parseSearch from '../utils/parseSearch';
import {getCookie} from '../utils/cookie';
// import authentication from '../utils/authenticate';

export const LOGIN = 'LOGIN'
export const LOGOUT = 'LOGOUT'
export const SET_USER = 'SET_USER'
export const SET_ORDER = 'SET_ORDER'
export const RELOAD = 'RELOAD'
export const CLOSE_ALL = 'CLOSE_ALL'
export const SET_WEIXIN = 'SET_WEIXIN'


export const AuthContext = React.createContext()

const reducer = (state, action) => {
  switch (action.type) {
    case LOGIN:
      // console.log('logged in !')
      return {...state, login: true, user: action.user}
    case LOGOUT:
      console.log('logout')
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      setCookie('token', '', -365);
      return {...state, login: false, user: null}
    case SET_USER:
      // console.log('set_user', action.user);
      return {...state, user: action.user, order: action.order} // reload: cuid()
    case SET_ORDER:
      // console.log('set_order', action.order);
      return {...state, order: action.order};
    case SET_WEIXIN:
        // console.log('set_order', action.order);
        return {...state, weixin: action.weixin};
    case RELOAD: 
      // console.log('action.type:', action.type)
      return {...state, reload: cuid()}
    default: 
      
      return state
  }
}

const searchObj = parseSearch(window.location.search);
let token = localStorage.getItem('token') || getCookie('token');

if (searchObj.token) {
  token = searchObj.token;
  localStorage.setItem('token', searchObj.token);
  setCookie('token', searchObj.token, 180);
}

const defaultStore = {
  login: token, 
  user: null,
  order: null,
  weixin: null,
  reload: cuid()
}

export const AuthProvider = ({children}) => {

  const store = useReducer(reducer, defaultStore)

  return (
    <AuthContext.Provider value={store}>
      {children}
    </AuthContext.Provider>
  )
}



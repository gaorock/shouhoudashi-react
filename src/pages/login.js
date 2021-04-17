import React from 'react';
import Wrapper from '../components/wrapper';
import {Redirect} from 'react-router-dom';
import { EyeInvisibleOutlined, EyeOutlined } from '@ant-design/icons';
import { setCookie } from '../utils/cookie';
import { Button, InputBase as Input, CircularProgress } from '@material-ui/core';
import {login_post} from '../data/urls';
import {
  HttpsOutlined as LockIcon,
  PersonOutlineOutlined as UserIcon
} from '@material-ui/icons';
import {AuthContext, LOGIN} from '../context/LoginContext';

import {
  useHistory,
  useLocation
} from "react-router-dom";

export default function Login () {
  const [logging, setLogging] = React.useState(false);
  const [error, setError] = React.useState(false);
  const [showpass, setShowpass] = React.useState(false);
  const [username, setUsername] = React.useState('');
  const [password, setPassword] = React.useState('');

  let history = useHistory();
  let location = useLocation();
  let { from } = location.state || { from: { pathname: "/" } };

  
  const [{login}, dispatch] = React.useContext(AuthContext);

  if (login) return <Redirect
                      to={{
                        pathname: "/",
                        state: { from: location }
                      }}
                    />

  
  // user Login
  const onSubmit = async () => {
    // e.preventDefault();
    const data = {
      device_type: 'mobile',
      name: username.trim(),
      password
    }
    setLogging(true)
    // console.log(data)

    // const url = 'http://kxp33.cnduomi.com/api/weixin/public/login';

    try {
      const response = await fetch(login_post, {
        headers: {
          'content-type': 'application/json',
        },
        body: JSON.stringify(data),
        method: 'POST',
      })
      const json = await response.json();
      // console.log(json)
      
      
      if (json.code === 1) {
        // login success
        const backdata = json.data;
        if (backdata.token && backdata.user) {
          console.log('normal login')
          localStorage.setItem('token', backdata.token)
          setCookie('token', backdata.token, 365);
          localStorage.setItem('user', JSON.stringify(backdata.user))
          dispatch({type: LOGIN, user: backdata.user })
          history.replace(from);
        }
        
      } else {
        // login error
        setError(true)
      }
      
    }catch(e) {
      // setError(true)
    }
    setLogging(false)
  }

  const handleChangeName = e => {
    if (error) setError(false);
    setUsername(e.target.value)
  }

  const handleChangePass = e => {
    if (error) setError(false);
    setPassword(e.target.value)
  }

  // const handleCloseError = () => {
  //   setError(false)
  // }


  return (
    <Wrapper className="page-login" title="售后大师-维修端-登陆">
      <h1>售后大师-登陆</h1>
      <div className="page-login-item">
        <p className="login-label-wrapper">
          <span className="login-label-icon"><UserIcon style={{color:'#8a8b99', fontSize: '1rem'}} /></span>
          <span className="login-label-text">账号</span>
        </p>
        <div className="login-input-wrapper">
          <Input
            type="text"
            className="login-input"
            placeholder="请输入您的账号"
            maxLength={50}
            value={username}
            onChange={handleChangeName}
          />
        </div>
      </div>
      <div className="page-login-item">
        <p className="login-label-wrapper">
          <span className="login-label-icon"><LockIcon style={{color:'#8a8b99', fontSize: '1rem'}} /></span>
          <span className="login-label-text">密码</span>
        </p>
        <div className="login-input-wrapper">
          <Input
            type={!showpass?"password":"text"}
            className="login-input"
            placeholder="请输入您的密码"
            maxLength={50}
            value={password}
            onChange={handleChangePass}
          />
          <div onClick={() => setShowpass(!showpass)}>
            {!showpass?<EyeOutlined className="login-input-icon"/>:<EyeInvisibleOutlined className="login-input-icon"/>}
          </div>
        </div>
      </div>
      {error && <div className="error">用户名或密码不正确</div>}
      <Button className="login-button" onClick={onSubmit} disabled={logging}>{logging?<CircularProgress />:'登陆'}</Button>
    </Wrapper>
  )
}



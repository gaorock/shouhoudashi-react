import React from 'react';
import {Helmet} from "react-helmet";
import { EyeInvisibleOutlined, EyeOutlined } from '@ant-design/icons';

import { Button, InputBase as Input } from '@material-ui/core';
import {
  HttpsOutlined as LockIcon,
  PersonOutlineOutlined as UserIcon
} from '@material-ui/icons';

import {
  useHistory,
  useLocation
} from "react-router-dom";


export default function Login () {
  const [showpass, setShowpass] = React.useState(false);

  let history = useHistory();
  let location = useLocation();
  // let auth = useAuth();

  let { from } = location.state || { from: { pathname: "/" } };

  const onSubmit = e => {
    // e.preventDefault();
    localStorage.setItem('login', 'true');
    console.log('login')
    history.replace(from);
  }
  


  return (
    <section className="page-login">
        <Helmet>
          <title>售后大师-维修端-登陆</title>
        </Helmet>
      <div className="page-content" onSubmit={onSubmit}>
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
              autoFocus
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
            />
            <div onClick={() => setShowpass(!showpass)}>
              {!showpass?<EyeOutlined className="login-input-icon"/>:<EyeInvisibleOutlined className="login-input-icon"/>}
            </div>
          </div>
        </div>

        <Button className="login-button" onClick={onSubmit}>登陆</Button>
      </div>
    
    </section>
  )
}
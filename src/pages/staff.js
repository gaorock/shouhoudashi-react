import React from 'react';
import {Helmet} from "react-helmet";

import { Avatar, Grid, Button} from '@material-ui/core';
import {
  PhoneIphoneOutlined,
  // WatchLater,
  // SwapHorizontalCircleRounded
} from '@material-ui/icons';

import {
  Link
} from "react-router-dom";


export default function Staff () {
  // const [showpass, setShowpass] = React.useState(false);
  const data = [1,2,3,4,5,6]


  return (
    <section className="page-staff">
        <Helmet>
          <title>人员管理</title>
        </Helmet>
      <div className="page-content">
        <Grid container spacing={1} className="utils">
          <Grid item xs={6}>
            <Link className="invite" to="/staff/invite">
              <p>邀请二维码</p>
              <div className="qrcode"></div>
            </Link>
          </Grid>
          <Grid item xs={6}>
            <Link className="add" to="/staff/add">
              <p>添加人员</p>
              <div className="addstaff"></div>
            </Link>
          </Grid>
        </Grid>
        <div className="staff-list">
          {data.map(person => <Person key={person}/>)}
        </div>
      </div>
    
    </section>
  )
}


function Person () {
  return (
    <div>
      <div className="staff-info">
        <Avatar alt="Remy Sharp" src="/image/person.png" className="user-icon" />
        <div className="details">
          <h1>李清华<span><PhoneIphoneOutlined className="phone" />13681212121</span></h1>
          <p>入职时间：2020-11-24</p>
          <p>维修类型：电脑、冰箱、打印机、桌椅、空调</p>
        </div>
      </div>
      <div className="staff-btn">
        <Button className="del">删除</Button>
        <Button className="alt">修改</Button>
      </div>
    </div>
  )
}
import React from 'react';
import {Helmet} from "react-helmet";
// import { Input } from 'antd';
// import { EyeInvisibleOutlined, EyeOutlined } from '@ant-design/icons';
import {
  Link
} from "react-router-dom";

import { Grid, Avatar } from '@material-ui/core';
import {
  PhoneIphoneOutlined,
  // WatchLater,
  // SwapHorizontalCircleRounded
} from '@material-ui/icons';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { 
  faClock,
  faArrowCircleRight,
  faTools,
  faCheckCircle,
  faUserCog,
  faChartPie,
  faCog,
  faSignOutAlt
} from '@fortawesome/free-solid-svg-icons'




export default function Login () {


  return (
    <section className="page-home">
        <Helmet>
          <title>售后大师-维修端</title>
        </Helmet>
      <div className="page-content">
        <div className="user-info">
          <div>
            <Avatar alt="Remy Sharp" src="/image/person.png" className="user-icon" />
          </div>
          <div className="user-detail">
            <p><b>李清华</b><span>麦秸印象科技有限公司</span></p>
            <p className="align-center"><PhoneIphoneOutlined className="icon"/><i>13688886666</i></p>
          </div>
        </div>
        <div className="order-wrapper">
          <h3>订单管理</h3>
          <Grid container spacing={1}>
            <Grid item xs={3}>
              <Link className="order-item" num={2} to="/orderlist">
                <span num={1||null}><FontAwesomeIcon icon={faClock} className="icon"/></span>
                <h5>待处理</h5>
              </Link>
            </Grid>
            <Grid item xs={3}>
              <Link className="order-item" to="/orderlist">
                <FontAwesomeIcon icon={faArrowCircleRight} className="icon" />
                <h5>待指派</h5>
              </Link>
            </Grid>
            <Grid item xs={3}>
              <Link className="order-item" to="/orderlist">
                <FontAwesomeIcon icon={faTools} className="icon" />
                <h5>维修中</h5>
              </Link>
            </Grid>
            <Grid item xs={3}>
              <Link className="order-item" to="/orderlist">
                <FontAwesomeIcon icon={faCheckCircle} className="icon" />
                <h5>已结束</h5>
              </Link>
            </Grid>
          </Grid>
        </div>
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <Link to="/staff" className="util-item">
              <FontAwesomeIcon icon={faUserCog} className="icon" />
              <h5>人员管理</h5>
            </Link>
          </Grid>
          <Grid item xs={6}>
            <div className="util-item">
              <FontAwesomeIcon icon={faChartPie} className="icon" />
              <h5>维修统计</h5>
            </div>
          </Grid>
          <Grid item xs={6}>
            <Link className="util-item" to="/gear">
              <FontAwesomeIcon icon={faCog} className="icon" />
              <h5>备件</h5>
            </Link>
          </Grid>
          <Grid item xs={6}>
            <div className="util-item">
              <FontAwesomeIcon icon={faSignOutAlt} className="icon" />
              <h5>退出登陆</h5>
            </div>
          </Grid>
        </Grid>
      </div>
    </section>
  )
}
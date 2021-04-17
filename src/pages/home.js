import React from 'react';
import Wrapper from '../components/wrapper';
// import authentication from '../utils/authenticate';
// import { Input } from 'antd';
// import { EyeInvisibleOutlined, EyeOutlined } from '@ant-design/icons';
import { Link, useHistory } from "react-router-dom";

import { Grid, Avatar } from '@material-ui/core';
import {AuthContext, LOGOUT} from '../context/LoginContext';
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




export default function Home () {
  const [{order, user}, dispatch] = React.useContext(AuthContext);

  // console.log('home page:', order, user)

  // React.useEffect(() => {
  //   const token = localStorage.getItem('token');
  //   authentication(token).then(res => {
  //     // console.log(res)
  //     dispatch({type: SET_ORDER, order: res.order})
  //   }).catch(e => {
  //     console.log(e)
  //   })
  //   // console.log('app update order.')
  // }, [dispatch])

  const history = useHistory();


  const logout = () => {
    dispatch({type: LOGOUT})
    history.replace('/login')
  }

  const userPre = {
    name: (user && user.name) ? user.name: '李清华',
    phone: (user && user.mobile) ? user.mobile: '13681211170',
    isMaster: user ? !!user.is_main_account: false,
    avatar: user &&user.avatar ? user.avatar:'/image/person.png'
  }

  const orderPre = {
    dcl: order && order.dcl? order.dcl:null,
    dzp: order && order.dzp? order.dzp:null,
    wxz: order && order.wxz? order.wxz:null,
    yjs: order && order.yjs? order.yjs:null
  }

  return (
    <Wrapper className="page-home" title="售后大师-维修端">  
      <div className="user-info">
        <div>
          <Avatar alt="Remy Sharp" src={userPre.avatar} className="user-icon" />
        </div>
        <div className="user-detail">
          <p><b>{userPre.name}</b><span>麦秸印象科技有限公司</span></p>
          <p className="align-center"><PhoneIphoneOutlined className="icon"/><i>{userPre.phone}</i></p>
        </div>
      </div>
      <div className="order-wrapper">
        <h3>订单管理</h3>
        <Grid container spacing={1}>
          <Grid item xs={3}>
            <Link className="order-item" to="/orderlist/1">
              <span>
                <FontAwesomeIcon icon={faClock} className="icon"/>
                {orderPre && <div className="number">{orderPre.dcl}</div>}
              </span>
              <h5>待处理</h5>
            </Link>
          </Grid>
          <Grid item xs={3}>
            <Link className="order-item" to="/orderlist/2">
              <span>
                <FontAwesomeIcon icon={faArrowCircleRight} className="icon" />
                {orderPre && <div className="number">{orderPre.dzp}</div>}
              </span>
              <h5>待指派</h5>
            </Link>
          </Grid>
          <Grid item xs={3}>
            <Link className="order-item" to="/orderlist/3">
              <span>
                <FontAwesomeIcon icon={faTools} className="icon" />
                {orderPre && <div className="number">{orderPre.wxz}</div>}
              </span>
              <h5>维修中</h5>
            </Link>
          </Grid>
          <Grid item xs={3}>
            <Link className="order-item" to="/orderlist/4">
              <span>
                <FontAwesomeIcon icon={faCheckCircle} className="icon" />
                {orderPre && <div className="number">{orderPre.yjs}</div>}
              </span>
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
          <div className="util-item" to="/gear">
            <FontAwesomeIcon icon={faCog} className="icon" />
            <h5>备件</h5>
          </div>
        </Grid>
        <Grid item xs={6}>
          <div className="util-item" onClick={logout}>
            <FontAwesomeIcon icon={faSignOutAlt} className="icon" />
            <h5>退出登陆</h5>
          </div>
        </Grid>
      </Grid>
    </Wrapper>
  )
}
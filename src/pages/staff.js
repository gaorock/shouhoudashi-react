import React from 'react';
import Wrapper from '../components/wrapper';
import request from '../utils/request';
import Inform from '../components/inform';
import Loading from '../components/loading';
import {AuthContext} from '../context/LoginContext';
import { Avatar, Grid, Button} from '@material-ui/core';
import {user_list, del_user} from '../data/urls';
import {
  PhoneIphoneOutlined,

} from '@material-ui/icons';

import { Link } from "react-router-dom";


export default function Staff () {
  const [alert, setAlert] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const selectedID = React.useRef(null);
  const [list, setList] = React.useState([]);
  const [{user}] = React.useContext(AuthContext);
  // const url = 'http://kxp33.cnduomi.com/api/weixin/user/user_list';

  React.useEffect(() => {
    request(user_list).then(res => {
      console.log('staff list:', res)
      setLoading(false)
      setList(res)
    }).catch(e => {
      setLoading(false)
      console.log(e)
    })
  }, [])

  const onDelete = id => {
    selectedID.current = id;
    setAlert(true)
  }

  const onSuccess = () => {
    request(user_list).then(res => {
      console.log('staff list:', res)
      setList(res)
    }).catch(e => {
      console.log(e)
    })
    setAlert(false)
  }


  return (
    <Wrapper className="page-staff" title="人员管理">
      {Boolean(user && user.is_main_account) && <Grid container spacing={1} className="utils">
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
      </Grid>}
      <div className="staff-list">
        {list.map(p => <Person key={p.id} 
                          avatar={p.avatar}
                          name={p.name} 
                          phone={p.mobile}
                          entry={p.entry_time}
                          cates={p.cates}
                          main={user && user.is_main_account}
                          onDelete={() => onDelete(p.id)}
                          id={p.id}
                        />)}
      </div>

      {alert && <Inform 
                  to="/staff" 
                  url={del_user} // "http://kxp33.cnduomi.com/api/weixin/user/delete"
                  data={{id: selectedID.current}}
                  informText="删除成功"
                  onSuccess={onSuccess}
                />}

      {/* initial loading */}
      <Loading open={loading}/>
    </Wrapper>
  )
}




function Person ({id, avatar, name, phone, entry, cates = [], main, onDelete}) {
  
  return (
    <div>
      <div className="staff-info">
        <Avatar alt="Remy Sharp" src={avatar || "/image/person.png"} className="user-icon" />
        <div className="details">
          <h1>{name}<span><PhoneIphoneOutlined className="phone" />{phone}</span></h1>
          <p>入职时间：{entry}</p>
          <p>维修类型：{cates.join('、')}</p>
        </div>
      </div>
      {Boolean(main) && <div className="staff-btn">
        <Button className="del" onClick={onDelete}>删除</Button>
        <Link to={`/staff/${id}`}><Button className="alt">修改</Button></Link>
      </div>}

    </div>
  )
}
import React, {useState} from 'react';
import Wrapper from '../components/wrapper';

import format from '../utils/formatDate';
import request from '../utils/request';
import {add_user, repair_type} from '../data/urls';
import { Button, InputBase as Input } from '@material-ui/core';
import List from 'antd-mobile/lib/list';
import DatePicker from 'antd-mobile/lib/date-picker';

import Inform from '../components/inform';


export default function StaffAdd () {
  const [type, setType] = useState([]);
  const [date, setDate] = useState(new Date());
  const [name, setName] = useState('');
  const [pass, setPass] = useState('');
  const [phone, setPhone] = useState('');

  const [submitting, setSubmitting] = useState(false)

  // const url = 'http://kxp33.cnduomi.com/api/weixin/user/add_user';

  React.useEffect(() => {
    // const type_url = 'http://kxp33.cnduomi.com/api/weixin/user/get_equip_cate';
    request(repair_type).then(res => {
      if (res instanceof Array) setType(res)
    }).catch(e => {
      console.log(e)
    })
  }, [])


  const setActive = id => {
    const newSelected = type.map(i => {
      if (i.id === id) i.active = !i.active
      return i
    })
    setType(newSelected)
  }


  return (
    <Wrapper className="page-staff-add" title="添加人员">
      <div className="staff-input">
        <div className="input-wrapper"><label>姓名</label><Input value={name} onChange={e => setName(e.target.value)} placeholder="请输入姓名" className="input" /></div>
        <div className="input-wrapper"><label>手机号</label><Input value={phone} onChange={e => setPhone(e.target.value)} placeholder="请输入手机号" className="input" type="number"/></div>
        <div className="input-wrapper"><label>密码</label><Input value={pass} onChange={e => setPass(e.target.value)} placeholder="请输入密码" className="input" type="password"/></div>
        <div className="input-wrapper">
          <label>入职时间</label>
          <div className="data-wrapper">
            <DatePicker
              mode="date"
              title="选择日期"
              value={date}
              onChange={date => setDate(date)}
            >
              <List.Item arrow="horizontal" className="input-data"></List.Item>
            </DatePicker>
          </div>
        </div>
      </div>
      <div className="staff-skill">
        <div className="skill-type">
          <h3>维修类型</h3>
          <ul>
            {type.map(i => <li key={i.id} className={i.active?'active':null} onClick={() => setActive(i.id)}>{i.name}</li>)}
          </ul>
        </div>
        <Button className="confirm" onClick={() => setSubmitting(true)}>确认添加</Button>
      </div>
      {submitting && <Inform 
        to="/staff"
        url={add_user}
        data={{
          name: name,
          user_pass: pass,
          mobile: phone,
          entry_time: format(date, 'yyyy-MM-dd'),
          cate_ids: type.filter(t => t.active).map(i => i.id).join()
        }}
        informText="添加成功"
        onError={() => setSubmitting(false)}
      />}
    </Wrapper>
  )
}
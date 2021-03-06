import React from 'react';
import {Helmet} from "react-helmet";
import cuid from 'cuid';
import { Button, InputBase as Input } from '@material-ui/core';
import { DatePicker, List } from 'antd-mobile';
// import { Picker, WhiteSpace } from 'antd-mobile';

const typeData = [
  '电脑', '冰箱', '电器', '显示器', '饮水机',
  '打印机', '桌椅', '电子设备', '门', '空调',
  '水电', '汽车', '手机', 'LED', '电视',
]


export default function StaffAdd () {
  const [date, setDate] = React.useState(new Date());
  const [selected, setSelected] = React.useState(typeData.map(i => {return  {name: i, id: cuid(), active: false}}))

  const setActive = id => {
    const newSelected = selected.map(i => {
      if (i.id === id) i.active = !i.active
      return i
    })
    setSelected(newSelected)
  }

  return (
    <section className="page-staff-add">
        <Helmet>
          <title>添加人员</title>
        </Helmet>
      <div className="page-content">
        <div className="staff-input">
          <div className="input-wrapper"><label>姓名</label><Input placeholder="请输入姓名" className="input"/></div>
          <div className="input-wrapper"><label>手机号</label><Input placeholder="请输入手机号" className="input" type="number"/></div>
          <div className="input-wrapper"><label>密码</label><Input placeholder="请输入密码" className="input" type="password"/></div>
          <div className="input-wrapper">
            <label>入职时间</label>
            <div className="data-wrapper">
              <DatePicker
                mode="date"
                title="选择日期"
                value={date}
                onChange={date => setDate(date)}
              >
                <List.Item arrow="horizontal" className="input-date"></List.Item>
              </DatePicker>
            </div>
          </div>
        </div>
        <div className="staff-skill">

          <div className="skill-type">
            <h3>维修类型</h3>
            <ul>
              {selected.map(i => <li key={i.id} className={i.active?'active':null} onClick={() => setActive(i.id)}>{i.name}</li>)}
            </ul>
          </div>
          <Button className="confirm">确认添加</Button>
        </div>
      </div>
    
    </section>
  )
}
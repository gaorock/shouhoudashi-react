import React from 'react';
import {Helmet} from "react-helmet";
import {Link} from 'react-router-dom';

import { Button } from '@material-ui/core';

const menu = ['全部', '待处理', '待指派', '维修中', '已结束'];

export default function OrderList () {

  const [menuindex, setMenuindex] = React.useState(0);

  const Menu = ({data = []}) => data.map((item, index) => <Button 
    className={index===0?"all":null}
    onClick={() => setMenuindex(index)}
  >
    <span className={index===menuindex?"active":null}>{item}</span>
  </Button>)
  

  return (
    <section className="page-orderlist">
        <Helmet>
          <title>订单管理</title>
        </Helmet>
      <div className="page-content">
        <div className="header">
          <Menu data={menu}/>
        </div>

        <div className="list">
          <Item type={0}/>
          <Item type={1}/>
          <Item type={2}/>
          <Item type={2}/>
        </div>


      </div>
    
    </section>
  )
}

function Item ({type = 0}) {

  function status (status) {
    switch (status) {
      case 0:
        return '待处理';
      case 1:
        return '待指派';
      case 2:
        return <label>已完成</label>
      default:
        return '待处理'
    }
  }

  return (
    <div className="item">
      <div className="item-top">
        <h3>
          <span className="left">
            <b>惠普打印机</b>
            <i className="status">不加急</i>
            <i className="type">保养订单</i>
          </span>
          <span className="right">{status(type)}</span>
        </h3>

        <div className="address">
          <div className="icon"></div>
          <p>人民路新飞大道南创业小镇1号楼1楼</p>
        </div>
        
      </div>
      <div className="item-mid">
        <p><span>任务描述</span><i>机器无法开机</i></p>
        <p><span>订单号</span><i>202103011141</i></p>
        <p><span>添加日期</span><i>2021-03-01 11:41</i></p>
      </div>
      <div className="item-btn">
        <Link to="/orderlist/123"><Button className="detail">详情</Button></Link>
        {type !== 2 && <Button className="assign">立即接受</Button>}
      </div>
    </div>
  )
}
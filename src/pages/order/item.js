import {useState} from 'react';
import {Link} from 'react-router-dom';
import { Button } from '@material-ui/core';
import Assign from '../../components/assign';
import Inform from '../../components/inform';
import {accept_order, finish_order} from '../../data/urls';


// status: 0.待处理 1.维修中 2.已完成 3.待指派
export default function Item ({
  id,                         // order_id
  status,                     // status: 0.待处理 1.维修中 2.已完成 3.待指派
  type,                       // type: 0.保养订单 1.维修订单 2.新购订单
  is_urgent,                  // 0.不加急 1.加急
  trouble_name = '无标题',     // 订单标题
  trouble_des = '无描述',      // 订单描述
  create_time,                // 添加日期
  order_sn,                   // 订单号
  address,                    // 地址
  onSuccess                   // fire when action complate
}) {
  const orderType = ['保养订单', '维修订单', '新购订单'];
  // console.log(type, is_urgent)

  const getStatus = (status) => {

    const Finish = () => <label>已完成</label>

    switch (status) {
      case 0:
        return {text: '待处理', to: `/orderlist/waiting/${id}`};
      case 1:
        return {text: '维修中', to: `/orderlist/fixing/${id}`};
      case 3:
          return {text: '待指派', to: `/orderlist/assign/${id}`};
      case 2:
      default:
        return {text: <Finish/>, to: `/orderlist/finish/${id}`};
    }
  }

  const info = getStatus(status)

  return (
    <div className="item">
      <div className="item-top">
        <h3>
          <span className="left">
            <b>{trouble_name}</b>
            {!!is_urgent && <i className="status">加急</i>}
            <i className="type">{orderType[type]}</i>
          </span>
          <span className="right">{info.text}</span>
        </h3>

        <div className="address">
          <div className="icon"></div>
          <p>{address}</p>
        </div>
        
      </div>
      <div className="item-mid">
        <p><span>任务描述</span><i>{trouble_des}</i></p>
        <p><span>订单号</span><i>{order_sn}</i></p>
        <p><span>添加日期</span><i>{create_time}</i></p>
      </div>
      
      <div className="item-btn">
        <Link to={info.to}><Button className="detail">详情</Button></Link>
        <RenderButton status={status} id={id}/>
      </div>
    </div>
  )
}

function RenderButton ({status, id}) {
  const [openAssign, setOpenAssign] = useState(false);

  const open = () => {
    setOpenAssign(true)
  }

  const close = () => {
    setOpenAssign(false)
  }



  switch(status) {
    case 0: 
      return (
        <>
          <Button className="assign" onClick={open}>立即接受</Button>
          {openAssign && <Inform data={{id}}
            to="/orderlist/1"
            url={accept_order}
            informText="订单接受成功"
            onError={close}
          />}
        </>
      )
    case 1: 
      return (
        <>
          <Button className="assign" onClick={open}>结束维修</Button>
          {openAssign && <Inform data={{id}}
            to="/orderlist/3"
            url={finish_order}
            informText="维修已结束"
            onError={close}
          />}
        </>
      )
    case 3: 
      return (
        <>
          <Button className="assign" onClick={open}>指派订单</Button>
          {openAssign && <Assign close={close} order_id={id} />}
        </>
      )
    case 2: 
    default:
      return null
  }
}
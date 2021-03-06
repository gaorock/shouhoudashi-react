import React from 'react';
import {Helmet} from "react-helmet";

import { Button, Dialog, Avatar, Backdrop, CircularProgress } from '@material-ui/core';
import {PlayArrow as PlayArrowIcon, HighlightOff, PhoneIphone} from '@material-ui/icons';

// const menu = ['待处理', '待指派', '维修中', '已结束'];
const workers = [1,2,3,4,5,6,7,8,9]

export default function OrderListDetail () {  
  
  const [openAssign, setOpenAssign] = React.useState(false);
  const [openInform, setOpenInform] = React.useState(false);
  const [loading, setLoading] =React.useState(false);

  React.useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  const closeAssign = () => {
    setOpenAssign(false)
  }

  const closeInform = () => {
    setOpenInform(false)
  }

  const assigning = () => {
    setOpenAssign(false);
    setLoading(true);

    setTimeout(() => {
      setLoading(false)
      setOpenInform(true)
    }, 1000)
  }

  return (
    <section className="page-orderlist-detail">
        <Helmet>
          <title>订单详情</title>
        </Helmet>
      <div className="page-header">
        <h1>待指派</h1>
        <div>
          <h5>保养订单</h5>
          <p>下单日期：2021-03-01 11:41</p>
        </div>
      </div>

      <div className="page-body">
        <div className="sec-1">
          <div className="upper">
            <div className="contact">
              <div className="icon"></div>
              <div className="info">
                <h3>
                  <span>李鹏程</span>
                  <span>17630170649</span>
                </h3>
                <p>人民路新飞大道南创业小镇1号楼1楼</p>
              </div>
            </div>
            <div className="gear-info">
              <label>惠普打印机</label>
              <span>加急</span>
            </div>
          </div>
          <div className="lower">
            <div>
              <h5>订单描述</h5>
              <p>打印机开不了机了</p>
            </div>
            <div>
              <h5>故障描述</h5>
              <p>忽然之间不管用了，重新开机也不行，而且噪音很 大感觉马上要爆炸了！</p>
            </div>
            <div>
              <h5>照片</h5>
              <div className="photos">
                <div></div>
                <div></div>
                <div></div>
              </div>
            </div>
            <div>
              <h5>视频</h5>
              <div className="video">
                <PlayArrowIcon className="play"/>
              </div>
            </div>
          </div>
        </div>
        <div className="sec-2">
          <h4>订单信息</h4>
          <li><label>订单编号</label><span>20210301114761</span></li>
          <li><label>下单时间</label><span>2021-03-01 11:41</span></li>
          <li><label>维修公司</label><span>麦秸映像维修公司</span></li>
        </div>
        <Button onClick={() => setOpenAssign(true)}>指派订单</Button>
      </div>

      <Assign open={openAssign} close={closeAssign} send={assigning}/>
      <Inform open={openInform} close={closeInform} />
      
      <Backdrop className="backdrop" open={loading}>
        <CircularProgress color="inherit" />
      </Backdrop>
      
    </section>
  )
}

function Assign ({open, close, send}) {
  return (
    <Dialog
      open={open}
      onClose={close}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
      className="dialog-assign"
    >
      <div className="assign-to">
        <h2>指派订单</h2>
        <ul>
          {workers.map(w => <Worker key={w} send={send} />)}
        </ul>
      </div>
      <div className="close-btn" onClick={close}><HighlightOff className="close"/></div>
    </Dialog>
  )
}

function Inform ({open, close}) {
  return (
    <Dialog
      open={open}
      onClose={close}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
      className="dialog-inform"
    >
      <div className="inform">
       <div className="logo"></div>
       <span>订单指派成功</span>
       <Button onClick={close}>知道了</Button>
      </div>
      
    </Dialog>
  )
}


function Worker ({send}) {
  return (
    <li>
      <div><Avatar/></div>
      <div className="info">
        <h3><label>李菁华</label><span>订单数：2</span></h3>
        <h4><PhoneIphone className="phone"/>13949192603</h4>
      </div>
      <div><Button className="assign" onClick={send}>指派</Button></div>
    </li>
  )
}
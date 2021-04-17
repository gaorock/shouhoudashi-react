import React from 'react';
import { Link, useParams } from "react-router-dom";
import Wrapper from '../components/wrapper';
import Assign from '../components/assign';
import Inform from '../components/inform';
import {order_detail} from '../data/urls';
import Loading from '../components/loading';
import request from '../utils/request';
import { Button } from '@material-ui/core';
import { PlayArrow as PlayArrowIcon, Pause } from '@material-ui/icons';

export default function OrderWaitingDetail () {  
  const { id } = useParams()
  const [data, setData] = React.useState(null);
  const [openAssign, setOpenAssign] = React.useState(false);
  const [openInform, setOpenInform] = React.useState(false);
  const closeAssign = () => {
    setOpenAssign(false)
  }

  const [playing, setPlaying] = React.useState(false);
  const video = React.useRef(null);

  const play = () => {
    video.current.play();
    setPlaying(true)
  }

  const pause = () => {
    video.current.pause();
    setPlaying(false)
  }

  
  const orderType = ['保养订单', '维修订单', '新购订单'];

  React.useEffect(() => {
    // const url = 'http://kxp33.cnduomi.com/api/weixin/order/order_detail';

    request(order_detail, {id}).then(res => {
      setData(res)
    }).catch(e => {
      console.warn(e)
    })
  }, [id])

  return (!data?<Loading/>:
    <Wrapper className="page-orderlist-detail" title="订单详情">
      <div className="page-header">
        <h1>维修中</h1>
        <div>
          <h5>{orderType[data.type]}</h5>
          <p>下单日期：{data.create_time}</p>
        </div>
      </div>

      <div className="page-body">
        <div className="sec-1">
          <div className="upper">
            <div className="contact">
              <div className="icon"></div>
              <div className="info">
                <h3>
                  <span>{data.contact}</span>
                  <span>{data.mobile}</span>
                </h3>
                <p>{data.address}</p>
              </div>
            </div>
            <div className="gear-info">
              <label>{data.equip_name}</label>
              {!!data.is_urgent && <span>加急</span>}
            </div>
          </div>
          <div className="lower">
            <div>
              <h5>订单描述</h5>
              <p>{data.trouble_name}</p>
            </div>
            <div>
              <h5>故障描述</h5>
              <p>{data.trouble_des}</p>
            </div>
            {/* photo */}
            {data.trouble_pic.length > 0 && <div>
              <h5>照片</h5>
              <div className="photos">
                {data.trouble_pic.map(t => <div key={t.uid} style={{backgroundImage: `url(${t.thumbUrl})`}}></div>)}
              </div>
            </div>}
            {/* video */}
            <div>
              {data.trouble_video.length > 0 && <>
                <h5>视频</h5>
                <div className="video">
                <video src={data.trouble_video[0].name} ref={video} preload="false"></video>
                  {playing?
                    <Pause className="play" onClick={pause}/>:
                    <PlayArrowIcon className="play" onClick={play}/>}
                </div>
              </>}

              {/* _orderlist_detail.scss - orderFixingDetail */}
              <div className="more">
                <Button onClick={() => setOpenAssign(true)}>转单</Button>
                <Link to={`/similar/${id}`}><Button className="blue">类似故障</Button></Link>
              </div>
            </div>
          </div>
        </div>
        <div className="sec-2">
          <h4>订单信息</h4>
          <li><label>订单编号</label><span>{data.order_sn}</span></li>
          <li><label>下单时间</label><span>{data.create_time}</span></li>
          <li><label>维修公司</label><span>{data.repair_com_name}</span></li>
        </div>
        <Button onClick={() => setOpenInform(true)}>维修结束</Button>
        
      </div>
      {openAssign && <Assign close={closeAssign} order_id={id} reassign={true}/>}
      {openInform && <Inform data={{id}}
            to="/orderlist/3"
            url="http://kxp33.cnduomi.com/api/weixin/order/complete_order"
            informText="维修已结束"
            onError={() => setOpenInform(false)}
          />}
    </Wrapper>
  )
}


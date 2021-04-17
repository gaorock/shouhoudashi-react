import React from 'react';
import { Link, useParams } from "react-router-dom";
import Wrapper from '../components/wrapper';
import Loading from '../components/loading';
import { Button } from '@material-ui/core';
import request from '../utils/request';
import {similar_order} from '../data/urls';

export default function OrderWaitingDetail () {  
  const { id } = useParams();
  const [data, setData] = React.useState(null);

  React.useEffect(() => {
    // const url = 'http://kxp33.cnduomi.com/api/weixin/order/similar_order';
    request(similar_order, {id}).then(res => {
      setData(res)
      console.log('similar:', res)
    }).catch(e => {
      console.warn(e)
    })
  }, [id])


  return (!data?<Loading/>:
    <Wrapper className="page-similar" title="类似故障">
      {data.map(p => <SimilarItem key={p.id} {...p} />)}
    </Wrapper>
  )
}

function SimilarItem ({id, trouble_name, trouble_des, create_time, handle_time}) {

  const time = time => time?time.slice(0,10):"无"

  return (
    <div className="item-wrapper">
      <div className="upper">
        <div className="left">
          <h3>{trouble_name}</h3>
          <p>{trouble_des}</p>
        </div>
        <Link to={`/orderdetail/${id}`} className="button"><Button>详情</Button></Link>
        
      </div>
      <div className="lower">
        <span>报修时间：{time(create_time)}</span>
        <span>维修时间：{time(handle_time)}</span>
      </div>
    </div>
  )
}

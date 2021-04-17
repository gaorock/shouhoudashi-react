import React from 'react';
import request from '../utils/request';
import Inform from '../components/inform';
import {assign_order, reassign_order, worker_list} from '../data/urls';

import { Button, Dialog, Avatar, CircularProgress } from '@material-ui/core';
import { HighlightOff, PhoneIphone} from '@material-ui/icons';

export default function Assign ({close, order_id, reassign = false}) {
  // const [open, setOpen] = React.useState(true);
  const [inform, setInform] = React.useState(false);
  const [workers, setWorkers] = React.useState(null);
  const data = React.useRef({})

  // const assing_url = 'http://kxp33.cnduomi.com/api/weixin/order/zhipai_order';
  // const reassign_url = 'http://kxp33.cnduomi.com/api/weixin/order/assign_order';

  React.useEffect(() => {
    // const url = 'http://kxp33.cnduomi.com/api/weixin/order/repair_user_list';
    request(worker_list).then(res => {
      // console.log(res)
      setWorkers(res)
    }).catch(e => {
      console.warn(e)
    })
  }, [])


  const assigning = (worder_id) => {
    data.current = {id: order_id, repair_user_id: worder_id};
    setInform(true)
  }

  const onError = () => {
    setInform(false)
  }

  const url = reassign?'/orderlist/3':'/orderlist/2'

  return (
    <>
      <Dialog
        open={true}
        onClose={close}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        className="dialog-assign"
      >
        <div className="assign-to">
          <h2>指派订单</h2>
          {workers?<ul>
            {workers.map(w => <Worker key={w.id} assigning={() => assigning(w.id)} 
                                      name={w.name} orders={w.total_repair_num} phone={w.mobile} />)}
          </ul>:<div className="loading-wrapper"><CircularProgress/></div>}
        </div>
        <div className="close-btn" onClick={close}><HighlightOff className="close"/></div>
      </Dialog>
      {inform && <Inform informText="订单指派成功" buttonText="知道了" 
                          url={reassign?reassign_order:assign_order} data={data.current} 
                          onError={onError}
                          to={url}/>}
    </>
  )
}


function Worker ({assigning, name, orders, phone}) {
  return (
    <li>
      <div><Avatar/></div>
      <div className="info">
        <h3><label>{name}</label><span>订单数：{orders}</span></h3>
        <h4><PhoneIphone className="phone"/>{phone}</h4>
      </div>
      <div><Button className="assign" onClick={assigning}>指派</Button></div>
    </li>
  )
}
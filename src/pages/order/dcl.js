import React, { useState, useContext } from 'react';
import { AuthContext } from '../../context/LoginContext';
import request from '../../utils/request';
import Item from './item';
import {order_list} from '../../data/urls';
import { CircularProgress } from '@material-ui/core';

// 待处理

export default function Dcl () {
  const [{reload}] = useContext(AuthContext);
  const [loading, setLoading] = useState(false)
  const [list, setList] = useState([])

  React.useEffect(() => {
    setLoading(true)
    request(order_list, {type: "0"}).then(res => {
      // console.log('staff list:', res)
      setLoading(false)
      setList(res)
    }).catch(e => {
      setLoading(false)
      console.log(e)
    })
  }, [reload])


  return loading?
    <div className="empty"><CircularProgress color="inherit"/></div>:
    (list.length === 0?<div className="empty">无记录</div>:list.map(l => <Item status={l.status} key={l.id} {...l} />))
}
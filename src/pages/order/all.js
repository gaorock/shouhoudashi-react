import React, { useState, useContext } from 'react';
import request from '../../utils/request';
import { CircularProgress } from '@material-ui/core';
import { AuthContext } from '../../context/LoginContext';
import {order_list} from '../../data/urls';
import Item from './item';

// 全部

export default function All () {
  const [{reload}] = useContext(AuthContext);
  const [list, setList] = useState([])
  const [loading, setLoading] = useState(false)

  React.useEffect(() => {
    setLoading(true)
    request(order_list).then(res => {
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
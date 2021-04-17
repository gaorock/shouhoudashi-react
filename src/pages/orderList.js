import React from 'react';
import { useParams } from 'react-router-dom';
import Wrapper from '../components/wrapper';
import { Button } from '@material-ui/core';
import All from './order/all';
import Dcl from './order/dcl';
import Dzp from './order/dzp';
import Wxz from './order/wxz';
import Ywc from './order/ywc';


const menu = ['全部', '待处理', '待指派', '维修中', '已结束'];

export default function OrderList () {
  const {id} = useParams()
  const [menuindex, setMenuindex] = React.useState(Number(id));

  const Menu = ({data = []}) => data.map((item, index) => <Button key={index}
    className={index===0?"all":null}
    onClick={() => setMenuindex(index)}
  >
    <span className={index === menuindex?"active":null}>{item}</span>
  </Button>)

  
  

  return (
    <Wrapper className="page-orderlist" title="订单管理">

      <div className="header">
        <Menu data={menu}/>
      </div>

      <div className="list">
        <Type index={menuindex}/>
      </div>

    </Wrapper>
  )
}


function Type ({index})  {
  switch(index) {
    case 0:
      return <All/>
    case 1:
      return <Dcl/>
    case 2:
      return <Dzp/>
    case 3:
      return <Wxz/>
    case 4:
      return <Ywc/>
    default:
      return <All/>
  }
}
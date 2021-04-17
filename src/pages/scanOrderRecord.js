import React from 'react';
import Wrapper from '../components/wrapper';
import { useHistory } from "react-router-dom";

import { Button } from '@material-ui/core';
import { PlayArrow as PlayArrowIcon } from '@material-ui/icons';

export default function OrderWaitingDetail () {  
  
  const history = useHistory();

  return (
    <Wrapper className="page-orderlist-detail" title="维修记录">
      <div className="page-header">
        <h1>已完成</h1>
        <div>
          <h5>保养订单</h5>
          <p>下单日期：2021-03-01 11:41</p>
        </div>
      </div>

      <div className="page-body">
        <div className="sec-1">
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
        
        <Button onClick={() => history.push('/')}>返回</Button>
      </div>
      
    </Wrapper>
  )
}


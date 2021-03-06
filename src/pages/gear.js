import React from 'react';
import {Helmet} from "react-helmet";
// import cuid from 'cuid';
import {
  Link
} from "react-router-dom";

import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';
// import { Picker, WhiteSpace } from 'antd-mobile';

// const typeData = [
//   '电脑', '冰箱', '电器', '显示器', '饮水机',
//   '打印机', '桌椅', '电子设备', '门', '空调',
//   '水电', '汽车', '手机', 'LED', '电视',
// ]


export default function StaffAdd () {
  

  return (
    <section className="page-gear">
        <Helmet>
          <title>备件</title>
        </Helmet>
      <div className="page-content">
        <div className="gear-header">
          <h1>使用中的配件</h1>
          <Link className="addgear" to="/gear/add">
            <div className="icon"></div>
            <span>备件申请</span>
            <ArrowForwardIosIcon className="arrow"/>
          </Link>
        </div>
        <div className="gear-list">
          <div className="gear-item">
            <h3><b>投影仪</b><i>x7</i></h3>
            <h5>麦秸映像科技有限公司</h5>
            <p>备注：个部门开会需要使用到投影仪，暂时需要7台 个部门开会需要使用到投影仪，暂时需要7台</p>
          </div>
          <div className="gear-item">
            <h3><b>附件打印机</b><i>x7</i></h3>
            <h5>麦秸映像科技有限公司</h5>
            <p>备注：个部门开会需要使用到投影仪，暂时需要7台 个部门开会需要使用到投影仪，暂时需要7台</p>
          </div>
          <div className="gear-item">
            <h3><b>台式电脑</b><i>x7</i></h3>
            <h5>麦秸映像科技有限公司</h5>
            <p>备注：个部门开会需要使用到投影仪，暂时需要7台 个部门开会需要使用到投影仪，暂时需要7台</p>
          </div>
          <div className="gear-item">
            <h3><b>投影仪</b><i>x7</i></h3>
            <h5>麦秸映像科技有限公司</h5>
            <p>备注：个部门开会需要使用到投影仪，暂时需要7台 个部门开会需要使用到投影仪，暂时需要7台</p>
          </div>
          <div className="gear-item">
            <h3><b>附件打印机</b><i>x7</i></h3>
            <h5>麦秸映像科技有限公司</h5>
            <p>备注：个部门开会需要使用到投影仪，暂时需要7台 个部门开会需要使用到投影仪，暂时需要7台</p>
          </div>
          <div className="gear-item">
            <h3><b>台式电脑</b><i>x7</i></h3>
            <h5>麦秸映像科技有限公司</h5>
            <p>备注：个部门开会需要使用到投影仪，暂时需要7台 个部门开会需要使用到投影仪，暂时需要7台</p>
          </div>
        </div>
      </div>
    
    </section>
  )
}
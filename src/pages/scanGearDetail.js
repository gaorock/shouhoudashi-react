import React from 'react';
import Wrapper from '../components/wrapper';
import { Link, useParams } from 'react-router-dom';
// import { Button } from '@material-ui/core';
import { scan_equip_detail } from '../data/urls';
import Error from '../pages/error';
import request from '../utils/request';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';

export default function ScanGearDetail () {
  const { id } = useParams(); // get Gear id
  // const [value, setValue] = React.useState(0);
  const [data, setData] = React.useState({});
  const [error, setError] = React.useState(false);

  React.useEffect(() => {
    request(scan_equip_detail, {equip_id: id}).then(res => {
      console.log('scan_equip_detail', res)
      setData(res)
    }).catch(e => {
      console.log(e)
      setError('没有此设备')
    })
  }, [id])

  return (error?<Error msg={error}/>:
    <Wrapper className="page-gear-detail" title="设备详情">
      
      <div className="info-wrapper">
        <h3 className="info-title"><i></i><span>设备信息</span></h3>
        <div className="info-line">
          <div><h5>设备名称</h5><h3>{data.data? data.data.name:''}</h3></div>
          <div><h5>型号/编号</h5><h3>{data.data? data.data.equipment_code:''}</h3></div>
        </div>
        <div className="info-line">
          <div><h5>资产编号</h5><h3>{data.data? data.data.asset_num:''}</h3></div>
          <div><h5>所属科室</h5><h3>{data.data? data.data.depart_name:''}</h3></div>
        </div>
      </div>

      <div className="info-wrapper">
        <div className="tabs-wrapper">
          <div>硬件描述</div>
          {/* <div className={value===0?"active":null} onClick={() => setValue(0)}>硬件信息</div>
          <div className={value===1?"active":null} onClick={() => setValue(1)}>软件信息</div> */}
        </div>
        <div className="tab-wrapper">
          {data.data? data.data.param:''}
          {/* <li><label>处理器</label><div>第十一代英特尔酷睿i5-1135G7处理器</div></li>
          <li><label>内存</label><div>8GB/16GB DDR4内存</div></li>
          <li><label>硬盘</label><div>512GB M.2 PCle-NVMe 固态硬盘</div></li>
          <li><label>内存</label><div>核芯显卡 lntel lris Xe Graphics 共享系统内存</div></li>
          <li><label>屏幕</label><div>13.3英寸FHD IPS LED背光显示（1920 x 1080）</div></li>
          <li><label>网络通信</label><div>WiFi 6 2x2 802.11ax 蓝牙5.0</div></li> */}
        </div>
        {/* <Button className="change-btn"><span className="icon"></span><label>更改信息</label></Button> */}
      </div>
      
      <div className="info-wrapper row">
        <h3 className="info-title reocrd"><i></i><span>维修记录</span></h3>
        <div className="info-wrapper row">
          {(data.repair_log && data.repair_log.length>0) && data.repair_log.map(log => <Log key={log.id} {...log}/>)}
        </div>
      </div>
    </Wrapper>
  )
}

function Log ({repair_user_name, create_time, trouble_name, id}) {
  return (
    <Link to={`/orderdetail/${id}`} className="info-row">
      <div className="detail">
        <div><span>{trouble_name}</span><i>维修员：{repair_user_name}</i></div>
        <p>{create_time}</p>
      </div>
      <ArrowForwardIosIcon className="icon"/>
    </Link>
  )
}
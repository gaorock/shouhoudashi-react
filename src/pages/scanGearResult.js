import React, { useContext } from 'react';
import Wrapper from '../components/wrapper';
import { AuthContext, LOGOUT } from '../context/LoginContext';
import { sync_openid, scan_equip_detail } from '../data/urls';
import { getCookie } from '../utils/cookie';
import { Link, useHistory, useLocation, useParams } from "react-router-dom";
import { Button } from '@material-ui/core';
import parseSearch from '../utils/parseSearch';
import Error from '../pages/error';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';

import isLongNav from '../utils/isLongNav';
import request from '../utils/request';

export default function ScanGearResult () {
  const location = useLocation();
  const history = useHistory();
  const { id } = useParams(); // get Gear id
  const [{user}, dispatch] = useContext(AuthContext);
  const [longNav, setLongNav] = React.useState(true);
  const [error, setError] = React.useState(false);
  const [data, setData] = React.useState({});
  // // depend on Path
  const searchObj = parseSearch(location.search);
  // // get query
  // console.log("path:", location.pathname, "search:", searchObj)
  // get match path
  const matchPath = location.pathname.match(/scan\/gearresult/ig);
  console.log('match path:', matchPath)


  const logout = () => { // Hidden button, in case user need to switch role on mobile device
    dispatch({type: LOGOUT})
  }

  React.useEffect(() => {
    const token = localStorage.getItem('token') || getCookie('token');

    if (!searchObj.openid) return;
    if (user && !user.openid) sync(); // excute

    async function sync () {
      try {
        // synchronize openid with user_id
        const resobj = await fetch(sync_openid, {
          headers: {
            'XX-Device-Type': 'mobile',
            'XX-Token': token,
            'content-type': 'application/json',
          },
          method: 'POST',
          body: JSON.stringify({
            openid: searchObj.openid,
            user_nickname: searchObj.nickname,
            avatar: searchObj.headimgurl
          })
        });

        const jsonobj = await resobj.json();

        console.log(jsonobj)
        // setData(jsonobj)
      }catch(e) {
        // setData({error: 'true', detail: e})
      }
      
    }
  }, [searchObj, user])


  React.useEffect(() => {
    request(scan_equip_detail, {equip_id: id}).then(res => {
      console.log('scan_equip_detail', res)
      setData(res)
    }).catch(e => {
      console.log(e)
      setError('???????????????')
    })
  }, [id])

  React.useEffect(() => {
    setLongNav(isLongNav(history.length, window.innerHeight))
  }, [history.length])

  const detectWindowHeight = React.useCallback(() => {
    setLongNav(isLongNav(history.length, window.innerHeight))
  }, [history.length])


  React.useEffect(() => {
    window.addEventListener('resize', detectWindowHeight);

    return function () {
      window.removeEventListener('resize', detectWindowHeight);
    }
  }, [detectWindowHeight])


  return ((searchObj.msg || error)?<Error msg={searchObj.msg || error}/>:
    <Wrapper className={longNav?"page-gear-result long":"page-gear-result"} title="????????????">
      {/* {user && <div>{JSON.stringify(user)}</div>} */}
      <h3 className="info-title"><i></i><span onClick={logout}>????????????</span></h3>
      <div className="info-wrapper">
        <div className="info-line">
          <div><h5>????????????</h5><h3>{data.data? data.data.name:''}</h3></div>
          <div><h5>??????/??????</h5><h3>{data.data? data.data.equipment_code:''}</h3></div>
        </div>
        <div className="info-line">
          <div><h5>????????????</h5><h3>{data.data? data.data.asset_num:''}</h3></div>
          <div><h5>????????????</h5><h3>{data.data? data.data.depart_name:''}</h3></div>
        </div>
        <div className="info-line more">
          <p><Link to={`/scan/geardetail/${id}`}>????????????<ArrowForwardIosIcon className="icon"/></Link></p>
        </div>
      </div>
      <h3 className="info-title reocrd"><i></i><span>????????????</span></h3>
      <div className="info-wrapper row">
        {(data.repair_log && data.repair_log.length>0) && data.repair_log.map(log => <Log key={log.id} {...log}/>)}
      </div>

      {user && <div className={'bottom-btn-wrapper'}>
        {(user.cur_user_type === "repair_man" || user.can_apply_repair === 'yes') && <div className="bottom-btn">
          {(user.cur_user_type === "manager") && <Link to={`/scan/report/${id}`}><Button>????????????</Button></Link>}
          {user.cur_user_type === "repair_man" && <Link to={`/scan/ifix/${id}`}><Button>????????????</Button></Link>}
        </div>}
        {longNav && <div className="long"></div>}
      </div>}
    </Wrapper>
  )
}

function Log ({repair_user_name, create_time, trouble_name, id}) {
  return (
    <Link to={`/orderdetail/${id}`} className="info-row">
      <div className="detail">
        <div><span>{trouble_name}</span><i>????????????{repair_user_name}</i></div>
        <p>{create_time}</p>
      </div>
      <ArrowForwardIosIcon className="icon"/>
    </Link>
  )
}
import React, {useContext} from "react";
import {AuthContext, SET_USER, LOGOUT} from '../context/LoginContext'
import {Route, Redirect, useLocation} from "react-router-dom";
import parseSearch from '../utils/parseSearch';
import {getCookie} from '../utils/cookie';
import authentication from '../utils/authenticate';
import { sync_openid } from '../data/urls';

// import Loading from '../components/loading';

// import useAuth from '../hooks/useAuth';

export default function Protected ({ children, ...rest }) {
  const location = useLocation();
  const [{login}, dispatch] = useContext(AuthContext);
  // const [loading, setLoading] = useState(true);
  const searchObj = parseSearch(location.search);

  // const weixin = React.useRef(null)
  // console.log(decodeURI(window.location))
  const token = localStorage.getItem('token') || getCookie('token') || searchObj.token;

  React.useEffect(() => {
    auth();
    // else setLoading(false);
    async function auth () {
      const res = await authentication(token); // return user info Obj
      // setLoading(false);
      // console.log(res)
      // 1. with Token & openid
      if (res) {
        console.log('with openid')
        dispatch({type: SET_USER, user: res.user, order: res.order})
      } else {
        dispatch({type: LOGOUT})
      }
      
    }
  }, [dispatch, token])



  // synchronize user with openid
  React.useEffect(() => {
    if (searchObj.openid && token) sync(); // excute

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
  }, [searchObj, token])

  return (
    <Route
      {...rest}
      render={({ location }) =>
        login ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: "/login",
              state: { from: location }
            }}
          />
        )
      }
    />
  );
}




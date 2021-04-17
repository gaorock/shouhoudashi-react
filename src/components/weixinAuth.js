import React, {useContext, useState} from "react";
import {AuthContext, SET_USER, LOGIN, LOGOUT} from '../context/LoginContext'
import {Route, Redirect} from "react-router-dom";
import {getCookie} from '../utils/cookie';
import authentication from '../utils/authenticate';
import Loading from '../components/loading';
import { weixin_auth } from '../data/urls';

// import useAuth from '../hooks/useAuth';

export default function Protected ({ children, ...rest }) {
  const [{login}, dispatch] = useContext(AuthContext);
  const [loading, setLoading] = useState(true);
  

  React.useEffect(() => {
    const token = localStorage.getItem('token') || getCookie('token');

    async function auth() {
      try{
        const res = await authentication(token);
        if (res) {
          if (!login) dispatch({type: LOGIN, user: res.user})
          else dispatch({type: SET_USER, user: res.user})
        } else {
          dispatch({type: LOGOUT})
        }
        setLoading(false)
      }catch(e) {
        console.log(e)
      }
    }

    
  }, [dispatch, login])

  return (loading?<Loading/>:
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



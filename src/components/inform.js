import React, {useContext} from 'react';
import { useHistory } from "react-router-dom";
import { Button, Dialog } from '@material-ui/core';
import Loading from '../components/loading';
import request from '../utils/request';
import {AuthContext, RELOAD} from '../context/LoginContext';

export default function Inform ({
  icon = 0,
  to = '/',
  informText = '',
  buttonText = '返回',
  url,
  data = {},
  onSuccess,
  onError
}) {
  const [loading, setLoading] = React.useState(true);
  const [error, setError] =  React.useState(false);
  const [errorText, setErrorText] = React.useState(null);
  const history = useHistory();
  const [,dispatch] = useContext(AuthContext);
  const finish = React.useRef(false)
  

  React.useEffect(() => {
    if (!url) return console.warn('missing [url]');;
    if (finish.current) return;
    console.log('POST:', url);
    request(url, data).then(res => {
      finish.current = true;
      console.log('POST success', res)
      setLoading(false);
      setError(false);
      
    }).catch(msg => {
      console.log('POST error', msg)

      setErrorText(typeof msg === 'string'?msg:'请求错误');
      setLoading(false);
      setError(true);
    })
  }, [url, data])

  const redirect = () => {
    if (error) {
      if (onError) onError()

    } else {
      // console.log('history', history.location)
      // console.log('replacing:', to)
      if (onSuccess) onSuccess();
      
      if (history.location.pathname !== to) {
        if (to !== null) history.replace(to);
      } else {
        dispatch({type: RELOAD})
      }
    }
  }

  return (
    <>
      <Dialog
        open={!loading}
        onClose={redirect}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        className="dialog-inform"
      >
        <div className="inform">
          {!error && <div className={icon?"logo-task":"logo"}></div>}
          <span>{error?errorText:informText}</span>
          {buttonText !== null && <Button onClick={redirect}>{buttonText}</Button>}
        </div>
      </Dialog>

      <Loading open={loading}/>
    </>
  )
}

import React, {useState} from 'react';
// import Loading from '../components/loading';
import {upload_image, upload_video} from '../data/urls';
import { Button, Dialog, CircularProgress } from '@material-ui/core';


export default function Upload ({
  className,
  id = "default",
  accept= "image/gif, image/jpeg, image/png",
  children,
  video,
  onSuccess,
  onError
}) {
  const [errorText, setErrorText] = useState(false);
  const [uploading, setUploading] = useState(false);

  const image_url = upload_image;
  const video_url = upload_video;

  const onChange = e => {
    const file = e.target.files[0];

    if (!file) return;
    setUploading(true)
    const formData = new FormData();
    formData.append('file', file);
    console.log(file)
    
    upload()

    async function upload () {
      console.log(formData)
      try {
        const res = await fetch(video?video_url:image_url, {
          method: 'POST',
          body: formData
        });
    
        const json = await res.json();
        if (json.code === 1) {
          if (onSuccess) onSuccess(json.data);
          console.log('upload ok:', json);
        } else {
          setErrorText(JSON.stringify(json))
          console.log('upload error:', json);
        }
        
      }catch(e) {
        if (onError) onError(e)
        setErrorText('系统错误')
        console.log('upload error:', e);
      }
      setUploading(false)
      
    }
    
  }


  return (
    <div className="upload-wrapper">
      <input type="file" id={id} accept={accept} onChange={onChange} disabled={uploading}/>
      <label className={className} htmlFor={id}>
        {uploading?<CircularProgress color="inherit" />:children}
      </label>
      <DialogBlock open={Boolean(errorText)} close={() => setErrorText(null)} text={errorText} />
    </div>
  )
}


function DialogBlock ({open, text, close}) {

  return (
    <Dialog
      open={open}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
      className="dialog-inform"
    >
      <div className="inform">
        <span>{text || ''}</span>
        <Button onClick={close}>返回</Button>
      </div>
    </Dialog>
  )
}
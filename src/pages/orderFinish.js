import React from 'react';
import Wrapper from '../components/wrapper';
import { Button } from '@material-ui/core';
import List from 'antd-mobile/lib/list';
import Picker from 'antd-mobile/lib/picker';
import Upload from '../components/upload';
import Inform from '../components/inform';
import cuid from 'cuid';


export default function OrderFinish () {
  const [value, setValue] = React.useState(null);
  const [memo, setMemo] = React.useState('')
  const [uploadedImage, setUploadedImage] = React.useState([])
  const [uploadedVideo, setUploadedVideo] = React.useState(null)
  const MEMO_MAX = 50;

  const onImageSuccess = (data) => {
    data.id = cuid()
    setUploadedImage([data, ...uploadedImage]) // preview_url
  }

  const onDeleteImage = (id) => {
    setUploadedImage(uploadedImage.filter(p => p.id !== id))
  }

  const onVideoSuccess = (data) => {
    setUploadedVideo(data)
  }

  const onMemoChange = e => {
    const text = e.target.value;
    if (text.length > MEMO_MAX) return;
    setMemo(text)
  }
    
  const [openInform, setOpenInform] = React.useState(false);
  
  const finish = () => {
    setOpenInform(true)
  }

  const closeInform = () => {
    setOpenInform(false)
  }

  return (
    <Wrapper className="page-order-finish" title="维修内容">

      <div className="finish-input">
        <div className="input-wrapper">
          <label>维修类型</label>
          <div className="data-wrapper">
            <Picker
              title="硬件维修"
              extra="点击选择"
              value={value}
              cols={1}
              data={[
                {label: '1', value: '1'},
                {label: '2', value: '2'},
                {label: '3', value: '3'},
              ]}
              onChange={v => setValue(v)}
            >
              <List.Item arrow="horizontal" className="input-data"></List.Item>
            </Picker>
          </div>
          
        </div>
      </div>
      <div className="order-memo">
        <div className="memo-input">
          <h3>文字描述</h3>
          <div className="textarea">
              <textarea 
                rows="5" 
                placeholder="请描述您本次的维修内容~" 
                value={memo}
                onChange={onMemoChange}
              ></textarea>
              <div className="wordcount">{memo.length || '0'}/{MEMO_MAX}</div>
          </div>
          <h3>图片描述</h3>
          <div className="uploaded-imgae-list">
            {uploadedImage.length < 3 && <Upload id="photo" className="upload-content" onSuccess={onImageSuccess}>
                <div className="icon-photo"></div>
                <span>上传图片</span>
            </Upload>}
            {uploadedImage.map(p => 
              <div 
                key={p.id} 
                className="upload-content thumbnail"
                style={{backgroundImage: `url(${p.preview_url})`}}
              ><div className="delete" onClick={() => onDeleteImage(p.id)}>删除</div></div>)}

          </div>
          
          <h3>视频描述</h3>
          <div className="uploaded-imgae-list">
            {!uploadedVideo && <Upload id="video" className="upload-content" accept="video/*" video={true} onSuccess={onVideoSuccess}>
              <div className="icon-video"></div>
              <span>上传视频</span>
            </Upload>}
            {uploadedVideo && <div className="upload-content thumbnail video">
              <video src={uploadedVideo.preview_url} preload="false"></video>
              <div className="delete" onClick={() => setUploadedVideo(null)}>删除</div>
            </div>}
          </div>
          
        </div>

        <Button className="confirm" onClick={finish}>提交</Button>
      </div>

       {openInform && <Inform close={closeInform} informText="维修已结束" icon={1}/>}
    </Wrapper>
  )
}
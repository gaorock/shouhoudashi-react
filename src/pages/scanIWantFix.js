import React from 'react';
import Wrapper from '../components/wrapper';
import { Button, InputBase as Input } from '@material-ui/core';
import List from 'antd-mobile/lib/list';
import Picker from 'antd-mobile/lib/picker';
import Upload from '../components/upload';
import Inform from '../components/inform';
import { submit_repair } from '../data/urls';
import cuid from 'cuid';


export default function ScanFixEntry () {
  const [value, setValue] = React.useState([2]);
  const [title, setTitle] = React.useState('');
  const [memo, setMemo] = React.useState('');
  const [uploadedImage, setUploadedImage] = React.useState([])
  const [uploadedVideo, setUploadedVideo] = React.useState(null)
  const MEMO_MAX = 50;
  // const url = submit_repair; // go to /scan/gearresult/[123]

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
    <Wrapper className="page-scan-ifix" title="我要维修">

      <div className="form-input">
        <div className="input-wrapper"><label>维修名称</label><Input value={title} onChange={e => setTitle(e.target.value)} placeholder="请输入报修名称" className="input"/></div>
        <div className="input-wrapper">
          <label>维修类型</label>
          <div className="data-wrapper">
            <Picker
              title="维修类型"
              extra="点击选择"
              value={value}
              cols={1}
              data={[
                {label: '保养订单', value: 1},
                {label: '维修订单', value: 2},
                {label: '新购订单', value: 3},
              ]}
              onChange={v => setValue(v)}
            >
              <List.Item arrow="horizontal" className="input-data"></List.Item>
            </Picker>
          </div>
        </div>
      </div>

      <div className="memo">
        <div className="memo-input">
          <h3>维修描述</h3>
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

       
      </div>

      <Button className="confirm" onClick={finish}>提交</Button>
      {openInform && <Inform close={closeInform} 
                          informText="报修已提交" icon={1} 
                          onError={() => setOpenInform(false)}
                          url={submit_repair}
                          to={null}
                          data={{
                            equipment_id: 2,          // 设备id，先写死，后面从二维码扫描地址获取
                            type: (value[0]-1),       // 维修类型
                            trouble_name: title,      // 维修标题
                            trouble_des: memo,        // 问题描述
                            trouble_pic: uploadedImage.map(i => i.url).join(),  // 问题照片 xx1,xx2,xx3 [url]
                            trouble_video: uploadedVideo?uploadedVideo.url:'',             // 问题视频 url
                          }}
                      />}
    </Wrapper>
  )
}

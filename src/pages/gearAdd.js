import React from 'react';
import Wrapper from '../components/wrapper';
import { Button, InputBase as Input } from '@material-ui/core';
// 
import List from 'antd-mobile/lib/list';
import Picker from 'antd-mobile/lib/picker';


export default function StaffAdd () {
  const [value, setValue] = React.useState(null);
  const [memo, setMemo] = React.useState('')
  const MEMO_MAX = 50;


  const onMemoChange = e => {
    const text = e.target.value;
    if (text.length > MEMO_MAX) return;
    setMemo(text)
  }

  return (
    <Wrapper className="page-gear-add" title="备件申请">

      <div className="gear-input">
        <div className="input-wrapper">
          <label>选择备件</label>
          <div className="data-wrapper">
            <Picker
              title="选择备件"
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
        <div className="input-wrapper"><label>数量</label><Input placeholder="请输入数量" className="input" type="number"/></div>
        <div className="input-wrapper"><label>使用单位</label><Input placeholder="请输入公司名称" className="input"/></div>
      </div>
      <div className="gear-memo">
        <div className="memo-input">
          <h3>备注</h3>
          <div className="textarea">
              <textarea 
                rows="5" 
                placeholder="请输入您的备注留言～" 
                value={memo}
                onChange={onMemoChange}
              ></textarea>
              <div className="wordcount">{memo.length || '0'}/{MEMO_MAX}</div>
          </div>
        </div>
        <Button className="confirm">提交</Button>
      </div>
    </Wrapper>
  )
}
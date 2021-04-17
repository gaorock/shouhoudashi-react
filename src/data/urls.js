
const HOST = "http://kxp33.cnduomi.com";


const urls = {
  upload_image: '/api/merchant_user/upload/one',// 上传图片
  upload_video: '/api/merchant_user/upload/video',//上传视频

  login_post: '/api/weixin/public/login',// 用户登陆
  get_user_info: '/api/weixin/public/get_user_info',// 获取用户信息
  get_user_detail: '/api/weixin/user/detail',// 维修人员详情
  user_list: '/api/weixin/user/user_list',// 人员列表
  worker_list: '/api/weixin/order/repair_user_list',// 维修员列表

  order_list: '/api/weixin/order/order_list',// 获取订单列表数据
  order_detail: '/api/weixin/order/order_detail',// 订单详情
  assign_order: '/api/weixin/order/zhipai_order',// 指派订单
  finish_order: '/api/weixin/order/complete_order',// 完成订单（维修结束）
  reassign_order: '/api/weixin/order/assign_order',// 订单转单
  accept_order: '/api/weixin/order/accept_order',// 立即接单

  similar_order: '/api/weixin/order/similar_order',// 类似故障订单

  add_user: '/api/weixin/user/add_user', // 添加人员
  edit_user: '/api/weixin/user/edit_user',// 编辑人员
  del_user: '/api/weixin/user/delete',// 删除人员

  scan_add_user: '/api/weixin/new_user/add_user',// 扫码添加维修人员  

  scan_equip_detail: '/api/weixin/equip/equip_detail',// 扫码设备详情页 http://kxp33.cnduomi.com/api/weixin/equip/equip_detail

  submit_repair: '/api/weixin/equip/add_repair_order',// 提交报修（维修员报修）
  submit_admin: '/api/government/gov_order/add_post',// 我要报修（管理员报修）

  repair_type: '/api/weixin/user/get_equip_cate',// 维修类型

  sync_openid: '/api/weixin/public/update_user',// 更新用户微信授权
  // weixin authentication
  // weixin_auth: '/portal/index/get_user_info' // code => openid -> token
  
  
}

function merge (url) {
  const adds = {}
  for(let u in url) {
    adds[u] = HOST + url[u]
  }
  return adds
}

module.exports = merge(urls)
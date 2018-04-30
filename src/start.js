import update_pos from './update_pos'
export default function(){
  // ws
  this.wsServer = new WebSocket(this.ws_url);
  this.wsServer.onopen = function (e) {
    (typeof e == 'string') && this.send(e);//向后台发送数据
  };
  this.wsServer.onclose = function (e) {//当链接关闭的时候触发

  };
  this.wsServer.onmessage = function (e) {//后台返回消息的时候触发
    // console.log('get_sync_info')
    // console.log(data)
    var sync_info = JSON.parse(e.data).sync_info
    var pos_arr = sync_info.pos
    var pos = SGWorld.Creator.CreatePosition(pos_arr[0], pos_arr[1], pos_arr[2], pos_arr[3], pos_arr[4], pos_arr[5]);
    SGWorld.Navigate.SetPosition(pos);
  };
  this.wsServer.onerror = function (e) {//错误情况触发

  }

  // 定时更新位置
  this.last_pos = {};
  this.sync_interval = setInterval(update_pos.bind(this), this.interval)
}
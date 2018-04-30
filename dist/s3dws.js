(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
	typeof define === 'function' && define.amd ? define(['exports'], factory) :
	(factory((global.s3dws = {})));
}(this, (function (exports) { 'use strict';

var config = {
  // fly存放位置
  fly_path: '',
  // Skyline的SGWorld
  SGWorld: window.SGWorld,
  // WebSocket连接的url
  ws_url: 'ws://127.0.0.1:18848',
  // 同步的时间间隔（ms为单位）
  interval: 500,
  // 位置有多大改变才触发同步
  pos_trigger_size: {
    X: 1,
    Y: 1,
    Altitude: 1,
    Yaw: 1,
    Pitch: 0.01,
  }
}

function init(options){
  // 配置
  var options = $.extend({}, config, options);
  var opt = '';
  for(opt in options){
    this[opt] = options[opt];
  }
  SGWorld.Open(this.fly_path);
  // 开始
  this.start();
  return this
}

function update_pos(){
  var pos = SGWorld.Navigate.GetPosition();
  var mi = SGWorld.Window.GetMouseInfo();
  // 检查鼠标是否在窗口里
  if (mi.x < 0 || mi.y < 0) return
  // 检查位置
  if (pos.X - this.last_pos.X > this.pos_trigger_size.X || 
    pos.Y - this.last_pos.Y > this.pos_trigger_size.Y || 
    pos.Altitude - this.last_pos.Altitude > this.pos_trigger_size.Altitude || 
    pos.Yaw - this.last_pos.Yaw > this.pos_trigger_size.Yaw ||
    pos.Pitch - this.last_pos.Pitch > this.pos_trigger_size.Pitch 
    ) {
    // console.log('set_sync_info')
    // console.log([pos.X, pos.Y, pos.Altitude, 0, pos.Yaw, pos.Pitch])
    this.wsServer.onopen(JSON.stringify({
      sync_info: {
        pos: [pos.X, pos.Y, pos.Altitude, 0, pos.Yaw, pos.Pitch],
      }
    }));
  }
  this.last_pos = pos;
}

function start(){
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
    var sync_info = JSON.parse(e.data).sync_info;
    var pos_arr = sync_info.pos;
    var pos = SGWorld.Creator.CreatePosition(pos_arr[0], pos_arr[1], pos_arr[2], pos_arr[3], pos_arr[4], pos_arr[5]);
    SGWorld.Navigate.SetPosition(pos);
  };
  this.wsServer.onerror = function (e) {//错误情况触发

  };

  // 定时更新位置
  this.last_pos = {};
  this.sync_interval = setInterval(update_pos.bind(this), this.interval);
}

function stop(){
  console.log(this.wsServer, this.sync_interval);
  this.wsServer.close();
  clearInterval(this.sync_interval);
}

exports.init = init;
exports.start = start;
exports.stop = stop;

Object.defineProperty(exports, '__esModule', { value: true });

})));

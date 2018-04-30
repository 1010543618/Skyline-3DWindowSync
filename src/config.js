export default {
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
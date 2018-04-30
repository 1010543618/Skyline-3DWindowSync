export default function(){
  var pos = SGWorld.Navigate.GetPosition()
  var mi = SGWorld.Window.GetMouseInfo()
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
    }))
  }
  this.last_pos = pos;
}
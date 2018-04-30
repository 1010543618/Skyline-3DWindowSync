export default function(){
  console.log(this.wsServer, this.sync_interval)
  this.wsServer.close()
  clearInterval(this.sync_interval)
}
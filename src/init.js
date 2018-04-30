import config from './config'
export default function(options){
  // 配置
  var options = $.extend({}, config, options);
  var opt = ''
  for(opt in options){
    this[opt] = options[opt]
  }
  SGWorld.Open(this.fly_path)
  // 开始
  this.start()
  return this
}
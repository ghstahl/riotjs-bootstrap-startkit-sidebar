class RiotRouteExtension{
  constructor(){
    var self = this;
    self.name = 'RiotRouteExtension';
    self.namespace = self.name+':';
    self.currentPath = '';
    self._bind();
  }
  
  _bind(){
    var self = this;
    riot.route.parser((path)=>{
      self.currentPath = path;
      return path.split(/[/?#]/)
    },null);

    riot.route.currentPath = ()=>{
      return self.currentPath;
    };
  }
}
export default RiotRouteExtension;
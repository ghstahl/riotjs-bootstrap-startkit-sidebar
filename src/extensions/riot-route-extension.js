class RiotRouteExtension{
  constructor(){
    var self = this;
    self.name = 'RiotRouteExtension';
    self.namespace = self.name+':';
    self.currentPath = '';
    riot.route.parser(self.DEFAULT_PARSER,null);
    riot.route.currentPath = self.getCurrentPath;
  }
 
  DEFAULT_PARSER(path) {
    self.currentPath = path;
    return path.split(/[/?#]/)
  }
  getCurrentPath() {
    return self.currentPath;
  }
}
export default RiotRouteExtension;
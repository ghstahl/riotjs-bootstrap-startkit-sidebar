class SidebarStore{

  constructor(){
    var self = this;
    riot.observable(self);
    self.itemsSet = new Set();
    self.bindEvents();
    self.state = riot.state.sidebar;
    self._loadFromState();
  }

  _commitToState(){
    var self = this;
    self.state.items = Array.from(self.itemsSet);
    self.trigger('riot-route-dispatch-ack');
  }

  _loadFromState(){
    var self = this;
    for(let item of self.state.items){
      self.itemsSet.add(item);
    }
  }

  _findItem(item){
    var self = this;
    for(let t of self.state.items){
      if(t.title === item.title && t.view === item.view){
        return t;
      }
      return null;
    }
  }

  _deleteItem(item){
    var self = this;
    for(let t of self.state.items){
      if(t.title === item.title){
        self.itemsSet.delete(t);
        break;
      }
    }
  }

  _onSidebarAddItem(item){
    var self = this;
    var t = self._findItem(item);
    if(t == null){
      self.itemsSet.add(item);
    }
    self._commitToState();
  }

  _onSidebarRemoveItem(item){
     var self = this;
     self._deleteItem(item);
     self._commitToState();
  }

  bindEvents(){
    var self = this;
    self.on('sidebar-add-item',     self._onSidebarAddItem);
    self.on('sidebar-remove-item',  self._onSidebarRemoveItem);
  }

}
export default SidebarStore;

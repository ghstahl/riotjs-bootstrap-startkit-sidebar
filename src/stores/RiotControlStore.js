
class RiotControlStore{

  constructor(){
    riot.observable(this);
    this.bindEvents();
    this._stores = {};

  }

  bindEvents(){
    this.on('riot-contol-add-store', (name,store) => {
      var tempStore = riot.control._stores;
      this._stores[name] = store;
      console.log('riot-contol-add-store',store)
      riot.control.addStore(store)
    });

    this.on('riot-contol-remove-store', (name) => {
      console.log('riot-contol-remove-store',name)
      var store = this._stores[name];
      while (riot.control._stores.indexOf(store) !== -1) {
        riot.control._stores.splice(riot.control._stores.indexOf(store), 1);
      }
    });
  }
}
export default RiotControlStore;
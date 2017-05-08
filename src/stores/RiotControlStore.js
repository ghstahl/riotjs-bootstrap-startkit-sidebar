
class RiotControlStore{

  constructor(){
    riot.observable(this);
    this.bindEvents();
  }

  bindEvents(){
    this.on('riot-contol-add-store', (store) => {
      console.log('riot-contol-add-store',store)
      riot.control.addStore(store)
    });
  }
}
export default RiotControlStore;

/*
var registerRecord = {
  name:'riotjs-partial-spa',
  views:[
    {view:'my-component-page'},
    {view:'typicode-user-detail'}
  ],
  stores:[
    {store: new TypicodeUserStore()}
  ],
  postLoadEvents:[
    {event:'typicode-init',data:{}}
  ],
  preUnloadEvents:[
    {event:'typicode-uninit',data:{}}
  ]
};
riot.control.trigger('plugin-registration',registerRecord);

*/
class PluginRegistrationStore{

  constructor(){
    riot.observable(this);
    this.items = [];
    this.bindEvents();
    this._registeredPlugins = new Set();
  }
  bindEvents(){
    this.on('plugin-registration', this._registerPlugin);
    this.on('plugin-unregistration', this._unregisterPlugin);
  }

  _findRegistration(registrationName){
    var mySet = this._registeredPlugins;
    for (let item of mySet) {
        if(item.name === registrationName)
          return item;
    }
    return null;
  }
  _removeRegistration(registrationName){
    var mySet = this._registeredPlugins;
    for (let item of mySet) {
        if(item.name === registrationName){
          mySet.delete(item);
          break;
        }
    }
    return null;
  }
  _unregisterPlugin(registration){
    var foundRegistration = this._findRegistration(registration.name);
    if(foundRegistration === null){
      this.trigger('plugin-unregistration-ack', 
        {
          state:false,
          registration:registration,
          error:'plugin already registered!'
        });
    }else{
      // reverse unload
      // 1. PreUnload Events first
      for(var i=0; i<foundRegistration.preUnloadEvents.length; i++) {
        riot.control.trigger(foundRegistration.preUnloadEvents[i].event,foundRegistration.preUnloadEvents[i].data);
      }
      // 2. Remove the stores.
      for(var i=0; i<foundRegistration.stores.length; i++) {
        riot.control.trigger('riot-contol-remove-store',foundRegistration.stores[i].name);
      }
      // 3. Remove the views.
      for(var i=0; i<foundRegistration.views.length; i++) {
        riot.control.trigger('riot-route-remove-view',foundRegistration.views[i].view);
      }
      this._removeRegistration(registration.name);
      this.trigger('plugin-unregistration-ack', 
        {
          state:true,
          registration:registration
        });
    }
  }

  _registerPlugin(registration){
    var foundRegistration = this._findRegistration(registration.name);
   
    if(foundRegistration === null){
      this._registeredPlugins.add(registration);
      // 1. Add the views
      for(var i=0; i<registration.views.length; i++) {
        riot.control.trigger('riot-route-add-view',registration.views[i].view);
      }
      // 2. Add the stores
      for(var i=0; i<registration.stores.length; i++) {
        registration.stores[i].name = registration.name + '-store-' + i; // need this for my own tracking
        riot.control.trigger('riot-contol-add-store',registration.stores[i].name,registration.stores[i].store);
      }
      // 3. fire post load events
      for(var i=0; i<registration.postLoadEvents.length; i++) {
        riot.control.trigger(registration.postLoadEvents[i].event,registration.postLoadEvents[i].data);
      }
      this.trigger('plugin-registration-ack', {state:true,registration:registration});
    }else{
      this.trigger('plugin-registration-ack', {state:false,registration:registration,error:'plugin already registered!'});
    }
  }
}
export default PluginRegistrationStore;
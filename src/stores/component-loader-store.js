/*

var testComponent = {
        key:'typicode-component',
        path:'/partial/bundle.js',
        type:'js',
        trigger:{
          onLoad:[{
              event:'sidebar-add-item',
              data:{
                title : 'My Components Page', 
                view : 'my-component-page' 
              }
            }
          ],
          onUnload:[{
              event:'sidebar-remove-item',
              data:{
                title : 'My Components Page'
              }
            }
          ]
        },
        state:{loaded:false}
      };

riot.control.trigger('init-component-loader-store');
riot.control.trigger('add-dynamic-component',testComponent);

*/


class ComponentLoaderStore{

  constructor(){
    var self = this;
    self.name = 'ComponentLoaderStore';
    self.wellKnownEvents = {
        localStorageResult:'dynamicjscss-localstorage-result',
        initComponent:'init-component-loader-store',
        loadDymanicComponent:'load-dynamic-component',
        unloadDymanicComponent:'unload-dynamic-component',
        addDynamicComponent:'add-dynamic-component',
        loadExternalJsCssAck:'load-external-jscss-ack',
        unloadExternalJsCssAck:'unload-external-jscss-ack',
        unloadExternalJsCss:'unload-external-jscss',
        loadExternalJsCss:'load-external-jscss',
        pluginUnregistration:'plugin-unregistration'
    }
    self._components = new Set();
    riot.state.componentLoaderState = {}
    self.state = riot.state.componentLoaderState;
    riot.observable(self);
    self.bindEvents();
   
  }

  _onInitComponentLoaderStore(){
    var self = this;
    console.log(self.name,self.wellKnownEvents.initComponent)
    
    riot.control.trigger(
      'localstorage_get',
      {
        key:'component-loader-store',
        trigger:{event:self.wellKnownEvents.localStorageResult,riotControl:true}
      });
  }

  _commitToState(){
    var self = this;
    var componentsArray = Array.from(self._components); 
    self.state.components = new Map(componentsArray.map((i) => [i.key, i]));
    self._commitToLocalStorage();
  }
  _commitToLocalStorage(){
    var self = this;
    var mySet = self._components;
    var record = {
      components:Array.from(mySet)
    };
    riot.control.trigger('localstorage_set',{
            key:'component-loader-store',
            data:record
        });
    
  }
  _addComponent(component){
    var self = this;
    if(self._findComponent(component.key) == null){
      self._components.add(component);
      self._commitToState();
    }  
  }
  _findComponent(key){
    var self = this;
    for(let item of self._components){
      if(item.key === key){
        return item;
      }
    }
    return null;
  }
  _onLoadExternalJsCssAck(result){
    var self = this;
    console.log(self.name,self.wellKnownEvents.loadExternalJsCssAck,result)

    var component = self._findComponent(result.component.key);
    if(component != null){
      // this is ours
      if(result.state === true){
        for(let triggerItem of component.trigger.onLoad){
          riot.control.trigger( triggerItem.event,triggerItem.data);
        }
        component.state.loaded = true;
        self._commitToLocalStorage();
      }else{
        console.error(result.error);
      }
    }
  }

  _onUnloadExternalJsCssAck(result){
    var self = this;
    console.log(self.name,self.wellKnownEvents.unloadExternalJsCssAck,result)
    var component = self._findComponent(result.component.key);
    if(component != null){
      // this is ours
      if(result.state === true){
        for(let triggerItem of component.trigger.onUnload){
          riot.control.trigger( triggerItem.event,triggerItem.data);
        }
         component.state.loaded = false;
        self._commitToLocalStorage();
      }else{
        console.error(result.error);
      }
    }
  }
  _onAddDynamicComponent(component){
    var self = this;
    console.log(self.name,self.wellKnownEvents.addDynamicComponent,component)
    var comp = self._findComponent(component.key);
    if(comp == null){
      self._addComponent(component);
    }
  }
  
  _onLoadDynamicComponent(key){
    var self = this;
    console.log(self.name,self.wellKnownEvents.loadDymanicComponent,key)
    var component = self._findComponent(key);
    if(component != null && component.state.loaded != true){
      riot.control.trigger(self.wellKnownEvents.loadExternalJsCss,component);
    }
  }
  _onUnloadDymanicComponent(key){
    var self = this;
    console.log(self.name,self.wellKnownEvents.unloadDymanicComponent,key)
    var component = self._findComponent(key);
    if(component != null && component.state.loaded == true){
      riot.control.trigger(self.wellKnownEvents.unloadExternalJsCss,component);     
    }
  }

  _onLocalStorageResult(result){
    var self = this;
    console.log(self.name,self.wellKnownEvents.localStorageResult,result)
   
  }

  bindEvents(){
    var self = this;
    self.on(self.wellKnownEvents.initComponent,           self._onInitComponentLoaderStore);
    self.on(self.wellKnownEvents.loadDymanicComponent,    self._onLoadDynamicComponent);
    self.on(self.wellKnownEvents.unloadDymanicComponent,  self._onUnloadDymanicComponent);
    self.on(self.wellKnownEvents.addDynamicComponent,     self._onAddDynamicComponent);
    self.on(self.wellKnownEvents.loadExternalJsCssAck,    self._onLoadExternalJsCssAck);
    self.on(self.wellKnownEvents.unloadExternalJsCssAck,  self._onUnloadExternalJsCssAck);
    self.on(self.wellKnownEvents.localStorageResult,      self._onLocalStorageResult);
  }
}
export default ComponentLoaderStore;
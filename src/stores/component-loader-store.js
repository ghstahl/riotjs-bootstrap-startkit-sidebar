class ComponentLoaderStore{

  constructor(){
    var self = this;
    riot.state.componentLoaderState = {}
    self.state = riot.state.componentLoaderState;
    riot.observable(self);
    self.bindEvents();
  }
  _onInitComponentLoaderStore(){
    console.log('ComponentLoaderStore','init-component-loader-store')
    var self = this;
    self._intializeComponentData();
    self._commitToState();
  }
  _intializeComponentData(){
    var self = this;
    self._components = new Set();
    self._components.add({
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
    console.log('ComponentLoaderStore','load-external-jscss-ack',result)

    var component = self._findComponent(result.component.key);
    if(component != null){
      // this is ours
      if(result.state === true){
        for(let triggerItem of component.trigger.onLoad){
          riot.control.trigger( triggerItem.event,triggerItem.data);
        }
        var compState = self.state.components.get(component.key);
        compState.state = {loaded:true};
        console.log(result);
      }else{
        console.error(result.error);
      }
    }

  }

  _onUnloadExternalJsCssAck(result){
    var self = this;
    console.log('ComponentLoaderStore','unload-external-jscss-ack',result)
    var component = self._findComponent(result.component.key);
    if(component != null){
      // this is ours
      if(result.state === true){
        for(let triggerItem of component.trigger.onUnload){
          riot.control.trigger( triggerItem.event,triggerItem.data);
        }
        var compState = self.state.components.get(component.key);
        compState.state = {loaded:false};
      }else{
        console.error(result.error);
      }
    }
  }
  _onAddDynamicComponent(component){
    var self = this;
    console.log('ComponentLoaderStore','add-dynamic-component',component)
    var comp = self._findComponent(component.key);
    if(comp == null){
      self._addComponent(component);
      riot.control.trigger('load-external-jscss',component);
    }
  }
  
  _onLoadDynamicComponent(key){
    var self = this;
    console.log('ComponentLoaderStore','load-dynamic-component',key)
    var component = self._findComponent(key);
    if(component != null && component.state.loaded != true){
      riot.control.trigger('load-external-jscss',component);
    }
  }

  bindEvents(){
    var self = this;
    self.on('init-component-loader-store', self._onInitComponentLoaderStore);
    self.on('load-dynamic-component', self._onLoadDynamicComponent);
    self.on('add-dynamic-component', self._onAddDynamicComponent);
    self.on('load-external-jscss-ack', self._onLoadExternalJsCssAck);
    self.on('unload-external-jscss-ack', self._onUnloadExternalJsCssAck);
  }
}
export default ComponentLoaderStore;
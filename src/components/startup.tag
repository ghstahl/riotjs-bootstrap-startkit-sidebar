<startup>
<script>
	var self = this;
	self.state = {};

  self._components = new Set();
  self._components
  self.on('before-mount', () => {
    if(riot.state.startup === undefined){
      riot.state.startup = [];
    }
    self.state = riot.state.startup;

    self._components.add({
        key:'typicode-component',
        trigger:{
          onLoad:{
            event:'sidebar-add-item',
            data:{
              title : 'My Components Page', 
              view : 'my-component-page' 
            }
          },
          onUnload:{
            event:'sidebar-remove-item',
            data:{
              title : 'My Components Page'
            }
          }
          
        },
        state:{loaded:false}
      });
      var componentsArray = Array.from(self._components); 
      self.state.components = new Map(componentsArray.map((i) => [i.key, i]));
    });

  self._findComponent = (key) =>{
    for(let item of self._components){
      if(item.key === key){
        return item;
      }
    }
    return null;
  }
  self.on('mount', () => {
      console.log('startup mount');
      riot.control.on('load-external-jscss-ack',self.onLoadExternalJSCssAck);
      riot.control.on('unload-external-jscss-ack',self.onUnloadExternalJSCssAck);
    });
  
  self.on('unmount', () => {
      console.log('startup unmount')
      riot.control.off('load-external-jscss-ack',self.onLoadExternalJSCssAck);
      riot.control.off('unload-external-jscss-ack',self.onUnloadExternalJSCssAck);
    });
  
  self.onLoadExternalJSCssAck = (result) => {
   
    var component = self._findComponent(result.component.key);
    if(component != null){
      // this is ours
      if(result.state === true){
        riot.control.trigger( 
                'riot-dispatch',
                component.trigger.onLoad.event,
                component.trigger.onLoad.data);
        var compState = self.state.components.get(component.key);
        compState.state = {loaded:true};
        console.log(result);
      }else{
        console.error(result.error);
      }
    }
  }
  self.onUnloadExternalJSCssAck = (result) => {
    var component = self._findComponent(result.component.key);
    if(component != null){
      // this is ours
      if(result.state === true){
        riot.control.trigger( 
                  'riot-dispatch',
                  component.trigger.onUnload.event,
                  component.trigger.onUnload.data);
       
        var compState = self.state.components.get(component.key);
        compState.state = {loaded:false};
      }else{
        console.error(result.error);
      }
    }
  }
    
</script>
</startup>
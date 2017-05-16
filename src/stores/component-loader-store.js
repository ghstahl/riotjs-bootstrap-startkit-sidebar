/*

var testComponent = {
        key:'typicode-component',
        path:'/partial/typicode_component/bundle.js',
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
              data:{title : 'My Components Page'}
            },{
              event:'plugin-unregistration',
              data:{name:'typicode-component'}
            }
          ]
        },
        state:{loaded:false}
      };

riot.control.trigger('init-component-loader-store');
riot.control.trigger('add-dynamic-component',testComponent);

*/


class ComponentLoaderStore {

    constructor() {
        var self = this;
        self.name = 'ComponentLoaderStore';
        self.namespace = self.name + ':';
        riot.EVT.componentLoaderStore = { 
          in : {
            initComponentLoaderStore: 'init-component-loader-store',
            addDynamicComponent: 'add-dynamic-component',
            loadDynamicComponent: 'load-dynamic-component',
            unloadDynamicComponent: 'unload-dynamic-component',
            componentLoadComplete: 'component-load-complete',
            componentLoaderStoreLocalStorageResult: 'component-loader-store-local-storage-result'
          },
          out: {
            allComponentsLoadComplete: 'all-components-load-complete',
            componentLoaderStoreStateUpdated: 'component-loader-store-state-updated',
            loadExternalJsCss: riot.EVT.dynamicJsCssLoaderStore.in.loadExternalJsCss,
            unloadExternalJsCss: riot.EVT.dynamicJsCssLoaderStore.in.unloadExternalJsCss,
            localstorageGet:riot.EVT.localStorageStore.in.localstorageGet
          }
        };

       
        
        self.wellKnownEvents = {
          
            
            loadExternalJsCssAck: riot.EVT.dynamicJsCssLoaderStore.out.loadExternalJsCssAck,
            unloadExternalJsCssAck: riot.EVT.dynamicJsCssLoaderStore.out.unloadExternalJsCssAck,
            componentLoadComplete: riot.EVT.componentLoaderStore.in.componentLoadComplete,
            ComponentLoaderStoreStateUpdated: riot.EVT.componentLoaderStore.out.componentLoaderStoreStateUpdated,
            pluginUnregistration: 'plugin-unregistration'
        }

        self._components = new Set();
        riot.state.componentLoaderState = {}
        self.state = riot.state.componentLoaderState;
        riot.observable(self);
        self.bindEvents();

    }

    _onInitComponentLoaderStore() {
        var self = this;
        console.log(self.name, riot.EVT.componentLoaderStore.in.initComponentLoaderStore)

        riot.control.trigger(
            riot.EVT.componentLoaderStore.out.localstorageGet, {
                key: 'component-loader-store',
                trigger: { event: riot.EVT.componentLoaderStore.in.componentLoaderStoreLocalStorageResult, riotControl: true }
            });
    }

    _commitToState() {
        var self = this;
        var componentsArray = Array.from(self._components);
        self.state.components = new Map(componentsArray.map((i) => [i.key, i]));
        self._commitToLocalStorage();
        self.trigger(riot.EVT.componentLoaderStore.out.componentLoaderStoreStateUpdated);

    }
    _commitToLocalStorage() {
        var self = this;
        var mySet = self._components;
        var record = {
            components: Array.from(mySet)
        };
        riot.control.trigger(riot.EVT.localStorageStore.in.localstorageSet, {
            key: 'component-loader-store',
            data: record
        });

    }
    _addComponent(component) {
        var self = this;
        if (self._findComponent(component.key) == null) {
            self._components.add(component);
            self._commitToState();
        }
    }
    _findComponent(key) {
        var self = this;
        for (let item of self._components) {
            if (item.key === key) {
                return item;
            }
        }
        return null;
    }
    _onLoadExternalJsCssAck(result) {
        var self = this;
        console.log(self.name, self.wellKnownEvents.loadExternalJsCssAck, result)

        var component = self._findComponent(result.component.key);
        if (component != null) {
            // this is ours
            if (result.state === true) {
                for (let triggerItem of component.trigger.onLoad) {
                    riot.control.trigger(triggerItem.event, triggerItem.data);
                }
                component.state.loaded = true;
                self._commitToLocalStorage();
            } else {
                console.error(result.error);
            }
        }
    }

    _onUnloadExternalJsCssAck(result) {
        var self = this;
        console.log(self.name, self.wellKnownEvents.unloadExternalJsCssAck, result)
        var component = self._findComponent(result.component.key);
        if (component != null) {
            // this is ours
            if (result.state === true) {
                for (let triggerItem of component.trigger.onUnload) {
                    riot.control.trigger(triggerItem.event, triggerItem.data);
                }
                component.state.loaded = false;
                self._commitToLocalStorage();
            } else {
                console.error(result.error);
            }
        }
    }
    _onAddDynamicComponent(component) {
        var self = this;
        console.log(self.name, riot.EVT.componentLoaderStore.in.addDynamicComponent, component)
        var comp = self._findComponent(component.key);
        if (comp == null) {
            self._addComponent(component);
        }
    }

    _onLoadDynamicComponent(key) {
        var self = this;
        console.log(self.name, riot.EVT.componentLoaderStore.in.loadDynamicComponent, key)
        var component = self._findComponent(key);
        if (component != null && component.state.loaded != true) {
            riot.control.trigger(riot.EVT.componentLoaderStore.out.loadExternalJsCss, component);
        }
    }
    _onUnloadDymanicComponent(key) {
        var self = this;
        console.log(self.name, riot.EVT.componentLoaderStore.in.unloadDynamicComponent, key)
        var component = self._findComponent(key);
        if (component != null && component.state.loaded == true) {
            riot.control.trigger(riot.EVT.componentLoaderStore.out.unloadExternalJsCss, component);
        }
    }

    _onLocalStorageResult(result) {
        var self = this;
        console.log(self.name, riot.EVT.componentLoaderStore.in.componentLoaderStoreLocalStorageResult, result)
        if (result != null) {
            for (let item of result.components) {
                item.state.loadedComplete = false;
            }
            for (let item of result.components) {
                self._onAddDynamicComponent(item);
                if (item.state.loaded == true) {
                    item.state.loaded = false;
                    self._onLoadDynamicComponent(item.key);
                }
            }
        }

        // this is in case nobody needed to be loaded, but we had stored componenets that just
        // needed to be added.
        if (self._allLoadedCompleteCheck() == true) {
            riot.control.trigger(riot.EVT.componentLoaderStore.out.allComponentsLoadComplete);
        }
    }
    _allLoadedCompleteCheck() {
        var self = this;
        var result = true;
        for (let item of self._components) {
            if (item.state.loaded === true && item.state.loadedComplete === false) {
                result = false;
                break;
            }
        }
        return result;
    }
    _onComponentLoadComplete(key) {
        var self = this;
        console.log(self.name, riot.EVT.componentLoaderStore.in.componentLoadComplete, key)
        var component = self._findComponent(key);
        if (component != null && component.state.loaded == true) {
            component.state.loadedComplete = true;
            if (self._allLoadedCompleteCheck() == true) {
                riot.control.trigger(riot.EVT.componentLoaderStore.out.allComponentsLoadComplete);
            }
        }
    }
    bindEvents() {
        var self = this;
        self.on(riot.EVT.componentLoaderStore.in.initComponentLoaderStore, self._onInitComponentLoaderStore);
        self.on(riot.EVT.componentLoaderStore.in.loadDynamicComponent, self._onLoadDynamicComponent);
        self.on(riot.EVT.componentLoaderStore.in.unloadDynamicComponent, self._onUnloadDymanicComponent);
        self.on(riot.EVT.componentLoaderStore.in.addDynamicComponent, self._onAddDynamicComponent);
        self.on(self.wellKnownEvents.loadExternalJsCssAck, self._onLoadExternalJsCssAck);
        self.on(self.wellKnownEvents.unloadExternalJsCssAck, self._onUnloadExternalJsCssAck);
        self.on(riot.EVT.componentLoaderStore.in.componentLoaderStoreLocalStorageResult, self._onLocalStorageResult);
        self.on(riot.EVT.componentLoaderStore.in.componentLoadComplete, self._onComponentLoadComplete)
    }
}
export default ComponentLoaderStore;

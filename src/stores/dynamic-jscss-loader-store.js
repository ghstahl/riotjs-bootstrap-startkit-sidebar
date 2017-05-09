// http://www.javascriptkit.com/javatutors/loadjavascriptcss.shtml

/*
	 {
		key:'typicode-component',
		path:'/partial/bundle.js',
		type:'js'
	}
	*/
class DynamicJsCssLoaderStore{
	constructor(){
		riot.observable(this);
		this._bindEvents();
		this._componentsAddedSet = new Set();
	}
	
	_commitToLocalStorage(){
		var mySet = this._componentsAddedSet;
		var record = {
			loaded:Array.from(mySet)
		};
		riot.control.trigger('localstorage_set',{
		        key:'dynamic_jscss_loader_store',
		        data:record
		    });
		
	}

	_addComponent(component){
		if(this._findComponent(component) == null){
			var mySet = this._componentsAddedSet;
			mySet.add(component)
			this._commitToLocalStorage();
		}
	}

	_findComponent(component){
	    var mySet = this._componentsAddedSet;
	    for (let item of mySet) {
	        if(item.key === component.key)
	          return item;
	    }
	    return null;
	  }

	_deleteComponent(component){
	    var mySet = this._componentsAddedSet;
	    for (let item of mySet) {
	        if(item.key === component.key){
	          mySet.delete(item);
	        	break;
	        }
	    }
	    this._commitToLocalStorage();
	  }

	_safeLoadExternal(component){
		var addedCompoment = this._findComponent(component);
		if(addedCompoment == null){
			this._loadExternal(component);
			this._addComponent(component);
		    console.log('load-external-jscss',component);
		    this.trigger('load-external-jscss-ack', {state:true,component:component});
	    }
	    else{
	    	console.error("file already added!",component);
		    this.trigger('load-external-jscss-ack', {
		    	state:false,
		    	component:component,
		    	error:"component already added!"});
	    }
	}
	_removeExternal(component){
		var addedCompoment = this._findComponent(component);
		if(addedCompoment == null){
			this.trigger('unload-external-jscss-ack', {
		    	state:false,
		    	component:component,
		    	error:"no entry found to remove!",});
		}else{
			var filename = component.path;
			var filetype = component.type;
			var targetelement=(filetype=="js")? "script" : (filetype=="css")? "link" : "none" //determine element type to create nodelist from
	    	var targetattr=(filetype=="js")? "src" : (filetype=="css")? "href" : "none" //determine corresponding attribute to test for
	    	var allsuspects=document.getElementsByTagName(targetelement)
	    	for (var i=allsuspects.length; i>=0; i--){ //search backwards within nodelist for matching elements to remove
			    if (	allsuspects[i] 
			    	&& 	allsuspects[i].getAttribute(targetattr)!=null 
			    	&& 	allsuspects[i].getAttribute(targetattr).indexOf(filename)!=-1){
			    	allsuspects[i].parentNode.removeChild(allsuspects[i]) //remove element by calling parentNode.removeChild()
					this._deleteComponent(component);
					
					this.trigger('unload-external-jscss-ack', {
				    	state:true,
				    	component:component});
					break;
		    	}     
		    }
		}
	}


	_loadExternal(component){
		var filename = component.path;
		var filetype = component.type;
		if (filetype=="js"){ //if filename is a external JavaScript file
	        var fileref=document.createElement('script');
	        fileref.setAttribute("type","text/javascript");
	        fileref.setAttribute("src", filename);
	    }
	    else if (filetype=="css"){ //if filename is an external CSS file
	        var fileref=document.createElement("link");
	        fileref.setAttribute("rel", "stylesheet");
	        fileref.setAttribute("type", "text/css");
	        fileref.setAttribute("href", filename);
	    }
	    if (typeof fileref!="undefined"){
	        document.getElementsByTagName("head")[0].appendChild(fileref);
	    }
	}

	_onLocalStorageResult(data){
		var self = this;
		console.log('dynamicjscss-localstorage-result' +':' + data);
		if(data && data != undefined && data.loaded && data.loaded != undefined){
			data.loaded.forEach(function(element) {
		    		console.log(element);
		    		self._safeLoadExternal(element);
					});

			//data.loaded.forEach(this._safeLoadExternal(entry.filename,entry.filetype));
		}
	}
	_onInit(){
		riot.control.trigger('localstorage_get',{
		        key:'dynamic_jscss_loader_store',
		        trigger:{event:'dynamicjscss-localstorage-result',riotControl:true}
		    });
	}
  	_bindEvents(){
  		this.on('dynamic-jscss-loader-init',		this._onInit);
    	this.on('load-external-jscss', 				this._safeLoadExternal);
    	this.on('unload-external-jscss', 			this._removeExternal);
    	this.on('dynamicjscss-localstorage-result', this._onLocalStorageResult);
    }
  
}
export default DynamicJsCssLoaderStore;
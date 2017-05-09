// http://www.javascriptkit.com/javatutors/loadjavascriptcss.shtml

class DynamicJsCssLoaderStore{
	constructor(){
		riot.observable(this);
		this._bindEvents();
		this._filesAddedSet = new Set();
	}
	_safeLoadExternal(filename,filetype){
		var s = this._filesAddedSet;
		if(s.has(filename) == false){
			this._loadExternal(filename, filetype);
			s.add(filename);
		    console.log('load-external-jscss',filename,filetype);
		    this.trigger('load-external-jscss-ack', {state:true,filename:filename,filetype:filetype});
	    }
	    else{
	    	console.error(filename,filetype,"file already added!");
		    this.trigger('load-external-jscss-ack', {
		    	state:false,
		    	filename:filename,
		    	filetype:filetype,
		    	error:"file already added!"});
	    }
	}
	_removeExternal(filename, filetype){
		var s = this._filesAddedSet;
		if(s.has(filename) == false){
			this.trigger('unload-external-jscss-ack', {
		    	state:false,
		    	filename:filename,
		    	filetype:filetype,
		    	error:"no entry found to remove!"});
		}else{
			var targetelement=(filetype=="js")? "script" : (filetype=="css")? "link" : "none" //determine element type to create nodelist from
	    	var targetattr=(filetype=="js")? "src" : (filetype=="css")? "href" : "none" //determine corresponding attribute to test for
	    	var allsuspects=document.getElementsByTagName(targetelement)
	    	for (var i=allsuspects.length; i>=0; i--){ //search backwards within nodelist for matching elements to remove
			    if (	allsuspects[i] 
			    	&& 	allsuspects[i].getAttribute(targetattr)!=null 
			    	&& 	allsuspects[i].getAttribute(targetattr).indexOf(filename)!=-1){
			    	allsuspects[i].parentNode.removeChild(allsuspects[i]) //remove element by calling parentNode.removeChild()
					
					s.delete(filename);
					break;
		    	}     
		    }
		}
	}


	_loadExternal(filename,filetype){
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

  	_bindEvents(){
    	this.on('load-external-jscss', this._safeLoadExternal);
    	this.on('unload-external-jscss', this._removeExternal);
    }
  
}
export default DynamicJsCssLoaderStore;
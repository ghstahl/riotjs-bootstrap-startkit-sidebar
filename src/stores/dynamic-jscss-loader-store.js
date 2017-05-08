// http://www.javascriptkit.com/javatutors/loadjavascriptcss.shtml

class DynamicJsCssLoaderStore{
	constructor(){
		this._filesadded = ""; //list of files already added
		riot.observable(this);
		this._bindEvents();
	}
	_safeLoadExternal(filename,filetype){
		if (this._filesadded.indexOf("["+filename+"]")==-1){
        	this._loadExternal(filename, filetype);
        	this._filesadded+="["+filename+"]"; //List of files added in the form "[filename1],[filename2],etc"
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
    }
  
}
export default DynamicJsCssLoaderStore;
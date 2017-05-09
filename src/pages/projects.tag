<projects>
  
<h2>Projects</h2>
<p>
	This will load a mini spa located at /partial/bundle.js.
	This mini spa was built using the riotjs-partial-tag nexted project.
</p>

<a 	onclick={this.loadMyComponentsSPA} 
	class={this.state.loaded === true?'disabled btn btn-default btn-lg btn-block':'btn btn-default btn-lg btn-block'}>
	Load My Component SPA</a>

<a 	onclick={this.unloadMyComponentsSPA} 
	class={this.state.loaded === false?'disabled btn btn-default btn-lg btn-block':'btn btn-default btn-lg btn-block'}>Unload My Component SPA</a>
<p>
	{this.state.text}
</p>
<script>
	var self = this;
	self.state = {};

	self._componentPath = '/partial/bundle.js';
	
	self.on('before-mount', () => {
		if(riot.state.projects === undefined){
			riot.state.projects = {loaded:false, text:"Not Loaded Yet..."}
		}
	    self.state = riot.state.projects;
	  });

	self.on('mount', () => {
	    console.log('header mount');
	    riot.control.on('load-external-jscss-ack',self.onLoadExternalJSCssAck);
	    riot.control.on('unload-external-jscss-ack',self.onUnloadExternalJSCssAck);
	  });
	
	self.on('unmount', () => {
	    console.log('header unmount')
	    riot.control.off('load-external-jscss-ack',self.onLoadExternalJSCssAck);
	    riot.control.off('unload-external-jscss-ack',self.onUnloadExternalJSCssAck);
	  });
	
	self.onLoadExternalJSCssAck = (result) => {
		if(result.filename === self._componentPath){
			// this is ours
			if(result.state === true){
				riot.control.trigger(	'riot-dispatch',
								'sidebar-add-item',
								{ 
									title : 'My Components Page', 
									view : 'my-component-page' 
								}
							);
				self.state.text = "Loaded!"
				self.state.loaded = true;
			}else{
				self.state.text = result.error;
			}
		}
	}
	self.onUnloadExternalJSCssAck = (result) => {
		if(result.filename === self._componentPath){
			// this is ours
			if(result.state === true){
				riot.control.trigger(	
								'riot-dispatch',
								'sidebar-remove-item',
								{ 
									title : 'My Components Page'
								}
							);
				self.state.text = "Not Loaded!"
				self.state.loaded = false;
			}else{
				self.state.text = result.error;
			}
		}
	}
  	
  	self.loadMyComponentsSPA = () => {
		riot.control.trigger('load-external-jscss',self._componentPath,'js');
  	};
  	self.unloadMyComponentsSPA = () => {
  		var registerRecord = {
			name:'riotjs-partial-spa'
		};
		riot.control.trigger('plugin-unregistration',registerRecord);
		riot.control.trigger('unload-external-jscss',self._componentPath,'js');
  	};
</script>
</projects>


'load-external-jscss-ack'
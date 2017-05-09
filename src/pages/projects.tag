<projects>
  
<h2>Projects</h2>
	<a 	onclick={this.loadMyComponentsSPA} 
		class="btn btn-default btn-lg btn-block">Load My Component SPA</a>
	<p>
		{this.resultText}
	</p>


	<a 	onclick={this.unloadMyComponentsSPA} 
		class="btn btn-default btn-lg btn-block">Unload My Component SPA</a>
	<p>
		{this.unloadResultText}
	</p>
<script>
	var self = this;
	self.resultText = "nothing yet...";
	self.unloadResultText = "nothing yet...";
	self._componentPath = '/partial/bundle.js';
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
				self.resultText = "Success!"
			}else{
				self.resultText = result.error;
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
		riot.control.trigger(	'riot-dispatch',
								'sidebar-remove-item',
								{ 
									title : 'My Components Page'
								}
							);
		riot.control.trigger('unload-external-jscss',self._componentPath,'js');
  	};
</script>
</projects>


'load-external-jscss-ack'
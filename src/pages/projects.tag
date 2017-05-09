<projects>
  
<h2>Projects</h2>
<p>
	This will load a mini spa located at /partial/bundle.js.
	This mini spa was built using the riotjs-partial-tag nexted project.
</p>

<a 	onclick={this.loadMyComponentsSPA} 
	class={this._myComponent.state.loaded === true?'disabled btn btn-default btn-lg btn-block':'btn btn-default btn-lg btn-block'}>
	Load My Component SPA</a>

<a 	onclick={this.unloadMyComponentsSPA} 
	class={this._myComponent.state.loaded === false?'disabled btn btn-default btn-lg btn-block':'btn btn-default btn-lg btn-block'}>Unload My Component SPA</a>
<p>
	{this.state._myComponent}
</p>
<script>
	var self = this;
	self.state = {};
	self._myComponent = {};
	self._componentRecord = {
		key:'typicode-component',
		path:'/partial/bundle.js',
		type:'js'
	}

	self.on('before-mount', () => {
		if(riot.state.projects === undefined){
			riot.state.projects = {loaded:false, text:"Not Loaded Yet..."}
		}
	    self.state = riot.state.startup;
	    self._myComponent = self.state.components.get('typicode-component');
	  });

	self.on('mount', () => {
	    console.log('projects mount');
	  });
	
	self.on('unmount', () => {
	    console.log('projects unmount')
	  });

  	self.loadMyComponentsSPA = () => {
		riot.control.trigger('load-external-jscss',self._componentRecord);
  	};

  	self.unloadMyComponentsSPA = () => {
  		var registerRecord = {
			name:'riotjs-partial-spa'
		};
		riot.control.trigger('plugin-unregistration',registerRecord);
		riot.control.trigger('unload-external-jscss',self._componentRecord);
  	};
</script>
</projects>

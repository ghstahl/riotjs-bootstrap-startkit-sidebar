<projects>
  
<h2>Projects</h2>
<p>
	This will load a mini spa located at /partial/bundle.js.
	This mini spa was built using the riotjs-partial-tag nexted project.
</p>

<a 	onclick={this.loadMyComponentsSPA} 
	class={this._myComponent.state.loaded === true?'disabled btn btn-default btn-lg btn-block':'btn btn-primary btn-lg btn-block'}>
	Load My Component SPA</a>

<a 	onclick={this.unloadMyComponentsSPA} 
	class={this._myComponent.state.loaded === false?'disabled btn btn-default btn-lg btn-block':'btn btn-primary btn-lg btn-block'}>Unload My Component SPA</a>

<script>
	var self = this;

	self._myComponent = {};

	self.on('before-mount', () => {
		if(riot.state.projects === undefined){
			riot.state.projects = {loaded:false, text:"Not Loaded Yet..."}
		}
	    self._myComponent = riot.state.componentLoaderState.components.get('typicode-component');
	  });

	self.on('mount', () => {
	    console.log('projects mount');
	  });
	
	self.on('unmount', () => {
	    console.log('projects unmount')
	  });

  	self.loadMyComponentsSPA = () => {
  		riot.control.trigger('load-dynamic-component','typicode-component');
  	};

  	self.unloadMyComponentsSPA = () => {
  		riot.control.trigger('unload-dynamic-component','typicode-component');
  	};
</script>
</projects>

<sidebar>
 
		<a 	each={ navItems } 
			onclick={parent.route}
			class={ parent.routeState.view === this.view? 'active list-group-item':'list-group-item'  } 
			>{this.title}</a>
	 
</div>        
 

<script>
	var self = this;
  	self.routeState = riot.routeState;

	self.navItems = [
	    { title : 'Home', view : 'home'},
	    { title : 'Projects', view : 'projects' },
    	{ title : 'Type-iCode Users', view : 'typicode-users' }
	  ];

	self.on('mount', () => {
	    console.log('header mount');
	    riot.control.on('riot-route-dispatch-ack',self.onRiotRouteDispatchAck);
	  });
	  self.on('unmount', () => {
	    console.log('header unmount')
	    riot.control.off('riot-route-dispatch-ack',self.onRiotRouteDispatchAck);
	  });

	  self.onRiotRouteDispatchAck = () =>{
	    console.log('header riot-route-dispatch-ack')
	    self.update()
	  }

	  self.route = (evt) => {
		riot.control.trigger('riot-route-dispatch',evt.item.view);
	  };
	</script>
</sidebar>
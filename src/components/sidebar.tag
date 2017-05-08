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
	    { title : 'Projects', view : 'projects' }
	  ];

	self.on('mount', () => {
	    console.log('header mount');
	    riot.control.on('riot-route-dispatch-ack',self.onRiotRouteDispatchAck);
	    riot.control.on('sidebar-add-item',self.onSidebarAddItem);
	  });
	  self.on('unmount', () => {
	    console.log('header unmount')
	    riot.control.off('riot-route-dispatch-ack',self.onRiotRouteDispatchAck);
     	riot.control.off('sidebar-add-item',self.onSidebarAddItem);
	  });

	  self.onRiotRouteDispatchAck = () =>{
	    console.log('header riot-route-dispatch-ack')
	    self.update()
	  }

	  self.route = (evt) => {
		riot.control.trigger('riot-route-dispatch',evt.item.view);
	  };
	  self.onSidebarAddItem = (item) => {
		self.navItems.push(item);
		self.update();
	  };
	</script>
</sidebar>
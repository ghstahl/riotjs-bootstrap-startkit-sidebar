<sidebar>
 
		<a 	each={ navItems } 
			onclick={parent.route}
			class={ parent.routeState.view === this.view? 'active list-group-item':'list-group-item'  } 
			>{this.title}</a>
	 
</div>        
 

<script>
	var self = this;
  	self.routeState = riot.routeState;
  	self.navSet = new Set();
  	self.navSet.add({ title : 'Home', view : 'home'})
  	self.navSet.add({ title : 'Projects', view : 'projects'})

	self.navItems = Array.from(self.navSet);

	self.on('mount', () => {
	    console.log('header mount');
	    riot.control.on('riot-route-dispatch-ack',self.onRiotRouteDispatchAck);
	    riot.control.on('sidebar-add-item',self.onSidebarAddItem);
	    riot.control.on('sidebar-remove-item',self.onSidebarRemoveItem);
	  });
	  self.on('unmount', () => {
	    console.log('header unmount')
	    riot.control.off('riot-route-dispatch-ack',self.onRiotRouteDispatchAck);
     	riot.control.off('sidebar-add-item',self.onSidebarAddItem);
     	riot.control.off('sidebar-remove-item',self.onSidebarRemoveItem);
	  });

	  self.onRiotRouteDispatchAck = () =>{
	    console.log('header riot-route-dispatch-ack')
	    self.update()
	  }

	  self.route = (evt) => {
		riot.control.trigger('riot-route-dispatch',evt.item.view);
	  };
	  self.onSidebarAddItem = (item) => {
	  	self.navSet.add(item)
		self.navItems = Array.from(self.navSet);
		self.update();
	  };
	  self.onSidebarRemoveItem = (item) => {
	  	var mySet = self.navSet;
	  	for (let s of mySet) {
	  		if(s.title === item.title){
	  			mySet.delete(s);
	  			break;
	  		}
	  	}
		self.navItems = Array.from(self.navSet);
		self.update();
	  };
	</script>
</sidebar>
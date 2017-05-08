<my-component-page>
   
<h2>my-component-page</h2>
<p>
  Lorem ipsum dolor sit amet, consectetur adipisicing elit. 
  Aspernatur quia soluta optio excepturi, earum saepe explicabo veritatis fuga nesciunt, reprehenderit harum. 
  Libero consequuntur neque fuga eos, aliquam id beatae eaque? 
</p>

<table class="table table-striped table-hover ">
  <thead>
    <tr>
      <th>id</th>
      <th>username</th>
      <th>name</th>
      <th>email</th>
      <th>phone</th>
      
    </tr>
  </thead>
  <tbody>
    <tr each={ this.results }>
      <td>{ this.id }</td>
      <td>{ this.username }</td>
      <td>{ this.name }</td>
      <td>{ this.email }</td>
      <td>{ this.phone }</td>
      <td><a onclick={parent.route}>More...</a></td>
    </tr>
     
  </tbody>
</table> 
<script>
	var self = this;
	self.error = false;
    self.results = [];
    /**
     * Reset tag attributes to hide the errors and cleaning the results list
     */
    self.resetData = function() {
      self.results = [];
      self.error = false;
    }

	self.on('mount', () => {
      console.log('typicode-users mount')
      riot.control.on('typicode_users_changed',self.onTypicodeUsersChanged);
      riot.control.trigger('typicode_users_fetch');
    });
    self.on('unmount', () => {
      console.log('typicode-users unmount')
      riot.control.off('typicode_users_changed',self.onTypicodeUsersChanged);
    });
	self.onTypicodeUsersChanged = (result) =>{
       console.log('typicode_users_changed');
       self.results = result;
       console.log(self.results);
       self.update();
    }
    self.route = (evt) => {
		riot.control.trigger('riot-route-dispatch',
		'typicode-user-detail?id='+evt.item.id);
	  };
</script>

</my-component-page>

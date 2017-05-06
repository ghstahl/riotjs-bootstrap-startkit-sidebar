<typicode-users>
  
<h2>typicode-users</h2>
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
</script>

</typicode-users>
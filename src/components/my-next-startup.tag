<my-next-startup>
<script>
	var self = this;
  self.name = 'my-next-startup';
  if(self.opts.config){
    self.config = self.opts.config;
  }
   
  self.loaded = false;
  self.on('mount', () => {
    console.log(self.name,'mount')
    riot.control.trigger(riot.EVT.startupStore.in.start,'app');
  });

  self.on('unmount', () => {
  });
    
</script>
</my-next-startup>

import './components/header.tag';
import './components/sidebar.tag';
import './components/loading-indicator.tag';
import './components/startup.tag';
<app>

<loading-indicator></loading-indicator>
<header></header>
<div class="container">
  <div class="row">
 
    <div class="col-sm-3 col-md-2 sidebar">
      <div class="list-group table-of-contents">
        <sidebar></sidebar>
      </div>
    </div>

    <div class="col-sm-9 col-sm-offset-3 col-md-10 col-md-offset-2 main">
      <div id="riot-app"></div>
    </div>
  </div>
</div>

<script>
 	var self = this;

 	self.on('mount', () => {
      console.log('app mount');
      riot.control.on(riot.EVT.appMount,self.onAppMount);
      riot.control.trigger('riot-dispatch','app-mount');
    });

  self.on('unmount', () => {
      console.log('app unmount')
      riot.control.trigger('riot-dispatch','app-unmount');
      riot.control.off(riot.EVT.appMount,self.onAppMount);
    });

  self.onAppMount = () =>{
      console.log('app '+ riot.EVT.appMount)
    }

</script>
</app>
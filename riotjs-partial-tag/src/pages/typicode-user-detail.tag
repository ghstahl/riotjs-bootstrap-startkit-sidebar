<typicode-user-detail>
    <h4>{ result.name }</h4>

 <script>
    var self = this;

    self.result = {};
    self.onUserChanged = (user) => {
        self.result = user;
        console.log(self.result);
        self.update();
    }

    self.on('unmount', function() {
        console.log('on unmount:');
        riot.control.off('typicode_user_changed', self.onUserChanged);

    });

    self.on('mount', function() {
        var q = riot.route.query();
        console.log('on mount: typicode-user-detail',q);
        riot.control.on('typicode_user_changed', self.onUserChanged);
        riot.control.trigger('typicode_user_fetch', { id: q.id });
    });

</script>
</typicode-user-detail>
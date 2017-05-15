/**
 * Created by Herb on 9/27/2016.
 */
// TodoStore definition.
// Flux stores house application logic and state that relate to a specific domain.
// In this case, a list of todo items.

const user_cache = 'typicodeUserCache';

function TypicodeUserStore() {
    var self = this
    self.name = 'TypicodeUserStore';
    riot.EVT.typicodeUserStore ={
        in:{
            typicodeInit:'typicode-init',
            typicodeUninit:'typicode-uninit',
            typicodeUsersFetchResult:'typicode_users_fetch_result',
            typicodeUsersFetch:'typicode_users_fetch'
        },
        out:{}
    }
    riot.observable(self) // Riot provides our event emitter.

    self.fetchException = null;

    self.on(riot.EVT.app.out.appMount, function() {
        console.log(riot.EVT.app.out.appMount,self.name);
        riot.control.on('typicode_users_fetch_result', self.onUsersResult);
    })
    self.on(riot.EVT.app.out.appUnmount, function() {
        console.log(riot.EVT.app.out.appUnmount,self.name);
        riot.control.off('typicode_users_fetch_result', self.onUsersResult);
    })
    self.on('typicode-init', function() {
        console.log('typicode-init',self.name);
        riot.control.on('typicode_users_fetch_result', self.onUsersResult);
    })
    self.on('typicode-uninit', function() {
        console.log('typicode-uninit',self.name);
        riot.control.off('typicode_users_fetch_result', self.onUsersResult);
    })
    

    /**
     * Reset tag attributes to hide the errors and cleaning the results list
     */
    self.resetData = function() {
        self.fetchException = null;
    }

    self.onUsersResult = (data) =>{
        console.log('user_fetch_result:',data);
        riot.control.trigger('localstorage_set',{key:user_cache,data:data});
        self.trigger('typicode_users_changed', data)
    }

    self.on('typicode_users_fetch', function() {
        console.log('typicode_users_fetch:');
        var url = 'https://jsonplaceholder.typicode.com/users';
        riot.control.trigger('fetch',url,null,{name:'typicode_users_fetch_result'});
    })

    self.on('typicode_user_fetch', function(query) {
        console.log('typicode_user_fetch:');
        var restoredSession = JSON.parse(localStorage.getItem(user_cache));
        var result = restoredSession.filter(function( obj ) {
            return obj.id == query.id;
        });
        if(result && result.length>0){
            self.trigger('typicode_user_changed',result[0]);
        }
    })

    // The store emits change events to any listening views, so that they may react and redraw themselves.
}
if (typeof(module) !== 'undefined') module.exports = TypicodeUserStore;




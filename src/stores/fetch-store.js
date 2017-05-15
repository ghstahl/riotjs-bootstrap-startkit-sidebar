/**
 * Created by Herb on 9/27/2016.
 */
// TodoStore definition.
// Flux stores house application logic and state that relate to a specific domain.
// In this case, a list of todo items.
import 'whatwg-fetch';
import RiotControl from 'riotcontrol';


function FetchStore() {
    riot.observable(this) // Riot provides our event emitter.

    var self = this

    self.fetchException = null;
    riot.EVT.fetchStore ={
        in:{fetch:'fetch'},
        out:{}
    }
    /**
     * Reset tag attributes to hide the errors and cleaning the results list
     */
    self.resetData = function() {
        self.fetchException = null;
    }

    self.onRiotTrigger = (query,data)=>{
        if(query.query){
            RiotControl.trigger(query.evt,query.query);
        }else{
            RiotControl.trigger(query.evt);
        }
    }
    self.on(riot.EVT.app.out.appMount, function() {
        console.log('FetchStore',riot.EVT.app.out.appMount);
        RiotControl.on('riot-trigger', self.onRiotTrigger);
    })

    self.on(riot.EVT.app.out.appUnmount, function() {
        console.log('FetchStore app-unmount');
        RiotControl.off('riot-trigger', self.onRiotTrigger);
    })
    self.doRiotControlFetchRequest = function(input,init,trigger,jsonFixup ) {
        // we are a json shop

        RiotControl.trigger('inprogress_start');
        if(jsonFixup == true){
            if(!init){
                init = {}
            }
            if(!init.headers){
                init.headers = {}
            }
            if(!init.headers['Content-Type']){
                init.headers['Content-Type'] = 'application/json'
            }
            if(!init.headers['Accept']){
                init.headers['Accept'] = 'application/json'
            }

            if(init.body){
                var type = typeof(init.body)
                if(type === 'object'){
                    init.body = JSON.stringify(init.body)
                }
            }
        }

        fetch(input,init).then(function (response) {
            if(response.status == 204){
                return null;
            }
            return response.json();
        }).then(function (data) {
            console.log(data);
            RiotControl.trigger('inprogress_done');
            let myTrigger = JSON.parse(JSON.stringify(trigger));

            if(myTrigger.query){
                self.trigger(trigger.name,myTrigger.query,data);
            }
            else{
                self.trigger(trigger.name,data);
            }
        }).catch(function(ex) {
            console.log('fetch failed', ex)
            self.error = ex;
            RiotControl.trigger('inprogress_done');
        });
    }

    // Our store's event handlers / API.
    // This is where we would use AJAX calls to interface with the server.
    // Any number of views can emit actions/events without knowing the specifics of the back-end.
    // This store can easily be swapped for another, while the view components remain untouched.

    self.on(riot.EVT.fetchStore.in.fetch, function(input,init,trigger,jsonFixup = true) {
        console.log(riot.EVT.fetchStore.in.fetch,input,init,trigger,jsonFixup);
        self.doRiotControlFetchRequest(input,init,trigger,jsonFixup);
    })

    // The store emits change events to any listening views, so that they may react and redraw themselves.

}

if (typeof(module) !== 'undefined') module.exports = FetchStore;





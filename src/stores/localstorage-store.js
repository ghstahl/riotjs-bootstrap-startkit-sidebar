/**
 * Created by Herb on 9/27/2016.
 */

function LocalStorageStore() {
    var self = this

    riot.observable(self) // Riot provides our event emitter.


    /*
     {
         key:[string:required],
         data: [Object],
         trigger:[optional]{
                event:[string],
                riotControl:bool  // do a riotcontrol.trigger or just an observable trigger.
         }
     }
     */

    self.on('localstorage_set', function(query) {
        console.log('localstorage_set:',query);
        localStorage.setItem(query.key, JSON.stringify(query.data));
        if(query.trigger){
            self.trigger(query.trigger) // in case you want an ack
        }
    })

    /*
    {
        key:'myKey',
        trigger:{
                event:[string],
                riotControl:bool  // do a riotcontrol.trigger or just an observable trigger.
         }
    }
     */
    self.on('localstorage_get', function(query) {
        console.log('localstorage_get:',query);
        var stored = localStorage.getItem(query.key);
        var data = null;
        if(stored && stored != "undefined"){
            data = JSON.parse(stored);
        }
        if(query.trigger.riotControl == true){
            riot.control.trigger(query.trigger.event,data);
        }else{
            self.trigger(query.trigger.event, data);
        }
    })

    /*
     {
     key:'myKey',
     trigger:'myTrigger'
     }
     */
    self.on('localstorage_remove', function(query) {
       console.log('localstorage_get:',query);
       localStorage.removeItem(query.key);
    })

    /*

     */
    self.on('localstorage_clear', function() {
        console.log('localstorage_get:');
        localStorage.clear();
    })
}

if (typeof(module) !== 'undefined') module.exports = LocalStorageStore;




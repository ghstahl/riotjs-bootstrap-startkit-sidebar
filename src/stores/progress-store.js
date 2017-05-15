/**
 * Created by Herb on 9/27/2016.
 */
// TodoStore definition.
// Flux stores house application logic and state that relate to a specific domain.
// In this case, a list of todo items.

function ProgressStore() {
    var self = this

    riot.observable(self) // Riot provides our event emitter.

    riot.EVT.progressStore ={
        in:{
            inprogressDone:'inprogress_done',
            inprogressStart:'inprogress_start'
        },
        out:{
            progressStart:'progress_start',
            progressCount:'progress_count',
            progressDone:'progress_done'
        }
        
    }

    self.count = 0;

    // Our store's event handlers / API.
    // This is where we would use AJAX calls to interface with the server.
    // Any number of views can emit actions/events without knowing the specifics of the back-end.
    // This store can easily be swapped for another, while the view components remain untouched.

    self.on(riot.EVT.progressStore.in.inprogressStart, function() {
        if(self.count == 0){
            self.trigger(riot.EVT.progressStore.out.progressStart)
        }
        ++self.count;
        self.trigger(riot.EVT.progressStore.out.progressCount,self.count);
    })

    self.on(riot.EVT.progressStore.in.inprogressDone, function() {
        if(self.count == 0){
            // very bad.
            console.error('inprogress_done:','someone has their inprogress_done mismatched with thier inprogress_start');
        }
        if(self.count > 0){
            --self.count;
        }
        self.trigger(riot.EVT.progressStore.out.progressCount,self.count);
        if(self.count == 0){
            self.trigger(riot.EVT.progressStore.out.progressDone)
        }
    })
}


if (typeof(module) !== 'undefined') module.exports = ProgressStore;




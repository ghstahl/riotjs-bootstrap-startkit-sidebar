import * as nprogress from 'nprogress';
import 'nprogress/nprogress.css'

<loading-indicator>

<script>
    var self = this;
    self.onProgressStart = () =>{
        nprogress.start();
    }
    self.onProgressDone = () =>{
        nprogress.done();
    }
    self.on('mount', function() {
        console.log('loading-indicator mount......')
        riot.control.on('progress_start', self.onProgressStart);
        riot.control.on('progress_done', self.onProgressDone);
    });

    self.on('unmount', function() {
        console.log('loading-indicator unmount......')
        riot.control.off('progress_start', self.onProgressStart);
        riot.control.off('progress_done', self.onProgressDone);
    });

</script>
</loading-indicator>
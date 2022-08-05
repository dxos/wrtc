import { describe, suite } from "razmin";

console.log(`****************`);
console.log(`@/webrtc Test Suite`);
console.log(`PID: ${process.pid}`);
console.log(`Starting in 10 seconds...`);

setTimeout(() => {
    suite()
        .include([
            '**/*.test.js',
            //'**/r*.test.js',
            //'**/connect.test.js'
        ])
        .withOptions({
            execution: {
                order: 'default',
                timeout: 10*1000,
                verbose: true
            }
        })
        .run()
    ;
}, 10*1000);


// TODO(mroberts): async_hooks were introduced in Node 9. We use them to test
// that destructors fire at the appropriate time (and hence, no memory leaks
// occur). Once we drop support for Node < 9, remove this.
// TODO: this need to be fixed
// if (semver(process.version).major >= 9 && typeof gc === 'function') {
//   require('./destructor');
// }
import { describe, suite } from "razmin";

console.log(`****************`);
console.log(`STARTING TESTS`);

suite().include(['**/r*.test.js']).run();

// TODO(mroberts): async_hooks were introduced in Node 9. We use them to test
// that destructors fire at the appropriate time (and hence, no memory leaks
// occur). Once we drop support for Node < 9, remove this.
// TODO: this need to be fixed
// if (semver(process.version).major >= 9 && typeof gc === 'function') {
//   require('./destructor');
// }
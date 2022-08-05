/* eslint no-process-exit:0 */

import binding from '../../../binding';
import { describe } from 'razmin';

describe('C++', it => {
  it('should pass the internal test suite', () => {  
    if (typeof binding.test === 'function') {
      const result = binding.test();
      process.exit(result);
    }
  })
})
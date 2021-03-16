import initTwThemes from './initTwThemes';

//*** 
//*** DOCUMENTATION NOTE: See docs for complete and thorough description!
//*** 


//*** 
//*** Promote all tw-themes PUBLIC API through a centralized module.
//*** 

// this non-default export supports ES6 imports
// EX:
//     import {initTwThemes}  from 'tw-themes';
//    -or-
//     import * as MyTwThemes from 'tw-themes';
export {
  initTwThemes,
}

// this default export supports CommonJS modules (otherwise Babel does NOT promote them).
// EX:
//     const {initTwThemes} = require('tw-themes');
//    -or-
//     const MyTwThemes     = require('tw-themes');
export default {
  initTwThemes,
}

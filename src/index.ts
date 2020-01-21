
/* IMPORT */

import * as fs from 'fs-extra';
import getUnusedPath from 'get-unused-path';
import {Result} from 'get-unused-path/dist/types';
import tryloop from 'tryloop';
import {ExponentialOptions} from 'tryloop/dist/types';
import {Options} from './types';

/* COPY UNUSED PATH */

function copyUnusedPath ( filePath: string, options: Options, tryloopOptions?: Partial<Omit<ExponentialOptions, 'fn'>> ): Promise<Result> {

  return new Promise ( ( resolve, reject ) => {

    getUnusedPath ( options ).then ( result => {

      function copy () {
        return new Promise ( resolve => {
          fs.copy ( filePath, result.filePath, err => {
            if ( err ) return resolve ();
            resolve ( true );
          });
        });
      }

      function end ( success?: boolean ) {
        if ( options.autoDispose !== false ) result.dispose ();
        if ( success === true ) return resolve ( result );
        reject ( new Error ( 'Couldn\'t copy to unused path' ) );
      }

      const exponentialOptions = Object.assign ({
        timeout: 3000,
        tries: 20,
        factor: 2,
        minInterval: 1,
        maxInterval: 1000,
        fn: copy
      }, tryloopOptions );

      const loop = tryloop.exponential ( exponentialOptions );

      loop.start ().then ( end ).catch ( end );

    }).catch ( reject );

  });

}

copyUnusedPath.blacklist = getUnusedPath.blacklist;

/* EXPORT */

export default copyUnusedPath;

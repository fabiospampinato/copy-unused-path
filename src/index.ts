
/* IMPORT */

import * as fs from 'fs';
import getUnusedPath from 'get-unused-path';
import {Options, Result} from 'get-unused-path/dist/types';
import tryloop from 'tryloop';

/* COPY UNUSED PATH */

function copyUnusedPath ( filePath: string | Buffer, options: Options ): Promise<Result> {

  return new Promise ( ( resolve, reject ) => {

    getUnusedPath ( options ).then ( result => {

      function copy () {
        return new Promise ( resolve => {
          fs.copyFile ( filePath, result.filePath, err => {
            if ( err ) return resolve ();
            resolve ( true );
          });
        });
      }

      function end ( success?: boolean ) {
        result.dispose ();
        if ( success === true ) return resolve ( result );
        reject ( new Error ( 'Couldn\'t copy to unused path' ) );
      }

      const loop = tryloop.exponential ({
        timeout: 1500,
        tries: 20,
        factor: 2,
        minInterval: 1,
        maxInterval: 1000,
        fn: copy
      });

      loop.start ().then ( end ).catch ( end );

    }).catch ( reject );

  });

}

/* EXPORT */

export default copyUnusedPath;

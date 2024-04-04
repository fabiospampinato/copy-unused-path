
/* IMPORT */

import getUnusedPath from 'get-unused-path';
import fs from 'node:fs';
import type {Options, Result} from './types';

/* MAIN */

const copyUnusedPath = async ( filePath: string, options: Options ): Promise<Result> => {

  const result = await getUnusedPath ( options );

  try {

    await fs.promises.cp ( filePath, result.filePath, { recursive: true } );

    return result;

  } finally {

    if ( options.autoDispose !== false ) {

      result.dispose ();

    }

  }

};

/* EXPORT */

export default copyUnusedPath;
export type {Options, Result};

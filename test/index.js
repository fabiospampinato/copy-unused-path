
/* IMPORT */

import {describe} from 'fava';
import fs from 'node:fs';
import path from 'node:path';
import copyUnusedPath from '../dist/index.js';

/* MAIN */

describe ( 'copyUnusedPath', it => {

  it ( 'works', async t => {

    const filePathSource = path.join ( process.cwd (), 'test', 'index.js' );
    const filePathTarget = path.join ( process.cwd (), 'foo.txt' );

    const result = await copyUnusedPath ( filePathSource, { fileName: 'foo.txt' } );

    t.is ( result.filePath, filePathTarget );
    t.is ( fs.readFileSync ( filePathTarget, { encoding: 'utf8' } ), fs.readFileSync ( filePathSource, { encoding: 'utf8' } ) );

    fs.unlinkSync ( filePathTarget );

  });

});

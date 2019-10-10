
/* IMPORT */

import {describe} from 'ava-spec';
import * as fs from 'fs';
import * as path from 'path';
import {default as copyUnusedPath} from '../dist';

/* COPY UNUSED PATH */

describe ( 'copyUnusedPath', it => {

  it ( 'works', async t => {

    const filePath = path.join ( process.cwd (), 'foo.txt' );

    const result = await copyUnusedPath ( __filename, { fileName: 'foo.txt' } );

    t.is ( result.filePath, filePath );
    t.is ( fs.readFileSync ( filePath, { encoding: 'utf8' } ), fs.readFileSync ( __filename, { encoding: 'utf8' } ) );

    fs.unlinkSync ( filePath );

  });

});

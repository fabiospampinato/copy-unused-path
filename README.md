# Copy Unused Path

Reliably copy to an unused path.

It is basically a wrapper around [get-unused-path](https://github.com/fabiospampinato/get-unused-path) which doesn't just return an unused path, but also copies to it.

## Install

```sh
npm install --save copy-unused-path
```

## Usage

It accepts the same options object as [get-unused-path](https://github.com/fabiospampinato/get-unused-path), plus the following options:

```ts
{
  autoDispose?: boolean // Automatically dispose once the operation is completed, enabled by default
}
```

It also returns the same return value as [get-unused-path](https://github.com/fabiospampinato/get-unused-path).

```ts
import fs from 'fs';
import copyUnusedPath from 'copy-unused-path';

async function example () {

  const sourceFilePath = '/x/y/z/bar.txt';

  const {folderPath, filePath, fileName} = await copyUnusedPath ( sourceFilePath, {
    folderPath: '/x/y/z',
    fileName: 'foo.txt',
    // maxTries: 1000,
    // incrementer: ( name, ext, attempt ) => attempt > 1 ? `${name}-${attempt}${ext}` : `${name}${ext}`
  });

  console.log ( folderPath ); // => '/x/y/z'
  console.log ( filePath ); // => '/x/y/z/foo (3).txt'
  console.log ( fileName ); // => 'foo (3).txt'

  console.log ( fs.existsSync ( filePath ) ); // => true

}

example ();
```

## Related

- [get-unused-path](https://github.com/fabiospampinato/get-unused-path): Reliably get an unused path you can write to.
- [write-unused-path](https://github.com/fabiospampinato/write-unused-path): Reliably write to an unused path.
- [move-unused-path](https://github.com/fabiospampinato/move-unused-path): Reliably move to an unused path.

## License

MIT © Fabio Spampinato

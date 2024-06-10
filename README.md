# node-dl

[![Node.js CI](https://github.com/mborne/node-dl/actions/workflows/node.js.yml/badge.svg)](https://github.com/mborne/node-dl/actions/workflows/node.js.yml) [![Coverage Status](https://coveralls.io/repos/github/mborne/node-dl/badge.svg?branch=master)](https://coveralls.io/github/mborne/node-dl?branch=master)

Download file from a given `sourceUrl` to a `targetPath` with `wget`.

## Usage

```js
const download = require('@mborne/dl');

/*
 * Note that a temp file `{targetPath}.part` is created while downloading to handle download interuptions
 */
const targetPath = await download({
    sourceUrl: 'https://github.com/mborne.keys',
    targetPath: '/tmp/mborne.keys'
});
```

## Options

| Name               | Required? | Description                         | Default |
| ------------------ | :-------: | ----------------------------------- | :-----: |
| `sourceUrl`        |    YES    | Source URL (http, https, ftp)       |   NA    |
| `targetPath`       |    YES    | Input encoding (UTF-8, LATIN1,...)  |   NA    |
| `downloadIfExists` |    NO     | Download file if targetPath exists? | `true`  |
| `unsafeSsl`        |    NO     | Disable certificate checking        | `false` |

## License

[MIT](LICENSE)

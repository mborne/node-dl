# node-dl

[![Node.js CI](https://github.com/mborne/node-dl/actions/workflows/node.js.yml/badge.svg)](https://github.com/mborne/node-dl/actions/workflows/node.js.yml) [![Coverage Status](https://coveralls.io/repos/github/mborne/node-dl/badge.svg?branch=master)](https://coveralls.io/github/mborne/node-dl?branch=master)

## Description

Download file from a given `sourceUrl` to a `targetPath`.

Note that :

* It relies on `wget` to simplify FTP downloads
* A temp file `{targetPath}.part` is created while downloading to handle download interuptions

## Usage

```js
const download = require('@mborne/dl');

download({
    sourceUrl: 'https://github.com/mborne.keys',
    targetPath: '/tmp/mborne.keys'
}).then(function(targetPath){
    console.log(targetPath);
}).catch(function(err){
    console.log(err.message);
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

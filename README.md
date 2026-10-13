# node-dl

[![Node.js CI](https://github.com/mborne/node-dl/actions/workflows/node.js.yml/badge.svg)](https://github.com/mborne/node-dl/actions/workflows/node.js.yml) [![Coverage Status](https://coveralls.io/repos/github/mborne/node-dl/badge.svg?branch=master&kill_cache=1)](https://coveralls.io/github/mborne/node-dl?branch=master)

## Description

Download file from a given `sourceUrl` to a `targetPath` with `wget`.

> [!WARNING]
> This library is **not actively maintained**. It was used by a previous Node.js version of [mborne/postgis-integration](https://github.com/mborne/postgis-integration) which has been ported to Python (see [mborne/postgis-integration#18](https://github.com/mborne/postgis-integration/issues/18)).

## Requirements

* Node.js >= 18
* `wget`

## Usage

```js
import download from '@mborne/dl';

/*
 * Note that a temp file `{targetPath}.part` is created while downloading to handle download interruptions
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
| `targetPath`       |    YES    | Target file path                    |   NA    |
| `downloadIfExists` |    NO     | Download file if targetPath exists? | `true`  |
| `unsafeSsl`        |    NO     | Disable certificate checking        | `false` |

## Security

This library delegates download to `wget` (executed without shell) and is intended to be used with **trusted URLs and controlled target paths**:

- There is no size limit and no timeout.
- `unsafeSsl` disables certificate checking and should only be used for trusted hosts.

## License

[MIT](LICENSE)

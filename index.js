const debug = require('debug')('download');
const fs = require('fs');
const { exec } = require('child_process');

/**
 * Download file from a given sourceUrl to a targetPath
 *
 * Note that a {targetPath}.part is created while downloading and is renamed to {targetPath}
 * when download is complete.
 *
 * @param {Object} options
 * @param {String} options.sourceUrl
 * @param {String} options.targetPath
 * @param {Boolean} [options.downloadIfExists=true]
 * @param {Boolean} [options.unsafeSsl=false] disable certificate checking
 * @returns {Promise}
 */
function download(options) {
    if (typeof options.downloadIfExists === 'undefined') {
        options.downloadIfExists = true;
    }
    if (typeof options.unsafeSsl === 'undefined') {
        options.unsafeSsl = false;
    }

    debug('Downloading ' + options.sourceUrl + ' to ' + options.targetPath + ' ...');
    return new Promise(function (resolve, reject) {
        if ((!options.downloadIfExists) && fs.existsSync(options.targetPath)) {
            debug('File ' + options.targetPath + ' already exists');
            resolve(options.targetPath);
            return;
        }

        /* Prepare temp file to avoid problems on script interruption */
        var tempPath = options.targetPath + '.part';
        if (fs.existsSync(tempPath)) {
            fs.unlinkSync(tempPath);
        }

        /* Download to tempPath, rename and resolve when download is complete */
        let command = 'wget -nv ';
        if (options.unsafeSsl) {
            command += ' --no-check-certificate ';
        }
        command += `-O "${tempPath}" "${options.sourceUrl}"`;
        debug(command);
        exec(command, (error, stdout, stderr) => {
            if (error) {
                fs.unlinkSync(tempPath);
                reject("command fail : " + command);
            } else {
                fs.renameSync(tempPath, options.targetPath);
                resolve(options.targetPath);
            }
        });
    });
};

module.exports = download;

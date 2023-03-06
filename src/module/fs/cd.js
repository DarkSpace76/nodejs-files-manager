import path, { normalize, join } from 'node:path';
import { access } from 'node:fs/promises';
import { stat } from 'node:fs';

const changeDir = async (workingDir, pathToDir) => new Promise(async (res, rej) => {
    if (!pathToDir) res({ err: 'Invalid input', data: null });

    let fPath = path.isAbsolute(pathToDir) ? pathToDir : join(workingDir, pathToDir);

    stat(fPath, (err, stats) => {
        if (stats) {
            if (stats.isFile()) res({ err: 'Invalid input', data: null });
            if (stats.isDirectory()) res({ err: null, data: fPath });
        } else
            res({ err: 'Operation failed. \nThe system cannot find the specified path', data: null })
    });


})



export {
    changeDir
}
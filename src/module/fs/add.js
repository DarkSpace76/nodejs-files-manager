
import path, { join } from 'node:path';
import { writeFile } from 'node:fs';

const add = async (workingDir, fileName) => new Promise(async (res, rej) => {
    if (!fileName) return res({ err: `Invalid input.` });
    try {

        const fPath = path.isAbsolute(fileName) ? fileName : join(workingDir, fileName);

        writeFile(fPath, '', { flag: 'wx' }, (err) => {
            if (err) {
                res({ err: `Operation failed. \n ${err}` });
                return;
            }
            res({ err: null, data: `The file "${fileName}" has been created!` });
        });


    } catch (error) {
        res({ err: `Operation failed. \n ${error.message}` });
    }
}
);

export {
    add
}
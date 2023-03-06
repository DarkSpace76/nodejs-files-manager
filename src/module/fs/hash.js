import path, { join } from 'node:path';
import { createHash } from 'node:crypto';
import { readFile } from 'node:fs';

const calculateHash = async (workingDir, pathToFile) => new Promise(async (res, rej) => {
    if (!pathToFile) return res({ err: `Invalid input.` });
    try {

        const fPath = path.isAbsolute(pathToFile) ? pathToFile : join(workingDir, pathToFile);
        const hash = createHash('sha256');

        readFile(fPath, (err, data) => {
            if (err) {
                console.log('File read error');
                return;
            }
            res({ err: null, data: hash.update(data).digest('hex') });

        });

    } catch (error) {
        res({ err: `Operation failed. \n ${error.message}` });
    }
}
);

export {
    calculateHash
}
import { join, isAbsolute, basename, dirname } from 'node:path'
import zip from 'node:zlib';
import fs from 'node:fs';
import stream from 'node:stream';

const compress = async (workingDir, pathToFile) => new Promise(async (res, rej) => {
    if (!pathToFile) return res({ err: `Invalid input.` });

    try {
        const fPath = isAbsolute(pathToFile) ? pathToFile : join(workingDir, pathToFile);
        const fName = basename(fPath);
        const pathToGzip = join(dirname(fPath), fName + '.gz');

        const gzip = zip.createGzip();
        const source = fs.createReadStream(fPath);
        const dstn = fs.createWriteStream(pathToGzip);

        stream.pipeline(source, gzip, dstn, (err) => {
            if (err) {
                res({ err: `Operation failed. \n ${err}` });
                return;
            }
            res({ err: null, data: `File "${basename(fName)}" compressed` });
        });
    } catch (err) {
        res({ err: `Operation failed. \n ${err}` });

    }
}
);

export {
    compress
}
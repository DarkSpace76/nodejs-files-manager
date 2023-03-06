import { join, isAbsolute, dirname, basename, extname } from 'node:path'
import zip from 'node:zlib';
import { access } from 'node:fs/promises';
import fs from 'node:fs';
import stream from 'node:stream';

const decompress = async (workingDir, pathToFile, pathToDestination) => new Promise(async (res, rej) => {
    if (!pathToFile) return res({ err: `Invalid input.` });

    try {
        const fPath = isAbsolute(pathToFile) ? pathToFile : join(workingDir, pathToFile);
        let fPathDst;

        if (pathToDestination)
            fPathDst = isAbsolute(pathToDestination) ? pathToDestination : join(workingDir, pathToDestination);
        else
            fPathDst = join(dirname(fPath), basename(fPath, extname(fPath)));

        console.log(fPathDst);

        try {
            await access(fPathDst);
            res({ err: res({ err: `Operation failed. \nFile "${basename(fPathDst)}" already exists` }) })
        } catch {
            // console.log('file cannot accses');
        }


        const createReadStream = fs.createReadStream(fPath);
        const writeStream = fs.createWriteStream(fPathDst);
        const unzip = zip.createGunzip();

        stream.pipeline(createReadStream, unzip, writeStream, (err) => {
            if (err) {
                res({ err: `Operation failed. ${err}` })

                return;
            }
            res({ err: null, data: `File "${basename(fPath)}" decompressed` });
        })
    } catch (err) {
        res({ err: `Operation failed. ${err}` });
    }
});

export {
    decompress
}
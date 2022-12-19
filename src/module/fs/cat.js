import { createReadStream } from 'node:fs';
import path, { join } from 'node:path';

const cat = async (workingDir, pathToFile) => new Promise(async (res, rej) => {
    if (!pathToFile) return res({ err: `Invalid input.` });
    try {

        const fPath = path.isAbsolute(pathToFile) ? pathToFile : join(workingDir, pathToFile);

        const readStream = createReadStream(fPath, { encoding: 'utf-8' });
        process.stdout.write('\n\n');

        readStream.pipe(process.stdout);

        readStream.on('close', () => {
            process.stdout.write('\n\n');
            res({ err: null });
        })



    } catch (error) {
        res({ err: `Operation failed. \n ${error.message}` });
    }
}
);

export {
    cat
}
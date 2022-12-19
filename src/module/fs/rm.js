
import path, { join } from 'node:path';
import { unlink } from 'node:fs';

const rm = async (workingDir, fileName) => new Promise(async (res, rej) => {
    if (!fileName) return res({ err: `Invalid input.` });

    try {

        const fPath = path.isAbsolute(fileName) ? fileName : join(workingDir, fileName);

        unlink(fPath, (err) => {
            if (err) {
                res({ err: `Operation failed. \n ${err}` });
                return;
            }

            res({ err: null, data: `File "${path.parse(fPath).base}" deleted.` });
        });


    } catch (error) {
        res({ err: `Operation failed. \n ${error.message}` });
    }
}
);

export {
    rm
}

import path, { join } from 'node:path';
import { createReadStream, createWriteStream, stat } from 'node:fs';
import { rm } from './rm.js'

/**
     * @param srcFile исходный путь для копирования.
     * @param dstFile путь назначения для копирования.
     * @param remFlag Определяет будет ли удален файл после копирования или нет (по умолчанию false).
     */
const cp = async (workingDir, srcFile, dstFile, remFlag = false) => new Promise(async (res, rej) => {
    if (!srcFile || !dstFile) return res({ err: `Invalid input.` });
    try {

        const srcF = path.isAbsolute(srcFile) ? srcFile : join(workingDir, srcFile);
        let dstF = path.isAbsolute(dstFile) ? dstFile : join(workingDir, dstFile);

        if (!path.parse(dstF).ext)
            dstF = path.join(dstF, path.parse(srcF).base)
        /*       const newNameFile = path.join(path.dirname(dstF), `${path.basename(dstF)}-copy`, path.extname(dstF));
              console.log(newNameFile); */

        console.log(srcF);
        console.log(dstF);

        isExists(dstF).then(value => {

            if (value) {
                res({ err: `Operation failed.\n File with name "${path.parse(dstF).base}" already exists` });
                return;
            }


            const readStream = createReadStream(srcF, { encoding: 'utf-8' });
            let writeStream;

            readStream.on('error', async (err) => res({ err: `Operation failed.\n ${err}` }));
            readStream.on('open', async () => {
                writeStream = createWriteStream(dstF, { encoding: 'utf-8' });

                readStream.pipe(writeStream);
                writeStream.on('error', async (err) => res({ err: `Operation failed.\n ${err}` }));
                writeStream.on('finish', async () => {
                    if (remFlag === true) {
                        await rm(workingDir, srcF);
                    }
                    res({ err: null });
                });
            });

        });


    } catch (error) {
        res({ err: `Operation failed. \n ${error.message}` });
    }
}
);

const isExists = async (path) => new Promise(async (res, rej) => {
    stat(path, (err, stats) => {
        if (stats) {
            res(true)
        } else
            res(false)
    });
});

export {
    cp
}
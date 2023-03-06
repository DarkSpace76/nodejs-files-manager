
import path, { join } from 'node:path';
import { access, rename } from 'node:fs';

const rn = async (workingDir, fileOldName, fileNewName) => new Promise(async (res, rej) => {
    try {
        if (!fileOldName || !fileNewName) return res({ err: `Invalid Input.` });

        const oldName = path.isAbsolute(fileOldName) ? fileOldName : join(workingDir, fileOldName);
        const newName = path.isAbsolute(fileNewName) ? fileNewName : join(workingDir, fileNewName);


        access(newName, (err) => {
            if (err) {
                rename(oldName, newName, (err) => {
                    if (err) {
                        res({ err: `Operation failed. \n ${err}` });
                        return;
                    }
                    console.log('File renamed');
                    res({ err: null });
                });
                return;
            }
            res({ err: `Operation failed. \nA file with the same name already exists` });
        });



    } catch (error) {
        res({ err: `Operation failed. \n ${error.message}` });
    }
}
);

export {
    rn
}
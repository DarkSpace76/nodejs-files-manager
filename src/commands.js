import { getDir } from "./module/fs/ls.js";
import { changeDir } from "./module/fs/cd.js";
import { cat } from "./module/fs/cat.js";
import { add } from "./module/fs/add.js";
import { rn } from "./module/fs/rn.js";
import { rm } from "./module/fs/rm.js";
import { cp } from "./module/fs/cp.js";
import { mainOs } from "./module/os/main_os.js";
import { calculateHash } from "./module/fs/hash.js";
import { compress } from "./module/zip/compress.js";
import { decompress } from "./module/zip/decompress.js";
import { userName } from "./index.js";

import path from 'node:path'
import os from 'node:os';

let workingDir = os.homedir();

const parseCommand = async (command) => {
    if (!command) return;

    const params = comandDestruct(command);;

    switch (params[0]) {

        case 'up': await upDir(workingDir); break;

        case 'cd': await changeDir(workingDir, params[1]).then((value) => {
            if (value.data) {
                workingDir = value.data;
            } else {
                printMesssage(value);
            }
        }); break;

        case 'ls': await getDir(workingDir).then(value => {
            printMesssage(value);
        }); break;

        case 'cat':

            await cat(workingDir, params[1]).then(value => {
                printMesssage(value);
            });
            break;

        case 'add':
            await add(workingDir, params[1]).then(value => {
                printMesssage(value);

            });
            break;

        case 'rn':
            await rn(workingDir, params[1], params[2]).then(value => {
                printMesssage(value);
            });
            break;


        case 'cp':
            await cp(workingDir, params[1], params[2]).then(value => {
                printMesssage(value);
            });
            break;
        case 'mv':
            await cp(workingDir, params[1], params[2], true).then(value => {
                printMesssage(value);
            });
            break;

        case 'rm':
            await rm(workingDir, params[1]).then(value => {
                printMesssage(value);
            });
            break;

        case 'hash':
            await calculateHash(workingDir, params[1]).then(value => {
                printMesssage(value);
            });
            break;

        case 'os':
            await mainOs(params[1]).then(value => {
                printMesssage(value);
            });
            break;

        case 'compress':

            await compress(workingDir, params[1]).then(value => {
                printMesssage(value);
            });

            break;
        case 'decompress':
            await decompress(workingDir, params[1], params[2]).then(value => {
                printMesssage(value);
            });
            break;
        case '.exit': exitProcess(); break;

        default:
            console.log('Invalid input');
    }

    console.log(`\nYou are currently in ${workingDir}\n`);
}

const printWorkDir = () => console.log(`\nYou are currently in ${workingDir}\n`);

function printMesssage(value) {
    if (value.err) console.error(value.err);
    if (value.data) console.log(value.data);
}

const upDir = async () => {
    workingDir = path.join(workingDir, '..');
}

function comandDestruct(value) {
    const tmpCmdList = value.toString().split(new RegExp('(".*?")')).filter(Boolean);
    let resCmdList = [];
    tmpCmdList.forEach(e => {
        if (e.includes('"')) {
            resCmdList.push(e.replace(/["]/g, '').trim());
        } else {
            e.split(' ').filter(Boolean).forEach(el => {
                resCmdList.push(el);
            })

        }
    });
    return resCmdList;
}

const exitProcess = async () => {
    console.log(`\n\nThank you for using File Manager, ${userName}, goodbye!\n\n`);
    process.exit();
}

export {
    parseCommand,
    upDir,
    exitProcess,
    printWorkDir
}


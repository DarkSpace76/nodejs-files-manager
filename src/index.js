
import path, { resolve, dirname } from 'node:path'
import { exit } from 'node:process';
import { fileURLToPath } from 'node:url';
import { parseCommand, exitProcess, printWorkDir } from './commands.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
let userName;

const main = async () => {

    userName = parseUserName();
    process.stdout.write(`\n\nWelcome to the File Manager, ${userName}!\n\n`);
    printWorkDir();

    process.stdin.setEncoding('utf-8');
    process.stdin.on('data', data => {

        parseCommand(data.replace(/[\n\r]/g, ""));

    });

    process.on('SIGINT', () => {
        exitProcess();
    });



};

const parseUserName = () => {
    const argUserName = process.argv.find((e) => e.startsWith('--username'));

    if (argUserName) {
        return argUserName.substring(argUserName.indexOf('=') + 1, argUserName.length);
    } else
        return 'Anonymous';
}

export {
    exitProcess,
    userName
}

await main();


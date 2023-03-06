
import os from 'node:os';

const mainOs = async (command) => new Promise(async (res, rej) => {
    try {

        let paramm = await parseCommand(command);

        if (!paramm) res({ err: `Invalid input.` });

        switch (paramm) {
            case 'EOL':
                res({ err: null, data: JSON.stringify(os.EOL) });
                break;

            case 'cpus':
                let result = `Total CPUs: ${os.cpus().length}\n`;

                for (let index = 0; index < os.cpus().length; index++) {
                    const cpuInfo = os.cpus()[index];
                    result += `CPU ${index + 1}:   Model ${cpuInfo.model};   Clock Rate - ${(/*криво отображает инфу о чипах Apple М1*/  cpuInfo.speed / 1000).toFixed(1)} GHz\n`;
                }
                res({ err: null, data: result });
                break;

            case 'homedir':
                res({ err: null, data: os.homedir() });
                break;

            case 'username':
                res({ err: null, data: os.userInfo().username });
                break;

            case 'architecture':
                res({ err: null, data: os.arch() });
                break;
            default:
                res({ err: `Operation failed. \n Invalid Input.` });
                break;
        }

    } catch (error) {
        res({ err: `Operation failed. \n ${error.message}` });
    }
}
);

async function parseCommand(value) {
    const regex = new RegExp("^--(\\w.*)", 'gm')
    let match = regex.exec(value);

    return match ? match[1] : null;
}

export {
    mainOs
}
import path from 'path';

const fs = require('fs');

export function getAppRootDir() {
    let currentDir = __dirname
    while(!fs.existsSync(path.join(currentDir, '.gitignore'))) {
        currentDir = path.join(currentDir, '..')
    }
    return currentDir
}
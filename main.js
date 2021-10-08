const fs = require('fs');
const { spawn } = require('child_process')

let moduleList = ['modeuleMain', 'modeuleOne', 'modeuleTwo']
// , 'modeuleOne', 'modeuleTwo'
async function delayedLog(Callback) {
    await Callback()
}
async function startServer(moduleList) {

    let promiseAll = moduleList.map(folder => {
        const opts = {
            stdio: 'inherit', // 并入父进程,
            cwd: process.cwd() + '/' + folder
        }
        const ls = spawn('npm.cmd', ['run', 'dev'], opts);

    })


}
startServer(moduleList)

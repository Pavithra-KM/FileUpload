import express from 'express';
import path from 'path';
const port = 9598;
const app = express();
const __dirname = path.resolve();
import bodyParser from 'body-parser';
import './dbconnections.js';
import route from './routes.js';
import os from 'os';
import cron from 'node-cron';
import { exec } from 'child_process';

app.use(express.static(__dirname + '/public'));
app.use('/welcome', function(req, res) {
    res.sendFile(path.join(__dirname, '/public/index.html'));
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/', route);
let previousCpuInfo = os.cpus();

function getCPUUsage() {
    const currentCpuInfo = os.cpus();
    let idleDifference = 0, totalDifference = 0;

    for(let i = 0; i < currentCpuInfo.length; i++) {
        const oldCpu = previousCpuInfo[i];
        const newCpu = currentCpuInfo[i];

        const oldIdle = oldCpu.times.idle;
        const newIdle = newCpu.times.idle;

        const oldTotal = Object.values(oldCpu.times).reduce((acc, time) => acc + time, 0);
        const newTotal = Object.values(newCpu.times).reduce((acc, time) => acc + time, 0);
        idleDifference += newIdle - oldIdle;
        totalDifference += newTotal - oldTotal;
    }
    const cpuUsage = 1 - (idleDifference / totalDifference);
    previousCpuInfo = currentCpuInfo;
    return cpuUsage;
}

function restartServer() {
    exec('pm2 restart your-server-name', (err, stdout, stderr) => {
        if (err) {
            console.error(`Error restarting server: ${err}`);
            return;
        }
        // console.log(`Server restarted: ${stdout}`);
    });
}

cron.schedule('* * * * * *', () => { 
    const cpuUsage = getCPUUsage() * 100; 
    // console.log(`CPU Usage: ${cpuUsage.toFixed(2)}%`);

    if (cpuUsage > 70) {
        // console.log('CPU usage exceeded 70%. Restarting server...');
        restartServer();
    }
});

app.listen(port,() => {
    console.log('Server listening on port '+port);
});

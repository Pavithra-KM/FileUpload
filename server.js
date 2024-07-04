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

let previousCpuInformation = os.cpus();

function getCPUUsageInfo() {
    let currentCpuInformation = os.cpus();
    let idleDifference = 0;
    let totalDifference = 0;

    for(let i = 0; i < currentCpuInformation.length; i++) {
        let oldIdle = previousCpuInformation[i].times.idle;
        let newIdle = currentCpuInformation[i].times.idle;

        let oldTotal = Object.values(previousCpuInformation[i].times).reduce((acc, time) => acc + time, 0);
        let newTotal = Object.values(currentCpuInformation[i].times).reduce((acc, time) => acc + time, 0);
        idleDifference += newIdle - oldIdle;
        totalDifference += newTotal - oldTotal;
    }
    let cpu_usage = 1 - (idleDifference / totalDifference);
    previousCpuInformation = currentCpuInformation;
    return cpu_usage;
}

function restartTask2Server() {
    exec('pm2 restart task2', (err, stdout) => {
        if (err) {
            console.error('Error restarting server: ', err);
            return;
        }
        console.log('Server restarted: ', stdout);
    });
}

cron.schedule('* * * * * *', () => { 
    const cpu_usage = getCPUUsageInfo() * 100; 
    console.log('CPU Usage: ',cpu_usage.toFixed(2)+ "%");

    if (cpu_usage > 70) {
        console.log('CPU usage exceeded 70%. Restarting server...');
        restartTask2Server();
    }
});

app.listen(port,() => {
    console.log('Server listening on port '+port);
});

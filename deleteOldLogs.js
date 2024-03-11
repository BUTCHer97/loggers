const fs = require('fs');
const path = require('path');
const moment = require('moment');

const logsDirectory = path.join(__dirname, 'logs');

const deleteOldLogs = () => {
    const files = fs.readdirSync(logsDirectory);
    const oneWeekAgo = moment().subtract(1, 'weeks');

    files.forEach((file) => {
        const filePath = path.join(logsDirectory, file);
        const fileStat = fs.statSync(filePath);

        if (moment(fileStat.mtime) < oneWeekAgo) {
            fs.unlinkSync(filePath);
            console.log(`Deleted old log file: ${file}`);
        }
    });
};
deleteOldLogs();

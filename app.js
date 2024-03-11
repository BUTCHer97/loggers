const express = require('express');
const morgan = require('morgan');
const fs = require('fs');
const path = require('path');

const start = async () => {
    const app = express();

    app.use(morgan('dev'));

    app.use(express.json()); 

    app.post('/log', (req, res) => {
        const body = JSON.stringify(req.body);

        if (!body) {
            return res.status(400).json({ error: 'Body is required' });
        }

         const currentDate = new Date().toISOString().split('T')[0];
         const fileName = `${currentDate}.txt`;
         const filePath = path.join(__dirname, 'logs', fileName); 
 
         fs.appendFileSync(filePath, `Logged:${body}\n`);
        res.json({ status: 'success', message:body });
    });

    const PORT = process.env.PORT || 3000;

    app.listen(PORT, () => {
        console.log(`Logger API is running on port ${PORT}`);
    });
}

start();

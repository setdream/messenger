/* eslint-disable @typescript-eslint/no-var-requires */
const express = require('express');
const path = require('path');

const app = express();
const port = process.env.PORT || 3000;

const STATIC = path.resolve(__dirname, '..', 'dist');
const INDEX = path.resolve(STATIC, 'index.html');

app.use(express.static('dist'));

app.get('*', (req, res) => {
    res.sendFile(INDEX);
});

app.listen(port, () => {
    console.log(`Chat app listening at port: ${port}`);
});

import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
const app = express();

const port = process.env.PORT;
app.use(express.static('app'));

app.listen(port, () => {});
console.log(`Listening on port ${port}`);

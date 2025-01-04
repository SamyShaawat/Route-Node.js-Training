import express from 'express';
import bootstrap from './src/app.controller.js';
import cors from 'cors';

const port = 3000;
const app = express();

bootstrap(app, express, cors);

app.listen(port, () => {
    console.log(`listening on port ${port}`);

})

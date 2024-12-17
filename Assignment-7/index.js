import express from 'express';
import bootstrap from './src/app.controller.js';

const port = 3000;
const app = express();

bootstrap(app, express);
app.listen(port, () => {
    console.log(`listening on port ${port}`);

})
















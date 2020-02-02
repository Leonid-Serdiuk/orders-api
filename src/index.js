import express from 'express';
require('dotenv').config();

const port = process.env.PORT || 3000;

const app = express();

app.use(express.json());

import apiRoutes from './routes/api.routes';
app.use('/api', apiRoutes);

app.listen(port, () => console.log(`Server is listening on port ${port}.`));

process.on('uncaughtException', (err) => {
  console.error('Caught exception' + err, err);
});

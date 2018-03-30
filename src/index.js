/* eslint import/no-extraneous-dependencies: 0 */
import chalk from 'chalk';
import { createServer } from 'http';
import express from 'express';
import passport from 'passport';
import dotenv from 'dotenv';
import setMiddleware from './middleware';

dotenv.config();

const app = express();
setMiddleware(app);

const server = createServer(app);
let currentApp = app;

app.post('/login', (req, res) => {
  res.json({ message: 'it worked' });
});

server.listen(process.env.PORT, () => {
  // eslint-disable-next-line
  console.log(
    chalk.magentaBright(
      `App is listening on ${chalk.yellow(
        `http://localhost:${process.env.PORT}`
      )}`
    )
  );
});

if (module.hot) {
  module.hot.accept(['./index'], () => {
    server.removeListener('request', currentApp);
    server.on('request', app);
    currentApp = app;
  });
}

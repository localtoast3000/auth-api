#!/usr/bin/env node
import dotenv from 'dotenv';
dotenv.config({ path: '.env' });
import debug from 'debug';
debug('backend:server');
import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import logger from 'morgan';
import chalk from 'chalk';
import { tokensRouter } from '@/routes/exports';
import mongoDbConnector from '@/db/mongo_db_connector';
import './task-runners';

class ExpressApi {
  private app: express.Application;
  private PORT: string;

  constructor() {
    this.app = express();
    this.PORT = String(process.env.PORT) || '8000';
  }

  private database() {
    mongoDbConnector().catch((err) => console.log(err));
  }
  private middleware() {
    this.app.use(logger('dev'));
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: false }));
    this.app.use(helmet());
    this.app.use(cors());
  }

  private routes() {
    this.app.use('/tokens', tokensRouter);
  }

  public init() {
    this.database();
    this.middleware();
    this.routes();
    this.app.listen(this.PORT, () => {
      console.log(`
${chalk.cyanBright('SERVER LISTENING ON PORT:')} ${chalk.whiteBright(this.PORT)}
    `);
    });
  }
}

export default new ExpressApi().init();

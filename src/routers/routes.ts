import express from 'express';
import {resolve} from 'node:path';
import { Router, Response, NextFunction } from 'express';
import UsersRouter from './users.routes';
import groupsPagesRouter from './groups.routes';
import pagesRouter from './pages.routes';
import ArticlesRouter from './articles.routes';
import IndicatorsRouter from './indicators.routes';
import AdmsRouter from './adms.routes';

const routes = Router();
routes.get('/', 
  (_, response: Response, next: NextFunction) => { 
    response.json({message: 'aplicativo funcionando 🌸'});
    next();
  },
  () => {
    const report: any = {message: "page created"};
    return console.log(report);
  }
); 

routes.use('/adms', AdmsRouter);
routes.use('/indicators', IndicatorsRouter);
routes.use('/articles', ArticlesRouter);
routes.use('/groups', groupsPagesRouter);
routes.use('/pages', pagesRouter);
routes.use('/users', UsersRouter);
routes.use('/images', express.static(resolve(__dirname, '..', 'uploads', 'images', 'pages')));

export default routes;
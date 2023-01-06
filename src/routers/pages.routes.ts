import { Router } from 'express';
import Pages, { create, isonline, remove, store, update, search, item } from '../controllers/Pages';
import { middlewareCreate, middlewareStore } from '../middlewares/Pages';

const pagesRouter = Router();

pagesRouter.get('/', Pages);

pagesRouter.post('/store', store,  middlewareStore);
pagesRouter.post('/search', search);
pagesRouter.post('/item', item);
pagesRouter.put('/update', update);
pagesRouter.post('/create', create, middlewareCreate);
pagesRouter.post('/isonline', isonline);
pagesRouter.delete('/remove', remove);

export default pagesRouter;

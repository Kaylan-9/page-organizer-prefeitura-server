import { Router } from 'express';
import Articles, { create, remove, store, update, text, store_n } from '../controllers/Articles';

const ArticlesRouter = Router();

ArticlesRouter.get('/', Articles);
ArticlesRouter.get('/content/:_id', text);
ArticlesRouter.post('/store', store_n);
ArticlesRouter.get('/store', store);
ArticlesRouter.put('/update', update);
ArticlesRouter.post('/create', create);
ArticlesRouter.delete('/remove', remove);

export default ArticlesRouter;
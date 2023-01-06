import { Router } from 'express';
import GroupsPages, { create, pages, pages_all, remove, search, store, update } from '../controllers/GroupsPages';

const groupsPagesRouter = Router();

groupsPagesRouter.get('/', GroupsPages);

groupsPagesRouter.get('/store', store);
groupsPagesRouter.post('/pages/all', pages_all);
groupsPagesRouter.post('/search', search);
groupsPagesRouter.post('/pages', pages);
groupsPagesRouter.put('/update', update);
groupsPagesRouter.post('/create', create);
groupsPagesRouter.delete('/remove', remove);

export default groupsPagesRouter;
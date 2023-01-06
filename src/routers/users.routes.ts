import { Router } from 'express';
import Users, { create, remove, store, update, pages, page_remove, page_add, view_add, page_exist, appointments } from '../controllers/Users';
import { middlewareCreate, middlewareStore } from '../middlewares/Users';

const UsersRouter = Router();

UsersRouter.get('/', Users);

UsersRouter.post('/store', store,  middlewareStore);
UsersRouter.post('/appointments', appointments);
UsersRouter.post('/pages', pages);
UsersRouter.put('/update', update);
UsersRouter.post('/create', create, middlewareCreate);
UsersRouter.delete('/remove', remove);
UsersRouter.delete('/markoff', page_remove);
UsersRouter.post('/ismarked', page_exist);
UsersRouter.post('/view', view_add);
UsersRouter.post('/mark', page_add);

export default UsersRouter;

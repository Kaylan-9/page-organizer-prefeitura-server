import { Router } from 'express';
import { login } from '../controllers/Adms';


const AdmsRouter = Router();

AdmsRouter.post('/login', login);

export default AdmsRouter;
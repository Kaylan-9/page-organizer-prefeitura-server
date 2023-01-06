import { Router } from 'express';
import { least_visited_infos, least_visited_pages, users } from '../controllers/Indicators';


const IndicatorsRouter = Router();

IndicatorsRouter.get('/pages', least_visited_pages);
IndicatorsRouter.get('/infos', least_visited_infos);
IndicatorsRouter.get('/users', users);

export default IndicatorsRouter;

import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import routes from './routers/routes';

const app = express();
app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cors({origin: '*'}));
app.use(routes);

app.listen(3666, () => 'server running in 3666 ☕');
import express, { Request, Response } from 'express';

import images from '../images/images.router';

const routes = express.Router();

routes.get('/', (req: Request, res: Response): void => {
  res.send('Main APIs router');
});

routes.use('/api/images', images);

export default routes;

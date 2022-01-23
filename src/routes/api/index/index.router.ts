import express from 'express';

import images from '../images/images.router';

const routes = express.Router();

routes.get('/api', (req, res) => {
  res.send('Main APIs router');
});

routes.use('/api/images', images);

export default routes;

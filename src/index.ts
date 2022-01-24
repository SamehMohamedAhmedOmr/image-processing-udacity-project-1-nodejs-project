import express from 'express';

import routes from './routes/api/index/index.router';

const app = express();
const port = 3000;

app.use('/', routes);

app.listen(port, () => {
  console.log(`Server is working on post ${port}`);
});

export default app;

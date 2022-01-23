import express from "express";

import routes from "./routes/api/index/index.router";

const server = express();
const port = 3000;

server.use("/", routes);

server.listen(port, () => {
  console.log(`Server is working on post ${port}`);
});

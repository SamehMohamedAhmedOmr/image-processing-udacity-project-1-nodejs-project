import express from "express";

import routes from "./routes/api/index/index.router";

const index = express();
const port = 3000;

index.use("/", routes);

index.listen(port, () => {
  console.log(`Server is working on post ${port}`);
});

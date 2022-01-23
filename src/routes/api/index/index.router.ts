import express from "express";

import teachers from '../teachers/teachers.router'
import students from '../students/students.router'

const routes = express.Router();

routes.get("/", (req, res) => {
  res.send('Main APIs router');
});

routes.use('/teachers', teachers);
routes.use('/students', students);

export default routes;

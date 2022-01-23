import express from "express";

const students = express.Router();

students.get("/", (req, res) => {
  res.send("Student API");
});

export default students;

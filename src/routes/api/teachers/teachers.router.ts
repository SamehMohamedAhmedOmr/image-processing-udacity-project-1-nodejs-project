import express from "express";

const teachers = express.Router();

teachers.get("/", (req, res) => {
  res.send("Teacher API 2");
});

export default teachers;

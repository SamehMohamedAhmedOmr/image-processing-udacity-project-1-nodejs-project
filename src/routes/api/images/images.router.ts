import express from "express";
import ImageService from '../../../services/image.service'
import ResponseData from "../../../services/response.interface";

const images = express.Router();

images.get("/", async (req, res) => {
  let image_service:ImageService = new ImageService();

  let response:ResponseData =  await image_service.imageProcessing(req);
  if (response.code == 404) {
    res.send(response.message);
  }
  else {
    if (response.path){
      res.sendFile(response.path);
    }
    else{
      res.send(response.message);
    }
  }

});

export default images;

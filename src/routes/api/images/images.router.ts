import express, {Request, Response} from 'express';
import ResponseData from '../../../services/response.interface';
import ImageService from '../../../services/image.service';

const images = express.Router();

images.get('/', async (req:Request, res:Response): Promise<number> => {
  let image_service: ImageService = new ImageService();

  const query_params = req.query;
  let response: ResponseData = await image_service.imageProcessing(
    <string>query_params?.image,
    <string>query_params?.width,
    <string>query_params?.height
  );

  if (response.code == 404) {
    res.send(response.message);
  } else {
    if (response.path) {
      res.sendFile(response.path);
    } else {
      res.send(response.message);
    }
  }

  return response.code;
});

export default images;

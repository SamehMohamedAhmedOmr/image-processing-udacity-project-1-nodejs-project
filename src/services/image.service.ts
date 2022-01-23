import ResponseData from './response.interface';
import sharp from 'sharp';
import file_system from 'fs';
import path from 'path';
import { promises as fs } from 'fs';

export class ImageService {
  constructor() {}

  public async imageProcessing(
    image: string,
    width_params: string,
    height_params: string
  ): Promise<ResponseData> {
    let absolute_path = 'src/assets/images/';

    let message: string = '';
    let code = 200;

    let width: number = parseInt(width_params);
    let height: number = parseInt(height_params);

    if (image && width && height) {
      let image_object = image.split('.');
      let path_image = absolute_path + image;

      if (image_object.length < 2 || !file_system.existsSync(path_image)) {
        message = 'Image Not found, please enter valid image';
        code = 404;
        return this.responseShape(message, code);
      }

      if (width < 1 || height < 1 || isNaN(width) || isNaN(height)) {
        message = 'Please Enter Valid Width and Height';
        code = 404;
        return this.responseShape(message, code);
      }

      let target_path_image =
        absolute_path +
        'thumb/' +
        image_object[0] +
        '-' +
        width +
        '-' +
        height +
        '.' +
        image_object[1];

      if (file_system.existsSync(target_path_image)) {
        return this.responseShape(
          message,
          200,
          path.resolve(target_path_image)
        );
      } else {
        try {
          if (!file_system.existsSync(absolute_path + 'thumb')) {
            await fs.mkdir(absolute_path + 'thumb');
          }
          await sharp(path_image)
            .resize(width, height)
            .jpeg({ mozjpeg: true })
            .toFile(target_path_image)
            .catch((err) => {
              message = 'Something went wrong';
              code = 404;
              return this.responseShape(message, code);
            });
          return this.responseShape(
            message,
            200,
            path.resolve(target_path_image)
          );
        } catch (err) {
          message = 'Something went wrong';
          code = 404;
          return this.responseShape(message, code);
        }
      }
    } else {
      message = 'Image Not found, please enter valid image';
      code = 404;
    }
    return this.responseShape(message, code);
  }

  private responseShape(
    message: string,
    code: number,
    path: string = ''
  ): ResponseData {
    return {
      message: message,
      code: code,
      path: path,
    };
  }
}

export default ImageService;

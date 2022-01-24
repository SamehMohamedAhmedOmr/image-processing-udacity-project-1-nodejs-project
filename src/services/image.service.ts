import ResponseData from './response.interface';
import sharp from 'sharp';
import file_system from 'fs';
import path from 'path';
import { promises as fs } from 'fs';

export class ImageService {
  public async imageProcessing(
    image: string,
    width_params: string,
    height_params: string
  ): Promise<ResponseData> {
    const image_folder_path = 'src/assets/images/';

    let message = '';
    let code = 200;

    const width: number = parseInt(width_params);
    const height: number = parseInt(height_params);

    if (image && width && height) {
      const image_object = image.split('.');
      const path_image = image_folder_path + image;

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

      const target_path_image =
        image_folder_path +
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
          if (!file_system.existsSync(image_folder_path + 'thumb')) {
            await fs.mkdir(image_folder_path + 'thumb');
          }
          await sharp(path_image)
            .resize(width, height)
            .jpeg({ mozjpeg: true })
            .toFile(target_path_image);

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
    path = ''
  ): ResponseData {
    return {
      message: message,
      code: code,
      path: path,
    };
  }
}

export default ImageService;

import {Request} from "express";
import ResponseData from "./response.interface";
import sharp from 'sharp';
import file_system from 'fs';
import path from 'path';

export class ImageService {

    constructor() {
    }

    public async imageProcessing(req: Request): Promise<ResponseData> {
        let absolute_path = 'src/assets/images/';

        let message: string = 'TEST';
        let code = 200;
        let query_params = req.query

        if (query_params?.image && query_params?.width && query_params?.height) {

            let target_image = <string>query_params.image;
            let image_object = target_image.split('.');
            let path_image = absolute_path + target_image;

            if (image_object.length < 2 || !file_system.existsSync(path_image)) {
                message = "Image Not found, please enter valid image";
                code = 404;
                return this.responseShape(message, code);
            }

            let width = parseInt(<string>query_params.width);
            let height = parseInt(<string>query_params.height);

            if (width < 1 || height < 1 || isNaN(width) || isNaN(height)) {
                message = "Please Enter Valid Width and Height";
                code = 404;
                return this.responseShape(message, code);
            }

            let target_path_image = absolute_path + 'thumb/' + image_object[0] + '-' + width + '-' + height + '.' + image_object[1];

            if (file_system.existsSync(target_path_image)) {
                return this.responseShape(message, 200, path.resolve(target_path_image));
            } else {
                try{
                    const sharp_image = await sharp(path_image)
                        .resize(width, height)
                        .jpeg({ mozjpeg: true })
                        .toFile(target_path_image)
                        .catch( err => {
                            message = "Something went wrong";
                            code = 404;
                            return this.responseShape(message, code);
                        });
                    return this.responseShape(message, 200, path.resolve(target_path_image));
                }
                catch (err){
                    message = "Something went wrong";
                    code = 404;
                    return this.responseShape(message, code);
                }
            }
        } else {
            message = "Image Not found, please enter valid image";
            code = 404;
        }
        return this.responseShape(message, code);
    }

    private responseShape(message: string, code: number, path: string = ''): ResponseData {
        return {
            message: message,
            code: code,
            path: path
        }
    }

}

export default ImageService;

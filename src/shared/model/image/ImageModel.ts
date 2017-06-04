import { UserModel } from '../user/UserModel';
import { ModelState } from '../ModelState';

export const getImageDestination = (img: ImageModel) => img.baseDir + img.relativePath;

export const getImageFileName = (img: ImageModel): string => {
    const extension = img.image.mime.split('/')[1];
    return `${img.fileName}.${extension}`;
};


export class ImageModel {
    public image: any;
    public baseDir: string;
    public relativePath: string;
    public fileName: string;
}

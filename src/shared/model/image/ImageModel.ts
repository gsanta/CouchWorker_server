import { UserModel } from '../user/UserModel';
import { ModelState } from '../ModelState';

export const getImageDestination = (img: ImageModel) => img.baseDir + img.relativePath;

export const getImageFileName = (image: File, fileName: string): string => {
    const extension = (<any> image).mime.split('/')[1];
    return `${fileName}.${extension}`;
};


export class ImageModel {
    public image: any;
    public baseDir: string;
    public relativePath: string;
    public fileName: string;
    public src: string;
}

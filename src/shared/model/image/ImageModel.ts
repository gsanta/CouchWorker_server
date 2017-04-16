import { UserModel } from '../user/UserModel';

export class ImageModel {
    private image: any;
    private destination: string;
    private baseDir: string;
    private relativePath: string;
    private fileName: string;

    constructor(image: any, baseDir: string, relativePath: string, fileName: string) {
        this.image = image;
        this.baseDir = baseDir;
        this.relativePath = relativePath;
        this.fileName = fileName;
    }

    public getImage(): any {
        return this.image;
    }

    public getDestination(): string {
        return this.baseDir + this.relativePath;
    }

    public getFileName(): string {
        const extension = this.image.mime.split('/')[1];
        return `${this.fileName}.${extension}`;
    }
}
import { UserModel } from '../user/UserModel';

export class ImageModel {
    private image: any;
    private destination: string;
    private fileName: string;

    private user: UserModel;

    private baseDir: string;

    constructor(image: any, baseDir: string, user: UserModel) {
        this.image = image;
        this.user = user;
        this.baseDir = baseDir;
    }

    public getImage(): any {
        return this.image;
    }

    public getDestination(): string {
        if (!this.user.getUuid()) {
            throw new Error('User uuid not defined');
        }

        return this.baseDir + '/img/' + this.user.getUuid() + '/profile';
    }

    public getFileName(): string {
        const extension = this.image.mime.split('/')[1];
        return `profile.${extension}`;
    }
}
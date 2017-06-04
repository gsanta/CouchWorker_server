import { ImageModel, getImageDestination, getImageFileName } from '../../../shared/model/image/ImageModel';
import * as fs from 'mz/fs';
import * as mkdirp from 'mkdirp';

console.log('helo2')

function createDir(dirName: string): Promise<any> {
    return new Promise((resolve, reject) => {
        mkdirp(dirName, function (err) {
            if (err) {
                reject(err);
            } else {
                resolve(true);
            }
        });
    });
}

function saveFile(image: ImageModel): Promise<any> {
    return new Promise((resolve, reject) => {
        const fstream = fs.createWriteStream(getImageDestination(image) + getImageFileName(image));
        image.image.pipe(fstream);
        fstream.on('close', () => {
            resolve(true);
        });
        // TODO: error handling
    });
}

export class ImageRepository {
    public create(image: ImageModel): Promise<any> {
        return fs.exists(getImageDestination(image))
            .then(exists => {
                if (!exists) {
                    return createDir(getImageDestination(image));
                }
            })
            .then(() => {
                saveFile(image);
            });

    }
}
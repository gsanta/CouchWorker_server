import { ImageModel } from '../../../shared/model/image/ImageModel';
import * as fs from 'mz/fs';
import * as mkdirp from 'mkdirp';

function createDir(dirName: string): Promise<any> {
    return new Promise((resolve, reject) => {
        mkdirp(dirName, function (err) {
            if (err) {
                reject(err)
            } else {
                resolve(true);
            }
        });
    })
}

function saveFile(image: ImageModel): Promise<any> {
    return new Promise((resolve, reject) => {
        const fstream = fs.createWriteStream(image.getDestination() + image.getFileName());
        image.getImage().pipe(fstream);
        fstream.on('close', () => {
            resolve(true);
        });
        // TODO: error handling
    });
}

export class ImageBusiness {

    public create(image: ImageModel): Promise<any> {
        return fs.exists(image.getDestination())
            .then(exists => {
                if (!exists) {
                    return createDir(image.getDestination());
                }
            })
            .then(() => {
                saveFile(image);
            });

    }
}
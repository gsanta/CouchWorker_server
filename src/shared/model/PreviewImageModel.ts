import { ImageSrc } from './ImageSrc';

export interface PreviewImageModel extends ImageSrc {
    file: File;
    src: string;
}

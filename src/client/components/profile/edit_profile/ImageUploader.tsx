import * as React from 'react';
import * as Dropzone from 'react-dropzone';
import { Thumbnail, Button } from 'react-bootstrap';
import { ImageSrc } from '../../../../shared/model/ImageSrc';

export function ImageUploader(props: ImageUploaderProps) {
    function onDrop(files: File[]) {
        const images = files.map(file => ({file: file, src: (file as any).preview}));
        props.onAddImages(images );
    }

    function renderImages() {
        return props.images.map(image => {
            return (
                <Thumbnail src={image.src}>
                    <Button bsStyle="danger" onClick={() => props.onDeleteImage(image)}>Delete</Button>
                </Thumbnail>
            );
        });
    }

    return (
        <div>
            <Dropzone onDrop={onDrop}>
                <p>Try dropping some files here, or click to select files to upload.</p>
            </Dropzone>
            {renderImages()}
        </div>
    );
}

export interface ImageUploaderProps {
    onDeleteImage(imageSrc: ImageSrc): void;
    onAddImages(imageSrc: ImageSrc[]): void;
    images: ImageSrc[];
}
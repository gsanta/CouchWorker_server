
import * as React from 'react';
import * as Lightbox from 'react-images';


export class ImageGallery extends React.Component<ImageGalleryProps, ImageGalleryState> {

    constructor(props: ImageGalleryProps) {
        super();

        this.state = {
            currentImage: 0
        };
    }

    public render() {
        return (
            <Lightbox
                images={this.props.images}
                isOpen={this.props.images.length > 0}
                onClickNext={this.onClickNext.bind(this)}
                onClickPrev={this.onClickPrev.bind(this)}
                onClose={this.props.onClose}
                currentImage={this.state.currentImage}
            />
        );
    }

    private onClickNext() {
        if (this.props.images.length === 0) {
            return;
        }

        let currentImage = 0;
        if (this.state.currentImage < this.props.images.length) {
            currentImage = this.state.currentImage + 1;
        }

        this.setState({
            currentImage
        });
    }

    private onClickPrev() {
        if (this.props.images.length === 0) {
            return;
        }

        let currentImage = this.props.images.length - 1;
        if (this.state.currentImage > 0) {
            currentImage = this.state.currentImage - 1;
        }

        this.setState({
            currentImage
        });
    }
}

export interface ImageGalleryProps {
    images: {src: string}[];
    onClose(): void;
}

export interface ImageGalleryState {
    currentImage: number;
}

import * as React from 'react';
require('./ImageHover.scss');

export class ImageHover extends React.Component<ImageHoverProps, ImageHoverState> {

    constructor(props: ImageHoverProps) {
        super(props);

        this.onMouseOver = this.onMouseOver.bind(this);
        this.onMouseOut = this.onMouseOut.bind(this);
        this.state = {
            isHover: false
        };
    }

    public render() {
        const displayOverlay = this.state.isHover ? 'block' : 'none';
        return (
            <div
                className="cw-image-hover"
                style={{ position: 'relative'}}
                onMouseOver={this.onMouseOver}
                onMouseOut={this.onMouseOut}
            >
                <img style={{width: '100%'}} src={this.props.src}/>
                <div style={{display : displayOverlay}} className="cw-overlay">
                    Text
                </div>
                <div className="cw-overlay-content">
                    <span className="glyphicon glyphicon-trash cw-trash-icon" aria-hidden="true"></span>
                </div>
            </div>
        );
    }

    private onMouseOver() {
        this.setState({
            isHover: true
        });
    }

    private onMouseOut() {
        this.setState({
            isHover: false
        });
    }
}

export interface ImageHoverProps {
    src: string;
    onDelete(): void;
}

export interface ImageHoverState {
    isHover: boolean;
}

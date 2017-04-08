import * as React from 'react';
var Rating = require('react-rating');

export function StarRatingWrapper(props: StarRatingWrapperProps) {
    return (
        <Rating
            initialRate={props.rate}
            readonly={true}
            empty='glyphicon glyphicon-star-empty'
            full='glyphicon glyphicon-star'
        />
    )
}

export interface StarRatingWrapperProps {
    rate: number;
}
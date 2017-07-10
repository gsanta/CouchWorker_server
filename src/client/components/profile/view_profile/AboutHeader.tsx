import * as React from 'react';

export function AboutHeader(props: AboutHeaderProps) {
    return (
        <div className="cw-profile-header">
            <div>About</div>
            <div onClick={props.editAboutInfo} className="cw-action-link">Edit</div>
        </div>
    );
}

export interface AboutHeaderProps {
    editAboutInfo: () => void;
// tslint:disable-next-line:eofline
}

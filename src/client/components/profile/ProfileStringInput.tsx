import * as React from 'react'; 
import { FormGroup, ControlLabel, FormControl, HelpBlock } from 'react-bootstrap';

export function ProfileStringInput(props: ProfileStringInput) {
    return (
        <FormGroup
                controlId={props.controlId}
                validationState={props.validationState}
            >
            <ControlLabel>{props.controlLabel}</ControlLabel>
            <FormControl
                type='text'
                value={props.value}
                placeholder={props.placeHolder}
                onChange={() => null}
            />
            <FormControl.Feedback />
            <HelpBlock>{props.helpBlock}</HelpBlock>
        </FormGroup>
    )
}

export interface ProfileStringInput {
    value: string;
    onChange: (value: string) => void;
    validationState: 'success' | 'warning' | 'error';
    controlId: string;
    placeHolder: string;
    controlLabel: string;
    helpBlock: string; 
}
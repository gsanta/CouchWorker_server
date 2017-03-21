import * as React from 'react'; 
import { FormGroup, ControlLabel, FormControl, HelpBlock } from 'react-bootstrap';

export function ProfileStringInput(props: ProfileStringInputProps) {
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
                onChange={props.onChange}
            />
            <FormControl.Feedback />
            <HelpBlock>{props.helpBlock}</HelpBlock>
        </FormGroup>
    )
}

export interface ProfileStringInputProps {
    value: string;
    onChange: (event: React.ChangeEvent<any>) => void;
    validationState: 'success' | 'warning' | 'error';
    controlId: string;
    placeHolder: string;
    controlLabel: string;
    helpBlock: string; 
}
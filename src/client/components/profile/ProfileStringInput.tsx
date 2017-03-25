import * as React from 'react'; 
import { FormGroup, ControlLabel, FormControl, HelpBlock } from 'react-bootstrap';

function getValidationState(isValid: boolean): "error" | null {
    return isValid ? null: 'error';
}

export function ProfileStringInput(props: ProfileStringInputProps) {
    let error = null;

    if (props.error) {
        error = <HelpBlock>{props.error}</HelpBlock>
    }

    return (
        <FormGroup
                controlId={props.controlId}
                validationState={getValidationState(!props.error)}
            >
            <ControlLabel>{props.controlLabel}</ControlLabel>
            <FormControl
                type='text'
                value={props.value}
                placeholder={props.placeHolder}
                onChange={props.onChange}
            />
            <FormControl.Feedback />
            {error}
        </FormGroup>
    )
}

export interface ProfileStringInputProps {
    value: string;
    onChange: (event: React.ChangeEvent<any>) => void;
    controlId: string;
    placeHolder: string;
    controlLabel: string;
    error: string;
}
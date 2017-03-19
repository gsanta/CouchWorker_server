import * as React from 'react'; 
import { FormGroup, ControlLabel, FormControl, HelpBlock } from 'react-bootstrap';

export function ProfileName(props: {name: string}) {
    return (
        <FormGroup
                controlId='cw-form-profile-name'
                validationState={'success'}
            >
            <ControlLabel>Working example with validation</ControlLabel>
            <FormControl
                type='text'
                value={props.name}
                placeholder='Enter text'
                onChange={() => null}
            />
            <FormControl.Feedback />
            <HelpBlock>Validation is based on string length.</HelpBlock>
        </FormGroup>
    )

}
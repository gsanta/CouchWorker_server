
import * as DatePicker from 'react-bootstrap-date-picker';
import * as React from 'react';
import { FormGroup, ControlLabel, HelpBlock } from 'react-bootstrap';

export class ProfileBirthDate extends React.Component<ProfileBirthDateProps, null> {
    public componentDidUpdate() {
        // Access ISO String and formatted values from the DOM.
        var hiddenInputElement = document.getElementsByClassName('cw-profile-birth-date-datepicker')[0] as HTMLInputElement;
    }

    public render() {
        return (
            <FormGroup>
                <ControlLabel>Label</ControlLabel>
                <DatePicker 
                    className='cw-profile-birth-date-datepicker'
                    value={this.props.date.toISOString()}
                    onChange={this.props.onChange}
                />
                <HelpBlock>Help</HelpBlock>
            </FormGroup>
        )
    }
}

export interface ProfileBirthDateProps {
    date: Date;
    onChange: (isoString: string) => void;
}
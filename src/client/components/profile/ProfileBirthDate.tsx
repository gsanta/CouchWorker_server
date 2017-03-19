
import * as DatePicker from 'react-bootstrap-date-picker';
import * as React from 'react';
import { FormGroup, ControlLabel, HelpBlock } from 'react-bootstrap';

export class ProfileBirthDate extends React.Component<ProfileBirthDateProps, null> {
    public componentDidUpdate() {
        // Access ISO String and formatted values from the DOM.
        var hiddenInputElement = document.getElementsByClassName('cw-profile-birth-date-datepicker')[0] as HTMLInputElement;
        console.log(hiddenInputElement.value); // ISO String, ex: "2016-11-19T12:00:00.000Z"
        console.log(hiddenInputElement.getAttribute('data-formattedvalue')) // Formatted String, ex: "11/19/2016"
    }

    public render() {
        return (
            <FormGroup>
                <ControlLabel>Label</ControlLabel>
                <DatePicker 
                    className='cw-profile-birth-date-datepicker'
                    value={this.props.date.toISOString()}
                    onChange={this.onChange.bind(this)}
                />
                <HelpBlock>Help</HelpBlock>
            </FormGroup>
        )
    }

    onChange(value, formattedValue) {
        this.setState({
            value: value, // ISO String, ex: "2016-11-19T12:00:00.000Z"
            formattedValue: formattedValue // Formatted String, ex: "11/19/2016"
        });
    }
}

export interface ProfileBirthDateProps {
    date: Date;
}
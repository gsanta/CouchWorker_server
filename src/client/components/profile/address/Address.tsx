import * as React from 'react';
import { StringInput } from '../../form/StringInput';
import { AddressModel } from '../../../../shared/model/AddressModel';

export class Address extends React.Component<AddressProps, any> {
    constructor(props: AddressProps) {
        super();

        const address = props.address || new AddressModel();
        this.state = {
            address
        };
    }

    public componentWillReceiveProps(newProps: AddressProps) {
        this.setState({
            user: newProps.address || new AddressModel()
        });
    }

    public render() {
        return (
            <div>
                <StringInput
                    value={this.props.address.country}
                    onChange={this.onCountryChange.bind(this)}
                    controlId="cw-form-profile-country"
                    placeHolder="Enter country"
                    controlLabel="Country"
                    error={null}
                />
                <StringInput
                    value={this.props.address.city}
                    onChange={this.onCityChange.bind(this)}
                    controlId="cw-form-profile-city"
                    placeHolder="Enter city"
                    controlLabel="City"
                    error={null}
                />
                <StringInput
                    value={this.props.address.street}
                    onChange={this.onStreetChange.bind(this)}
                    controlId="cw-form-profile-street"
                    placeHolder="Enter city"
                    controlLabel="City"
                    error={null}
                />
                <StringInput
                    value={this.props.address.house}
                    onChange={this.onHouseChange.bind(this)}
                    controlId="cw-form-profile-house"
                    placeHolder="Enter house"
                    controlLabel="House"
                    error={null}
                />
            </div>
        );
    }

    private onCountryChange(event: React.ChangeEvent<any>) {
        // const user = this.state.user.setAddresses(
        //     [this.state.user.addresses()[0].setCountry(event.target.value)]
        // );
        // this.setState({
        //     user
        // });
    }

    private onCityChange(event: React.ChangeEvent<any>) {
        // const user = this.state.user.setAddresses(
        //     [this.state.user.addresses()[0].setCity(event.target.value)]
        // );
        // this.setState({
        //     user
        // });
    }

    private onStreetChange(event: React.ChangeEvent<any>) {
        // const user = this.state.user.setAddresses(
        //     [this.state.user.addresses()[0].setCity(event.target.value)]
        // );
        // this.setState({
        //     user
        // });
    }

    private onHouseChange(event: React.ChangeEvent<any>) {

    }
}

export interface AddressProps {
    address: AddressModel;
}

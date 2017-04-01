import { UserModel } from '../../../domain/user/UserModel';
import { ProfileValidationModel } from './ProfileValidationModel';
import { ValidationError } from '../form/validation/ValidationError';
import { Optional } from '../form/validation/Optional';
import { validateEmail } from '../form/validation/validateEmail';
import { ValidatorFunc } from '../form/validation/ValidatorFunc';

type setFirstNameValidationError = {setFirstNameValidationError: (error: string) => void};  
export class FirstNameValidationError<T extends setFirstNameValidationError> extends ValidationError<T> {
    constructor(errorMessage: string) {
        super(errorMessage);
    }

    public setError(errorHolder: T): void {
        errorHolder.setFirstNameValidationError(this.errorMessage);
    }
}

type setLastNameValidationError = {setLastNameValidationError: (error: string) => void};  
export class LastNameValidationError<T extends setLastNameValidationError> extends ValidationError<T> {
    constructor(errorMessage: string) {
        super(errorMessage);
    }

    public setError(errorHolder: T): void {
        errorHolder.setLastNameValidationError(this.errorMessage);
    }
}

export function validateFirstName(userModel: UserModel): Optional<FirstNameValidationError<ProfileValidationModel>> {
    let validationError: FirstNameValidationError<ProfileValidationModel> = null; 
    if (!userModel.getFirstName() || userModel.getFirstName().length === 0) {
        validationError = new FirstNameValidationError<ProfileValidationModel>('First name is required.');
    }
    
    return new Optional<FirstNameValidationError<ProfileValidationModel>>(validationError);
}

export function validateLastName(userModel: UserModel): Optional<LastNameValidationError<ProfileValidationModel>> {
    let validationError: LastNameValidationError<ProfileValidationModel> = null;
    if (!userModel.getLastName() || userModel.getLastName().length === 0) {
        validationError = new LastNameValidationError<ProfileValidationModel>('Last name is required.');
    }

    return new Optional<LastNameValidationError<ProfileValidationModel>>(validationError);
}

export function validateProfile(
    user: UserModel,
    validators: ValidatorFunc<UserModel, ProfileValidationModel>[] = [
        validateFirstName,
        validateLastName,
        validateEmail
    ]
) {
    return validators.reduce((validationModel, validator) => {
        validator(user).ifPresent((error) => error.setError(validationModel));
        return validationModel;
    }, new ProfileValidationModel())
}
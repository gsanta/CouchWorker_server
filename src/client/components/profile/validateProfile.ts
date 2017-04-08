import { ProfileValidationModel } from './ProfileValidationModel';
import { UserModel } from '../../../shared/model/user/UserModel';
import { ValidationError } from '../../../shared/validation/ValidationError';
import { Optional } from '../../../shared/Optional';
import { ValidatorFunc } from '../../../shared/validation/ValidatorFunc';
import { validateEmail } from '../../../shared/validation/validateEmail';

type setFirstNameValidationError<T> = {setFirstNameValidationError: (error: string) => T};  
export class FirstNameValidationError<T extends setFirstNameValidationError<T>> extends ValidationError<T> {
    constructor(errorMessage: string) {
        super(errorMessage);
    }

    public setError(errorHolder: T): T {
        return errorHolder.setFirstNameValidationError(this.errorMessage);
    }
}

type setLastNameValidationError<T> = {setLastNameValidationError: (error: string) => T};  
export class LastNameValidationError<T extends setLastNameValidationError<T>> extends ValidationError<T> {
    constructor(errorMessage: string) {
        super(errorMessage);
    }

    public setError(errorHolder: T): T {
        return errorHolder.setLastNameValidationError(this.errorMessage);
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
        validator(user).ifPresent((error) => validationModel = error.setError(validationModel));
        return validationModel;
    }, new ProfileValidationModel())
}
import { UserModel } from '../../../domain/user/UserModel';
import { ProfileValidationModel } from './ProfileValidationModel';

export class Optional<T> {
    private value: T;

    constructor(value: T) {
        this.value = value;
    }

    public ifPresent(func: (value: T) => void) {
        func(this.value);
    }

    public isPresent(): boolean {
        return this.value !== null && this.value !== undefined;
    }

    public getValue(): T {
        return this.value;
    }
}

export abstract class ValidationError<T> {
    protected errorMessage: string;

    constructor(errorMessage: string) {
        this.errorMessage = errorMessage;
    }

    public getMessage(): string {
        return this.errorMessage;
    }
    
    public abstract setError(errorHolder: T): void;
}

type setFirstNameValidationError = {setFirstNameValidationError: (error: string) => void}  
export class FirstNameValidationError<T extends setFirstNameValidationError> extends ValidationError<T> {
    constructor(errorMessage: string) {
        super(errorMessage);
    }

    public setError(errorHolder: T): void {
        errorHolder.setFirstNameValidationError(this.errorMessage);
    }
}

type setLastNameValidationError = {setLastNameValidationError: (error: string) => void}  
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
    if (userModel.getFirstName().length === 0) {
        validationError = new FirstNameValidationError<ProfileValidationModel>('First name is required.');
    }
    
    return new Optional<FirstNameValidationError<ProfileValidationModel>>(validationError);
}

export function validateLastName(userModel: UserModel): Optional<FirstNameValidationError<ProfileValidationModel>> {
    let validationError: LastNameValidationError<ProfileValidationModel> = null;
    if (userModel.getLastName().length === 0) {
        validationError = new LastNameValidationError<ProfileValidationModel>('Last name is required.');
    }

    return new Optional<LastNameValidationError<ProfileValidationModel>>(validationError);
}

type validator = (user: UserModel) => Optional<FirstNameValidationError<ProfileValidationModel>>;

export function validateProfile(
    user: UserModel,
    validators: validator[] = [
        validateFirstName,
        validateLastName
    ]
) {
    return validators.reduce((validationModel, validator) => {
        validator(user).ifPresent((error) => error.setError(validationModel));
        return validationModel;
    }, new ProfileValidationModel())
}
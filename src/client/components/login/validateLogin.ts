import { LoginModel } from './LoginModel';
import { ValidatorFunc } from '../form/validation/ValidatorFunc';
import { LoginValidationModel } from './LoginValidationModel';
import { validateEmail } from '../form/validation/validateEmail';
import { validatePassword } from '../form/validation/validatePassword';

export function validateLogin(
    model: LoginModel,
    validators: ValidatorFunc<LoginModel, LoginValidationModel>[] = [
        validateEmail,
        validatePassword
    ]
) {
    return validators.reduce((validationModel, validator) => {
        validator(model).ifPresent((error) => error.setError(validationModel));
        return validationModel;
    }, new LoginValidationModel());
}
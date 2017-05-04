import { LoginModel } from '../../../shared/model/login/LoginModel';
import { ValidatorFunc } from '../../../shared/validation/ValidatorFunc';
import { validateEmail } from '../../../shared/validation/validateEmail';
import { validatePassword } from '../../../shared/validation/validatePassword';
import { LoginValidationModel } from '../../../shared/model/login/LoginValidationModel';


export function validateLogin(
    model: LoginModel,
    validators: ValidatorFunc[] = [
        validateEmail,
        validatePassword
    ]
) {
    return validators.reduce((validationModel, validator) => {
        validationModel = error.setError(validationModel)
        validator(model).ifPresent((error) => validationModel = error.setError(validationModel));
        return validationModel;
    }, new LoginValidationModel());
}
import { ValidationError } from '@lib/validator/validation-error';
import { ValidatorFunctionResult } from '@lib/validator/types';
import {
    isEmptyString,
} from '@lib/checkers';

export function validateMessage(value: string): ValidatorFunctionResult {
    if (!isEmptyString(value)) {
        throw new ValidationError('The field shoud not be empty');
    }

    return true;
}

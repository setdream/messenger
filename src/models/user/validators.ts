import { ValidationError } from '@lib/validator/validation-error';
import { ValidatorFunctionResult } from '@lib/validator/types';
import {
    isFirstLetterCapital,
    hasSpaces,
    hasNumber,
    hasCapitalLetter,
    hasSpecificLength,
    hasAlphabetic,
    isEmptyString,
} from '@lib/checkers';

export function validateName(value: string): ValidatorFunctionResult {
    if (isEmptyString(value)) {
        throw new ValidationError('The field should not be empty');
    }

    if (!isFirstLetterCapital(value)) {
        throw new ValidationError('The Field\'s First Letter should be capital');
    }

    if (hasSpaces(value)) {
        throw new ValidationError('The field should not have any spaces');
    }

    if (hasNumber(value)) {
        throw new ValidationError('The field should not have any digits');
    }

    if (!/^[A-ZА-Я][a-zA-ZА-Яа-я-]*$/.test(value)) {
        throw new ValidationError('The field should contain of Latin or Russian ' +
            'letters without spaces and digits');
    }

    return true;
}

export function validateLogin(value: string): ValidatorFunctionResult {
    if (!hasSpecificLength(value, 3, 20)) {
        throw new ValidationError('The field length should be from 3 to 20');
    }

    if (!hasAlphabetic(value)) {
        throw new ValidationError('The field should have at least one letter');
    }

    if (hasSpaces(value)) {
        throw new ValidationError('The field should not have any spaces');
    }

    if (/^[a-zA-Z-_]+$/.test(value)) {
        throw new ValidationError('The field should contain Lattin letters without spaces ' +
            'and special symbols except hyphens and underscores');
    }

    return true;
}

export function validateEmail(value: string): ValidatorFunctionResult {
    if (!/^[a-zA-Z0-9-_]+@[a-zA-Z0-9-_]+\.[a-zA-Z0-9-_]+$/.test(value)) {
        throw new ValidationError('The field should be a correct email address');
    }

    return true;
}

export function validatePassword(value: string): ValidatorFunctionResult {
    if (!hasSpecificLength(value, 8, 40)) {
        throw new ValidationError('The field length should be from 8 to 40');
    }

    if (!hasCapitalLetter(value)) {
        throw new ValidationError('The field should have at least one capital letter');
    }

    if (!hasNumber(value)) {
        throw new ValidationError('The field should have at least one digit');
    }

    return true;
}

export function validatePhone(value: string): ValidatorFunctionResult {
    if (!hasSpecificLength(value, 10, 15)) {
        throw new ValidationError('The field length should be from 10 to 15');
    }

    if (/^\+?[0-9]{10, 15}$/.test(value)) {
        throw new ValidationError('The field should be a correct phone number');
    }

    return true;
}


export function makeEqualValidator(getValue: () => string) {
    return (value: string): boolean => {
        if (getValue() !== value) {
            throw new ValidationError('Values is not equal');
        }

        return true;
    };
}

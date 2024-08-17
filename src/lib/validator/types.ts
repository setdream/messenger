export type ValidatorFunctionResult = boolean | never;
export type ValidatorFunction = (value: string) => ValidatorFunctionResult;

export type FieldValidator = [string, ValidatorFunction, FieldValidatorConstructor];

export interface IFieldValidator {
    getValue: () => string;
    validate: () => boolean;
    removeListeners: () => void;
}

export interface FieldValidatorConstructor {
    new(getField: () => HTMLElement | null, validators: ValidatorFunction[]): IFieldValidator;
}

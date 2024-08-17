import { Component } from '@lib/view';

import { ValidationError } from '@lib/validator/validation-error';
import { ValidatorFunction } from './types';

export abstract class ValidatorComponent<T extends Record<string, unknown>> extends Component<T> {
    private validators: ValidatorFunction[] = [];

    constructor(props: T, validators: ValidatorFunction[]) {
        super(props);

        this.validators = validators;
    }

    abstract getValue(): string;
    abstract addErrorStyles(error: ValidationError): void;
    abstract removeErrorStyles(): void;

    validate(): boolean {
        const value = this.getValue();

        return this.validators.every((validator) => {
            try {
                validator(value);

                return true;
            } catch (error) {
                this.getContent()
                    ?.addEventListener('keydown', this.onKeyDownInput.bind(this), {
                        once: true,
                    });

                this.addErrorStyles((error as ValidationError));

                return false;
            }
        });
    }

    componentWillRender(): void {
        this.getContent()
            ?.removeEventListener('keydown', this.onKeyDownInput.bind(this));
    }

    onKeyDownInput(): void {
        this.removeErrorStyles();
    }
}

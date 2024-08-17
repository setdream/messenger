import './field.css';

import { toDomTree } from '@lib/handlebars';
import { ValidatorComponent } from '@lib/validator/validator.component';
import { ValidationError } from '@lib/validator/validation-error';
import { FieldProps } from './types';

import template from './field.hbs';

const INPUT_ERROR_CLASS = 'form-input--has-error';

export class FieldComponent extends ValidatorComponent<FieldProps> {
    getValue(): string {
        const input = this.getInput();

        return input?.value || '';
    }

    getInput(): HTMLInputElement | null {
        return this.find('[data-role-field-input]');
    }

    getErrorContainer(): HTMLInputElement | null {
        return this.find('[data-role-error-container]');
    }

    addErrorStyles(error: ValidationError): void {
        const container = this.getErrorContainer();

        if (!container) {
            return;
        }

        this.getInput()
            ?.classList.add(INPUT_ERROR_CLASS);

        container.textContent = error.message;
        container.hidden = false;
    }

    removeErrorStyles(): void {
        const container = this.getErrorContainer();

        if (container && !container.hidden) {
            container.hidden = true;
        }

        this.getInput()
            ?.classList.remove(INPUT_ERROR_CLASS);
    }

    render(): HTMLElement {
        return toDomTree(template<FieldProps>(this.props));
    }
}

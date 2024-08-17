import './user-field.css';

import { toDomTree } from '@lib/handlebars';
import { ValidatorComponent } from '@lib/validator/validator.component';
import { UserFieldProps } from './types';

import template from './user-field.hbs';

const FIELD_ERROR_CLASS = 'user-field--has-error';

export class UserFieldComponent extends ValidatorComponent<UserFieldProps> {
    getValue(): string {
        const input = this.getInput();

        return input?.value || '';
    }

    getInput(): HTMLInputElement | null {
        return this.find('[data-role-user-field-input]');
    }

    addErrorStyles(): void {
        this.getContent()
            ?.classList.add(FIELD_ERROR_CLASS);
    }

    removeErrorStyles(): void {
        this.getContent()
            ?.classList.remove(FIELD_ERROR_CLASS);
    }

    render(): HTMLElement {
        return toDomTree(template<UserFieldProps>(this.props));
    }
}

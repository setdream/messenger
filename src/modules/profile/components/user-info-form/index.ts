import './user-info-form.css';

import { toDomTree } from '@lib/handlebars';
import { Component } from '@lib/view/index';
import { UserInfoFormProps } from './types';

import template from './user-info-form.hbs';

export class UserInfoFormComponent extends Component<UserInfoFormProps> {
    componentDidRender(): void {
        this.getContent()
            ?.addEventListener('submit', this.onSubmitUserInfoForm.bind(this));
    }

    componentWillRender(): void {
        this.getContent()
            ?.removeEventListener('submit', this.onSubmitUserInfoForm.bind(this));
    }

    onSubmitUserInfoForm(e: Event): void {
        e.preventDefault();

        const {
            field,
            onSubmit,
        } = this.props;

        if (onSubmit && field.validate()) {
            onSubmit(field.getValue());
        }
    }

    render(): HTMLElement {
        return toDomTree(template<UserInfoFormProps>(this.props));
    }
}

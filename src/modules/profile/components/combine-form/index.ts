import './combine-form.css';

import { toDomTree } from '@lib/handlebars';
import { Component } from '@lib/view/index';
import { CombineFormProps, ProgressListType } from './types';

import template from './combine-form.hbs';
import { UserInfoFormComponent } from '../user-info-form';
import { hide, show } from '@lib/view/utils';

export class CombineFormComponent extends Component<CombineFormProps> {
    private currentFormNumber = 1;

    constructor(
        props: CombineFormProps,
        progress: ProgressListType = [true, false]
    ) {
        super(Object.assign({ progress }, props));

        this.refresh();
    }

    refresh(): void {
        const progress: ProgressListType = this.props.forms.map((_value, index) => {
            return index < this.currentFormNumber;
        });

        this.props.forms.forEach((form: UserInfoFormComponent, index: number) => {
            if (this.currentFormNumber !== index + 1) {
                hide(form);
            } else {
                show(form);
            }
        });

        this.setProps({ progress });
    }

    reset(): void {
        this.currentFormNumber = 1;

        this.refresh();
    }

    count(): number {
        return this.props.forms.length;
    }

    next(): void {
        if (this.count() > this.currentFormNumber) {
            this.currentFormNumber += 1;

            this.refresh();
        }
    }

    render(): HTMLElement {
        return toDomTree(template<CombineFormProps>(this.props));
    }
}

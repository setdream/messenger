import { UserInfoFormComponent } from '../user-info-form';

export type ProgressListType = boolean[];

export type CombineFormProps = {
    forms: UserInfoFormComponent[],
    progress?: ProgressListType
}

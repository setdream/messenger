export type Indexed<T = unknown> = {
    [key in string]: T;
};

export enum StoreEvents {
    UPDATED = 'updated',
}

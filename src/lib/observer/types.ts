// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type callback = (...args: any[]) => void;
export type listeners = Record<string, callback[]>;

type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
export declare const OmitFields: <A extends any[], T extends object, K extends keyof T>(ctor: new (...a: A) => T, k: K[]) => new (...a: A) => Omit<T, K>;
export {};

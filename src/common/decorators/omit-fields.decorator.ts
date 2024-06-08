type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
export const OmitFields = <
  A extends any[],
  T extends object,
  K extends keyof T,
>(
  ctor: new (...a: A) => T,
  k: K[],
) => ctor as new (...a: A) => Omit<T, K>;

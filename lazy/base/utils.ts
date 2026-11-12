export type Lazy<T> = () => T;
export const force = <T>(some: Lazy<T>): T => some(); 

export const memoize = <T>(compute: Lazy<T>): Lazy<T> => {
    let done = false; let value: T;
    let execute: Lazy<T> | undefined = compute;

    return () => {
        if (!done) { value = force(execute!); done = true; execute = undefined; };
        return value;
    };
};
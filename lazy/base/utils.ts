export type Lazy<T> = () => T;
export const force = <T>(some: Lazy<T>): T => some(); 

export const memoize = <T>(compute: Lazy<T>): Lazy<T> => {
    let done = false; let value: T;

    return () => {
        if (!done) { value = force(compute); done = true; };
        return value;
    };
};


export const sum = (a: Lazy<number>) => (b: Lazy<number>): Lazy<number> =>
    () => force(a) + force(b);
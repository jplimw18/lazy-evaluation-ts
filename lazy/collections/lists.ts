import { force, Lazy, memoize, sum } from "../base/utils.ts";

export type List<T> = {
    head: Lazy<T>;
    tail: Lazy<List<T>>;
} | null;

export const head = <T>(xs: List<T>): Lazy<T> => xs!.head;
export const tail = <T>(xs: List<T>): Lazy<List<T>> => xs!.tail;

export const fromArr = <T>(arr: T[]): Lazy<List<T>> => (): List<T> =>
    arr.length === 0 ? null : ({ head: () => arr[0], tail: () => force(fromArr(arr.slice(1))) });

export const toArr = <T>(ls: Lazy<List<T>>): Lazy<T[]> => (): T[] => {
    const out: T[] = [];
    let list = force(ls);

    while (list !== null) {
        let h = force(head(list));
        if (h === null) break; out.push(h);

        list = force(tail(list));
    };

    return out;
};

export const iterate = <T>(f: Lazy<(...args: Lazy<T>[]) => Lazy<T>>) => (init: Lazy<T>): Lazy<List<T>> => {
    const fn = memoize(f);

    const build = (curr: Lazy<T>): Lazy<List<T>> =>
        memoize(() => ({
            head: curr,
            tail: memoize(() => {
                const next = memoize(force(fn)(curr));
                return force(build(next));
            })
        }));

    return build(memoize(init));
};

export const take = (n: Lazy<number>) => <T>(ls: Lazy<List<T>>): Lazy<List<T>> => {
    return () => {
        const list = force(ls);
        const count = force(n);
        if (list === null || count <= 0) return null;

        return ({ head: head(list), tail: take(() => count - 1)(tail(list)) });
    };
};


export const zipWith = <T, R>(f: Lazy<(a: Lazy<T>) => (b: Lazy<T>) => Lazy<R>>) => {
    const fn = memoize(f);

    const combine = (xs: Lazy<List<T>>) => (ys: Lazy<List<T>>): Lazy<List<R>> => memoize(() => {
        const ls1 = force(xs);
        const ls2 = force(ys);

        return ls1 === null || ls2 === null ? null
            : ({ head: force(fn)(head(ls1))(head(ls2)), tail: memoize(combine(tail(ls1))(tail(ls2))) })
    });
    
    return (xs: Lazy<List<T>>) => (ys: Lazy<List<T>>) => combine(xs)(ys);
};

export const cons = <T>(a: Lazy<T>) => (b: Lazy<List<T>>): Lazy<List<T>> =>
    () => ({ head: a, tail: b });


const genNaturals = () => (x: Lazy<number>): Lazy<number> => () => force(x) + 1;
export const Naturals = iterate(genNaturals)(() => 0);

export const Fibonacci = cons(() => 0)(cons(() => 1)(() => force(zipWith(() => sum)(Fibonacci)(tail(force(Fibonacci))))));

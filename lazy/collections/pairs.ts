import { force, Lazy } from "../base/utils.ts";

export interface Pair<T1, T2> {
    first: Lazy<T1>;
    second: Lazy<T2>;
};

export const makePair = <T1>(first: Lazy<T1>) =>
    <T2>(second: Lazy<T2>): Lazy<Pair<T1, T2>> => 
        () => ({ first, second });

export const fst = <T1, T2>(p: Lazy<Pair<T1, T2>>): Lazy<T1> => force(p).first;
export const snd = <T1, T2>(p: Lazy<Pair<T1, T2>>): Lazy<T2> => force(p).second;

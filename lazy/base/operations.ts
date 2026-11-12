import { force, Lazy, memoize } from "./utils.ts";

export const sum = (a: Lazy<number>) => (b: Lazy<number>) => 
    memoize(() => force(a) + force(b)); 
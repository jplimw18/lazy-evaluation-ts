import { force, type Lazy } from "../base/utils.ts";

export const puts = <T>(some: Lazy<T>) => {
    console.log(force(some));
};
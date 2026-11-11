import { force, Lazy } from "./base/utils.ts";
import { Fibonacci, fromArr, Naturals, take, toArr, zipWith } from "./collections/lists.ts";
import { fst, makePair, snd } from "./collections/pairs.ts";
import { puts } from "./IO/inOut.ts";

const p = makePair(() => 1)(() => 2);
const ls = take(() => 10)(Naturals);

puts(() => `{ first: ${force(fst(p))}, second: ${force(snd(p))} }`);
puts(toArr(ls));


const sum = (a: Lazy<number>) => (b: Lazy<number>): Lazy<number> => () => a() + b();
const zipped = zipWith(() => sum)(take(() => 5)(Naturals))(ls);

puts(toArr(zipped));

puts(toArr(take(() => 100)(Fibonacci)));
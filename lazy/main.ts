import { puts } from "./IO/inOut.ts";
import { Fibonacci, take, toArr } from "./collections/lists.ts";

puts(toArr(take(() => 1_000_000)(Fibonacci)));
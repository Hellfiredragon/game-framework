import {suffixes} from "./scale-suffixes";
import {FRACTION_DIGITS} from "./constants";

function log10(x: number): number {
    return Math.log(x) / Math.LN10;
}

export function formatNumber(n: number): string {
    if(n > 1) {
        const exp = Math.floor(log10(n * 1.11) / 3);
        const suffix = suffixes.short[exp];
        const target = n / Math.pow(10, exp * 3);

        return target.toFixed(FRACTION_DIGITS) + suffix;
    }else{
        return n.toFixed(FRACTION_DIGITS);
    }
}

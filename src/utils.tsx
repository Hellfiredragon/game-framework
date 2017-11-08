export function dictEquals(x: any, y: any): boolean {
    const k1 = Object.keys(x);
    const k2 = Object.keys(y);
    if (k1.length != k2.length) return false;
    for (let i = 0; i < k1.length; i++) {
        const key = k1[i];
        if (k2.indexOf(key) == -1) return false;
        if (x[key] != y[key]) return false;
    }
    return true;
}

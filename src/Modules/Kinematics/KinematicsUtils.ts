import { add, multiply } from "mathjs";

/** Calculate position matrix using MRUA position ecuation => x = x0 + v0 * t + 1/2 * a^2 */

const calculatePosition = (x0: number[], v0: number[], t: number, a: number[] = [0, 0, 0]): number[] => {
    const x: number[] = add(
        add(x0, multiply(v0, t)),
        multiply(0.5, multiply(a, Math.pow(t, 2)))
    ) as number[];
    return x;
}

/** Calculate velocity using MRUA velocity ecuation => v = v0 + t * a */

const calculateVelocity = (v0: number[], t: number, a: number[]): number[] => {
    const v = add(v0, multiply(t, a)) as number[];
    return v;
}

export { calculatePosition, calculateVelocity };
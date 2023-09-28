import { Matrix, add, matrix, multiply } from "mathjs";

/** Calculate position matrix using MRUA position ecuation => x = x0 + v0 * t + 1/2 * a^2 */

const calculatePosition = (x0: Matrix, v0: Matrix, t: number, a: Matrix = matrix([0, 0, 0])) => {
    const x = add(
        add(x0, multiply(v0, t)),
        multiply(0.5, multiply(a, Math.pow(t, 2)))
    );
    return x;
}

/** Calculate velocity using MRUA velocity ecuation => v = v0 + t * a */

const calculateVelocity = (v0: Matrix, t: number, a: Matrix) => {
    const v = add(v0, multiply(t, a));
    return v;
}

export { calculatePosition, calculateVelocity };
import { Matrix, divide, multiply, norm, subtract } from "mathjs";
import { G } from "../../constants"

const calculateGravityForce = (m1: number, m2: number, x1: Matrix, x2: Matrix): Matrix => {
    const r: Matrix = subtract(x1, x2);
    const constant = G * m1 * m2;
    const f: Matrix = r.map((value: number) => value !== 0 ? constant / value ** 2 : 0);
    return f;
}

const calculateGravityAcceleration = (m: number, r: Matrix): Matrix => {
    const rNorm: number = Number(norm(r));
    const unitVector: Matrix = divide(r, rNorm) as Matrix;
    const a: Matrix = multiply((G * m) / (Math.pow(rNorm, 2)), unitVector) as Matrix;
    return a;
}

export { calculateGravityForce, calculateGravityAcceleration };
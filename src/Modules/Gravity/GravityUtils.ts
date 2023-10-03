import { Matrix, divide, subtract } from "mathjs";
import { G } from "../../constants"

const calculateGravityForce = (m1: number, m2: number, x1: Matrix, x2: Matrix): Matrix => {
    const r: Matrix = subtract(x1, x2);
    const constant = G * m1 * m2;
    const f: Matrix = r.map((value: number) => value !== 0 ? constant / value ** 2 : 0);
    return f;
}

const calculateGravityAcceleration = (m: number, r: Matrix): Matrix => {
    const a = r.map((r: number) => r !== 0 ? (G * m) / (r ** 2) : 0);
    return a;
}

export { calculateGravityForce, calculateGravityAcceleration };
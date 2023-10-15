import { divide, multiply, norm, subtract } from "mathjs";
import { G } from "../../constants"

const calculateGravityForce = (m1: number, m2: number, x1: number[], x2: number[]): number[] => {
    const r: number[] = subtract(x1, x2);
    const constant = G * m1 * m2;
    const f: number[] = r.map((value: number) => value !== 0 ? constant / value ** 2 : 0);
    return f;
}

const calculateGravityAcceleration = (m: number, r: number[]): number[] => {
    const rNorm: number = Number(norm(r));
    const unitVector: number[] = divide(r, rNorm) as number[];
    const a: number[] = multiply((G * m) / (Math.pow(rNorm, 2)), unitVector) as number[];
    return a;
}

export { calculateGravityForce, calculateGravityAcceleration };
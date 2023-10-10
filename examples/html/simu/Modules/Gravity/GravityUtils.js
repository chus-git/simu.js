import { divide, multiply, norm, subtract } from "mathjs";
import { G } from "../../constants";
const calculateGravityForce = (m1, m2, x1, x2) => {
    const r = subtract(x1, x2);
    const constant = G * m1 * m2;
    const f = r.map((value) => value !== 0 ? constant / Math.pow(value, 2) : 0);
    return f;
};
const calculateGravityAcceleration = (m, r) => {
    const rNorm = Number(norm(r));
    const unitVector = divide(r, rNorm);
    const a = multiply((G * m) / (Math.pow(rNorm, 2)), unitVector);
    return a;
};
export { calculateGravityForce, calculateGravityAcceleration };

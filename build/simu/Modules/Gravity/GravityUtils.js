import { subtract } from "mathjs";
import { G } from "../../constants";
const calculateGravityForce = (m1, m2, x1, x2) => {
    const r = subtract(x1, x2);
    const constant = G * m1 * m2;
    const f = r.map((value) => value !== 0 ? constant / Math.pow(value, 2) : 0);
    return f;
};
const calculateGravityAcceleration = (m, r) => {
    const a = r.map((r) => r !== 0 ? (G * m) / (Math.pow(r, 2)) : 0);
    return a;
};
export { calculateGravityForce, calculateGravityAcceleration };

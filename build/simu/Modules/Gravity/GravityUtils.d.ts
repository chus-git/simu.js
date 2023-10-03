import { Matrix } from "mathjs";
declare const calculateGravityForce: (m1: number, m2: number, x1: Matrix, x2: Matrix) => Matrix;
declare const calculateGravityAcceleration: (m: number, r: Matrix) => Matrix;
export { calculateGravityForce, calculateGravityAcceleration };

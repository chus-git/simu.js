import { Matrix } from "mathjs";
/** Calculate position matrix using MRUA position ecuation => x = x0 + v0 * t + 1/2 * a^2 */
declare const calculatePosition: (x0: Matrix, v0: Matrix, t: number, a?: Matrix) => import("mathjs").Matrix;
/** Calculate velocity using MRUA velocity ecuation => v = v0 + t * a */
declare const calculateVelocity: (v0: Matrix, t: number, a: Matrix) => import("mathjs").Matrix;
export { calculatePosition, calculateVelocity };

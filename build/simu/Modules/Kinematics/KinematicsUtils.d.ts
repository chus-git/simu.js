/** Calculate position matrix using MRUA position ecuation => x = x0 + v0 * t + 1/2 * a^2 */
declare const calculatePosition: (x0: number[], v0: number[], t: number, a?: number[]) => number[];
/** Calculate velocity using MRUA velocity ecuation => v = v0 + t * a */
declare const calculateVelocity: (v0: number[], t: number, a: number[]) => number[];
export { calculatePosition, calculateVelocity };

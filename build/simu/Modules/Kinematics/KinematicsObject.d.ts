import { SceneObject, ISceneObject } from "../../SceneObject";
import { Matrix } from 'mathjs';
export interface IKinematicsObject extends ISceneObject {
    _initialVelocity: Matrix;
    _accelerations: KinematicAcceleration[];
    _actualVelocity: Matrix;
    _actualAcceleration: Matrix;
    _accelerationIntervals: {
        startAt: number;
        endAt: number;
        duration: number;
        value: Matrix;
    }[];
}
declare class KinematicsObject extends SceneObject {
    private _initialVelocity;
    private _accelerations;
    private _actualVelocity;
    private _actualAcceleration;
    private _accelerationIntervals;
    constructor(data?: Partial<IKinematicsObject>);
    update(time: number): void;
    /**
     * Calculate acceleration intervals based on all provided accelerations
     */
    calculateAccelerationIntervals(): void;
    addAcceleration(acceleration: KinematicAcceleration): void;
    removeAcceleration(index: number): void;
    /** Setters */
    set initialVelocity(initialVelocity: Matrix);
    set accelerationIntervals(accelerationIntervals: {
        startAt: number;
        endAt: number;
        duration: number;
        value: Matrix;
    }[]);
    get initialVelocity(): Matrix;
    get actualVelocity(): Matrix;
}
declare class KinematicAcceleration {
    private _value;
    private _startAt;
    private _duration;
    constructor(data?: Partial<KinematicAcceleration>);
    set value(value: Matrix);
    set startAt(startAt: number);
    set duration(duration: number);
    get value(): Matrix;
    get startAt(): number;
    get duration(): number;
}
export { KinematicsObject, KinematicAcceleration };

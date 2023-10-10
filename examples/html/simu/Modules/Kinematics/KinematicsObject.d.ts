import { SceneObject, ISceneObject } from "../../SceneObject";
import { Velocity, Acceleration } from "../../utils";
export interface IKinematicsObject extends ISceneObject {
    _initialVelocity: Velocity;
    _accelerations: Acceleration[];
    _velocity: Velocity;
    _actualAcceleration: Acceleration;
}
declare class KinematicsObject extends SceneObject {
    private _initialVelocity;
    private _velocity;
    private _accelerations;
    private _actualAcceleration;
    private _accelerationIntervals;
    constructor(data?: Partial<IKinematicsObject>);
    /**
     * Calculate the position, velocity and acceleration on the indicated time.
     * It will be necessary to pay attention to the acceleration intervals to
     * which the object is subjected.
    */
    update(time: number): void;
    /**
     * Calculate acceleration intervals based on all provided accelerations. This must
     * be called after every this._accelerations variable modification.
     */
    calculateAccelerationIntervals(): void;
    addAcceleration(acceleration: Acceleration): void;
    removeAcceleration(acceleration: Acceleration): void;
    /** Getters */
    get velocity(): Velocity;
    get actualAcceleration(): Acceleration;
    /** Setters */
    set initialVelocity(initialVelocity: Velocity);
    get initialVelocity(): Velocity;
}
export { KinematicsObject };

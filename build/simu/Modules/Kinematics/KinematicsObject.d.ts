import { SceneObject, ISceneObject } from "../../SceneObject";
import { Vector } from "../../utils";
export interface IKinematicsObject extends ISceneObject {
    _initialVelocity: Vector;
}
declare class KinematicsObject extends SceneObject {
    private _initialVelocity;
    private _velocity;
    private _accelerations;
    private _acceleration;
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
    addAcceleration(acceleration: {
        startAt: number;
        duration: number;
        vector: Vector;
    }): void;
    removeAcceleration(acceleration: {
        startAt: number;
        duration: number;
        vector: Vector;
    }): void;
    /** Getters */
    get velocity(): Vector;
    get acceleration(): Vector;
    /** Setters */
    set initialVelocity(initialVelocity: Vector);
    get initialVelocity(): Vector;
}
export default KinematicsObject;

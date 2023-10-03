import { SceneObject, ISceneObject } from "../../SceneObject";
import { Velocity, Acceleration } from "../../utils";
export interface IGravityObject extends ISceneObject {
    _initialVelocity: Velocity;
    _mass: number;
}
declare class GravityObject extends SceneObject {
    private _initialVelocity;
    private _mass;
    private _actualVelocity;
    private _actualAcceleration;
    constructor(data?: Partial<IGravityObject>);
    update(time: number): void;
    /** Getters */
    get actualVelocity(): Velocity;
    get actualAcceleration(): Acceleration;
    get initialVelocity(): Velocity;
    get mass(): number;
    /** Setters */
    set initialVelocity(initialVelocity: Velocity);
}
export { GravityObject };

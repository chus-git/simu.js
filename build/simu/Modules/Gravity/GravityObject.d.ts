import { SceneObject, ISceneObject } from "../../SceneObject";
import { Vector } from "../../utils";
export interface IGravityObject extends ISceneObject {
    _initialVelocity: Vector;
    _mass: number;
}
declare class GravityObject extends SceneObject {
    private _initialVelocity;
    private _mass;
    private _velocity;
    private _actualAcceleration;
    constructor(data?: Partial<IGravityObject>);
    update(time: number): void;
    /** Getters */
    get velocity(): Vector;
    get actualAcceleration(): Vector;
    get initialVelocity(): Vector;
    get mass(): number;
    /** Setters */
    set initialVelocity(initialVelocity: Vector);
}
export default GravityObject;

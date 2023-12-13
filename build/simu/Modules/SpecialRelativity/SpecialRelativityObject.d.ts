import { SceneObject, ISceneObject } from "../../SceneObject";
import { Vector } from "../../utils";
export interface ISpecialRelativityObject extends ISceneObject {
    _velocity: Vector;
    _properTime: number;
    _lorentzFactor: number;
}
declare class SpecialRelativityObject extends SceneObject {
    private _velocity;
    private _properTime;
    private _lorentzFactor;
    private _mass;
    constructor(data?: Partial<ISpecialRelativityObject>);
    update(time: number): void;
    calculateRelativisticProperties(otherObject: SpecialRelativityObject): RelativeProperties;
    /** Getters */
    get properTime(): number;
    get position(): Vector;
    get velocity(): Vector;
    get mass(): number;
    /** Setters */
    set properTime(time: number);
    set position(position: Vector);
    set velocity(velocity: Vector);
    set mass(mass: number);
}
interface RelativeProperties {
    vRelative: Vector;
    tRelative: number;
    mRelative: number;
    lorentzFactor: number;
}
export default SpecialRelativityObject;

import { SceneObject, ISceneObject } from "../../SceneObject";
import { Vector } from "../../utils";
export interface ISpecialRelativityObject extends ISceneObject {
    _velocity: number[];
    _properTime: number;
    _lorentzFactor: number;
}
declare class SpecialRelativityObject extends SceneObject {
    private _velocity;
    private _properTime;
    private _lorentzFactor;
    constructor(data?: Partial<ISpecialRelativityObject>);
    update(time: number): void;
    calculateRelativisticProperties(otherObject: SpecialRelativityObject): RelativeProperties;
    /** Getters */
    get properTime(): number;
    get position(): Vector;
    get velocity(): Vector;
    /** Setters */
    set properTime(time: number);
    set position(position: Vector);
    set velocity(velocity: Vector);
}
interface RelativeProperties {
    vRelative: number[];
    tRelative: number;
    lorentzFactor: number;
}
export default SpecialRelativityObject;

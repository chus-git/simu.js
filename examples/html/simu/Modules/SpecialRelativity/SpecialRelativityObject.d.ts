import { SceneObject, ISceneObject } from "../../SceneObject";
import { Matrix } from 'mathjs';
import { Position, Velocity } from "../../utils";
export interface ISpecialRelativityObject extends ISceneObject {
    _velocity: Matrix;
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
    get position(): Position;
    get velocity(): Velocity;
    /** Setters */
    set properTime(time: number);
    set position(position: Position);
    set velocity(velocity: Velocity);
}
interface RelativeProperties {
    vRelative: Matrix;
    tRelative: number;
    lorentzFactor: number;
}
export { SpecialRelativityObject };

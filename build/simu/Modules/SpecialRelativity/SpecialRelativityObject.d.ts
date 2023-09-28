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
    /** Getters */
    get properTime(): number;
    get actualPosition(): Position;
    get velocity(): Velocity;
    /** Setters */
    set properTime(time: number);
    set actualPosition(position: Position);
    set velocity(velocity: Velocity);
}
export { SpecialRelativityObject };

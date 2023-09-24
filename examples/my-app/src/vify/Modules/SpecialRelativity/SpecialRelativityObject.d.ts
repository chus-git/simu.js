import { SceneObject, ISceneObject } from "../../SceneObject";
import { Matrix } from 'mathjs';
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
    calculateProperTimeDueTimeDilation(time: number, relativeVelocity: Matrix): number;
    get properTime(): number;
    set properTime(time: number);
    get actualPosition(): Matrix;
    set actualPosition(position: Matrix);
    get velocity(): Matrix;
    set velocity(velocity: Matrix);
}
export { SpecialRelativityObject };

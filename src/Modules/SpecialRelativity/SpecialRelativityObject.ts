import { SceneObject, ISceneObject } from "../../SceneObject";
import { Matrix, add, matrix, multiply, norm } from 'mathjs';
import { SPEED_OF_LIGHT } from "../../constants";
import { Position, Velocity } from "../../utils";
import { calculateProperTimeDueTimeDilation } from "./SpecialRelativityUtils";
import { calculatePosition, calculateVelocity } from "../Kinematics/KinematicsUtils";

export interface ISpecialRelativityObject extends ISceneObject {
    _velocity: Matrix,
    _properTime: number,
    _lorentzFactor: number
}

class SpecialRelativityObject extends SceneObject {

    // Initial velocity vector
    private _velocity: Velocity;

    // Proper time
    private _properTime: number;

    // Lorentz factor
    private _lorentzFactor: number;

    constructor(data: Partial<ISpecialRelativityObject> = {}) {

        super(data);

        this._velocity = new Velocity();
        this._properTime = 0;
        this._lorentzFactor = 1;

        Object.assign(this, data);

    }

    update(time: number) {

        this._actualPosition.vector = calculatePosition(this._initialPosition.vector, this._velocity.vector, time);
        this._properTime = calculateProperTimeDueTimeDilation(this._velocity.vector, time);

    }

    /** Getters */

    get properTime(): number {
        return this._properTime;
    }

    get actualPosition(): Position {
        return this._actualPosition;
    }

    get velocity(): Velocity {
        return this._velocity;
    }

    /** Setters */

    set properTime(time: number) {
        this._properTime = time;
    }

    set actualPosition(position: Position) {
        this._actualPosition = position;
    }

    set velocity(velocity: Velocity) {
        this._velocity = velocity;
    }

}

export { SpecialRelativityObject };
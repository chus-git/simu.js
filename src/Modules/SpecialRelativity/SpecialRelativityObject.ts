import { SceneObject, ISceneObject } from "../../SceneObject";
import { Matrix, norm, subtract } from 'mathjs';
import { Position, Velocity } from "../../utils";
import { calculateLorentzFactor, calculateTimeDilation } from "./SpecialRelativityUtils";
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

        this._position.vector = calculatePosition(this._initialPosition.vector, this._velocity.vector, time);
        this._properTime = calculateTimeDilation(Number(norm(this._velocity.vector)), time);
        this._lorentzFactor = calculateLorentzFactor(Number(norm(this._velocity.vector)));

    }

    calculateRelativisticProperties(otherObject: SpecialRelativityObject): RelativeProperties {

        // Relative velocity between this and other object
        const vRelative: Matrix = subtract(otherObject.velocity.vector, this._velocity.vector);

        // Relative time between this and other object
        const tRelative: number = calculateTimeDilation(Number(norm(vRelative)), otherObject.properTime);

        // Relative lorentz factor bewteen this and other object
        const lorentzFactor: number = calculateLorentzFactor(Number(norm(vRelative)));

        return {
            vRelative: vRelative,
            tRelative: tRelative,
            lorentzFactor: lorentzFactor
        };

    }

    /** Getters */

    get properTime(): number {
        return this._properTime;
    }

    get position(): Position {
        return this._position;
    }

    get velocity(): Velocity {
        return this._velocity;
    }

    /** Setters */

    set properTime(time: number) {
        this._properTime = time;
    }

    set position(position: Position) {
        this._position = position;
    }

    set velocity(velocity: Velocity) {
        this._velocity = velocity;
    }

}

interface RelativeProperties {
    vRelative: Matrix,
    tRelative: number,
    lorentzFactor: number
}

export { SpecialRelativityObject };
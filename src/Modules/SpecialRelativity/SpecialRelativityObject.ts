import { SceneObject, ISceneObject } from "../../SceneObject";
import { norm, subtract } from 'mathjs';
import { Vector } from "../../utils";
import { calculateLorentzFactor, calculateTimeDilation } from "./SpecialRelativityUtils";
import { calculatePosition } from "../Kinematics/KinematicsUtils";

export interface ISpecialRelativityObject extends ISceneObject {
    _velocity: Vector,
    _properTime: number,
    _lorentzFactor: number
}

class SpecialRelativityObject extends SceneObject {

    // Initial velocity vector
    private _velocity: Vector;

    // Proper time
    private _properTime: number;

    // Lorentz factor
    private _lorentzFactor: number;

    // Mass
    private _mass: number;

    constructor(data: Partial<ISpecialRelativityObject> = {}) {

        super(data);

        this._velocity = new Vector();
        this._properTime = 0;
        this._lorentzFactor = 1;
        this._mass = 1;

        Object.assign(this, data);

    }

    update(time: number) {

        this._position.vector = calculatePosition(this._initialPosition.vector, this._velocity.vector, time);
        this._properTime = calculateTimeDilation(Number(norm(this._velocity.vector)), time);
        this._lorentzFactor = calculateLorentzFactor(Number(norm(this._velocity.vector)));

    }

    calculateRelativisticProperties(otherObject: SpecialRelativityObject): RelativeProperties {

        // Relative velocity between this and other object
        const vRelative: Vector = new Vector();
        // Obtain velocity vector as numbers array from velocities vectors and positions
        const vRelativeVector: number[] = subtract(otherObject.velocity.vector, this._velocity.vector) as number[];
        vRelative.vector = vRelativeVector;

        // Relative time between this and other object
        const tRelative: number = calculateTimeDilation(Number(norm(vRelative.vector)), otherObject.properTime);

        // Relative mass between this and other object
        const mRelative: number = this._lorentzFactor * otherObject.mass;

        // Relative lorentz factor bewteen this and other object
        const lorentzFactor: number = calculateLorentzFactor(Number(norm(vRelative.vector)));

        return {
            vRelative: vRelative,
            tRelative: tRelative,
            mRelative: mRelative,
            lorentzFactor: lorentzFactor
        };

    }

    /** Getters */

    get properTime(): number {
        return this._properTime;
    }

    get position(): Vector {
        return this._position;
    }

    get velocity(): Vector {
        return this._velocity;
    }

    get mass(): number {
        return this._mass;
    }

    /** Setters */

    set properTime(time: number) {
        this._properTime = time;
    }

    set position(position: Vector) {
        this._position = position;
    }

    set velocity(velocity: Vector) {
        this._velocity = velocity;
    }

    set mass(mass: number) {
        this._mass = mass;
    }

}

interface RelativeProperties {
    vRelative: Vector,
    tRelative: number,
    mRelative: number,
    lorentzFactor: number
}

export default SpecialRelativityObject;
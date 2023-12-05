import { SceneObject } from "../../SceneObject";
import { norm, subtract } from 'mathjs';
import { Vector } from "../../utils";
import { calculateLorentzFactor, calculateTimeDilation } from "./SpecialRelativityUtils";
import { calculatePosition } from "../Kinematics/KinematicsUtils";
class SpecialRelativityObject extends SceneObject {
    constructor(data = {}) {
        super(data);
        this._velocity = new Vector();
        this._properTime = 0;
        this._lorentzFactor = 1;
        this._mass = 1;
        Object.assign(this, data);
    }
    update(time) {
        this._position.vector = calculatePosition(this._initialPosition.vector, this._velocity.vector, time);
        this._properTime = calculateTimeDilation(Number(norm(this._velocity.vector)), time);
        this._lorentzFactor = calculateLorentzFactor(Number(norm(this._velocity.vector)));
    }
    calculateRelativisticProperties(otherObject) {
        // Relative velocity between this and other object
        const vRelative = new Vector();
        // Obtain velocity vector as numbers array from velocities vectors and positions
        const vRelativeVector = subtract(otherObject.velocity.vector, this._velocity.vector);
        vRelative.vector = vRelativeVector;
        // Relative time between this and other object
        const tRelative = calculateTimeDilation(Number(norm(vRelative.vector)), otherObject.properTime);
        // Relative mass between this and other object
        const mRelative = this._lorentzFactor * otherObject.mass;
        // Relative lorentz factor bewteen this and other object
        const lorentzFactor = calculateLorentzFactor(Number(norm(vRelative.vector)));
        return {
            vRelative: vRelative,
            tRelative: tRelative,
            mRelative: mRelative,
            lorentzFactor: lorentzFactor
        };
    }
    /** Getters */
    get properTime() {
        return this._properTime;
    }
    get position() {
        return this._position;
    }
    get velocity() {
        return this._velocity;
    }
    get mass() {
        return this._mass;
    }
    /** Setters */
    set properTime(time) {
        this._properTime = time;
    }
    set position(position) {
        this._position = position;
    }
    set velocity(velocity) {
        this._velocity = velocity;
    }
    set mass(mass) {
        this._mass = mass;
    }
}
export default SpecialRelativityObject;

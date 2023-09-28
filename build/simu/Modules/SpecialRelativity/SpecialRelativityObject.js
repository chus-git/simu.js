import { SceneObject } from "../../SceneObject";
import { Velocity } from "../../utils";
import { calculateProperTimeDueTimeDilation } from "./SpecialRelativityUtils";
import { calculatePosition } from "../Kinematics/KinematicsUtils";
class SpecialRelativityObject extends SceneObject {
    constructor(data = {}) {
        super(data);
        this._velocity = new Velocity();
        this._properTime = 0;
        this._lorentzFactor = 1;
        Object.assign(this, data);
    }
    update(time) {
        this._actualPosition.vector = calculatePosition(this._initialPosition.vector, this._velocity.vector, time);
        this._properTime = calculateProperTimeDueTimeDilation(this._velocity.vector, time);
    }
    /** Getters */
    get properTime() {
        return this._properTime;
    }
    get actualPosition() {
        return this._actualPosition;
    }
    get velocity() {
        return this._velocity;
    }
    /** Setters */
    set properTime(time) {
        this._properTime = time;
    }
    set actualPosition(position) {
        this._actualPosition = position;
    }
    set velocity(velocity) {
        this._velocity = velocity;
    }
}
export { SpecialRelativityObject };

import { SceneObject } from "../../SceneObject";
import { Velocity, Acceleration } from "../../utils";
class GravityObject extends SceneObject {
    constructor(data = {}) {
        super(data);
        this._initialVelocity = new Velocity();
        this._mass = 1;
        this._actualVelocity = new Velocity();
        this._actualAcceleration = new Acceleration();
        Object.assign(this, data);
    }
    update(time) {
    }
    /** Getters */
    get actualVelocity() {
        return this._actualVelocity;
    }
    get actualAcceleration() {
        return this._actualAcceleration;
    }
    get initialVelocity() {
        return this._initialVelocity;
    }
    get mass() {
        return this._mass;
    }
    /** Setters */
    set initialVelocity(initialVelocity) {
        this._initialVelocity = initialVelocity;
    }
}
export { GravityObject };

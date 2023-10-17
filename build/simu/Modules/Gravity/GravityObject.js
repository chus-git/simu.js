import { SceneObject } from "../../SceneObject";
import { Vector } from "../../utils";
class GravityObject extends SceneObject {
    constructor(data = {}) {
        super(data);
        this._initialVelocity = new Vector();
        this._mass = 1;
        this._actualAcceleration = new Vector();
        Object.assign(this, data);
        this._velocity = new Vector();
        this._velocity = this._initialVelocity.clone();
    }
    update(time) {
    }
    /** Getters */
    get velocity() {
        return this._velocity;
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
export default GravityObject;

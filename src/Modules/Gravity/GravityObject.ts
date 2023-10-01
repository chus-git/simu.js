import { SceneObject, ISceneObject } from "../../SceneObject";
import { Velocity, Acceleration } from "../../utils";

export interface IGravityObject extends ISceneObject {
    _initialVelocity: Velocity,
    _mass: number
}

class GravityObject extends SceneObject {

    // Initial velocity vector
    private _initialVelocity: Velocity;

    // Actual velocity vector
    private _actualVelocity: Velocity;

    // Mass in kilograms
    private _mass: number;

    // Actual acceleration vector
    private _actualAcceleration: Acceleration;

    constructor(data: Partial<IGravityObject> = {}) {

        super(data);

        this._initialVelocity = new Velocity();
        this._actualVelocity = new Velocity();
        this._mass = 1;
        this._actualAcceleration = new Acceleration();

        Object.assign(this, data);

    }

    /**
     * Calculate the position, velocity and acceleration on the indicated time.
     * It will be necessary to pay attention to the acceleration intervals to
     * which the object is subjected.
    */

    update(time: number): boolean {

        if(!super.update(time)) return false;

        // Los calculos se podrian hacer aqui

        return true;

    }

    /** Getters */

    get actualVelocity(): Velocity {
        return this._actualVelocity;
    }

    get actualAcceleration(): Acceleration {
        return this._actualAcceleration;
    }

    get initialVelocity(): Velocity {
        return this._initialVelocity;
    }

    get mass() {
        return this._mass;
    }

    /** Setters */

    set initialVelocity(initialVelocity: Velocity) {
        this._initialVelocity = initialVelocity;
    }

}

export { GravityObject };
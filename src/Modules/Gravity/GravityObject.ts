import { SceneObject, ISceneObject } from "../../SceneObject";
import { Vector } from "../../utils";

export interface IGravityObject extends ISceneObject {
    _initialVelocity: Vector,
    _mass: number
}

class GravityObject extends SceneObject {

    // Initial velocity vector
    private _initialVelocity: Vector;

    // Mass in kilograms
    private _mass: number;

    // Actual velocity vector
    private _velocity: Vector;

    // Actual acceleration vector
    private _actualAcceleration: Vector;

    constructor(data: Partial<IGravityObject> = {}) {

        super(data);

        this._initialVelocity = new Vector();
        this._mass = 1;
        this._actualAcceleration = new Vector();

        Object.assign(this, data);

        this._velocity = new Vector();
        this._velocity = this._initialVelocity.clone();

    }

    update(time: number) {



    }

    /** Getters */

    get velocity(): Vector {
        return this._velocity;
    }

    get actualAcceleration(): Vector {
        return this._actualAcceleration;
    }

    get initialVelocity(): Vector {
        return this._initialVelocity;
    }

    get mass() {
        return this._mass;
    }

    /** Setters */

    set initialVelocity(initialVelocity: Vector) {
        this._initialVelocity = initialVelocity;
    }

}

export default GravityObject;
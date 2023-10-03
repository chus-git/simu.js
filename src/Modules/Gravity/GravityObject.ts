import { Matrix, add } from "mathjs";
import { SceneObject, ISceneObject } from "../../SceneObject";
import { Velocity, Acceleration, Position } from "../../utils";
import { calculateGravityAcceleration, calculateGravityForce } from "./GravityUtils";
import { calculatePosition } from "../Kinematics/KinematicsUtils";

export interface IGravityObject extends ISceneObject {
    _initialVelocity: Velocity,
    _mass: number
}

class GravityObject extends SceneObject {

    // Initial velocity vector
    private _initialVelocity: Velocity;

    // Mass in kilograms
    private _mass: number;

    // Actual velocity vector
    private _actualVelocity: Velocity;

    // Actual acceleration vector
    private _actualAcceleration: Acceleration;

    constructor(data: Partial<IGravityObject> = {}) {

        super(data);

        this._initialVelocity = new Velocity();
        this._mass = 1;

        this._actualVelocity = new Velocity();
        this._actualAcceleration = new Acceleration();

        Object.assign(this, data);

    }

    update(time: number) {



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
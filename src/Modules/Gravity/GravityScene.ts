import { Matrix, add, distance, norm, subtract } from "mathjs";
import { Scene } from "../../Scene";
import { Acceleration, Position, Velocity } from "../../utils";
import { GravityObject, IGravityObject } from "./GravityObject";
import { G } from "../../constants";
import { calculateGravityAcceleration, calculateGravityForce } from "./GravityUtils";
import { calculatePosition, calculateVelocity } from "../Kinematics/KinematicsUtils";

class GravityScene extends Scene {

    protected _objects: GravityObject[];

    private cachedStates: GravityCachedState[];

    constructor(data: Partial<GravityScene> = {}) {

        super(data);

        this._objects = [];

        this.cachedStates = [];

        Object.assign(this, data);

    }

    addObject(object: GravityObject) {
        this._objects.push(object);
    }

    update(time: number) {

        const iterate = (dt: number, step: number = 0.01) => {

            if (!dt) return false;

            step = Math.min(dt, step);

            let iteratedTime = 0;

            while (iteratedTime < dt) {

                const stepValue = dt - iteratedTime < step ? dt - iteratedTime : step;

                // Calculate all objects acceleration on each step
                this._objects.forEach((object1: GravityObject) => {
                    let acceleration = new Acceleration();
                    this._objects.forEach((object2: GravityObject) => {
                        if (object1 !== object2) {
                            const a = calculateGravityAcceleration(object2.mass, subtract(object1.actualPosition.vector, object2.actualPosition.vector));
                            acceleration.vector = add(acceleration.vector, a);
                        }
                    });
                    object1.actualAcceleration.vector = acceleration.vector;
                });

                // Update position and velocity with calculated acceleration
                this._objects.forEach((object: GravityObject) => {
                    object.actualPosition.vector = calculatePosition(object.actualPosition.vector, object.actualVelocity.vector, stepValue, object.actualAcceleration.vector);
                    object.actualVelocity.vector = calculateVelocity(object.actualVelocity.vector, stepValue, object.actualAcceleration.vector);
                })

                iteratedTime += stepValue;

            }

        }

        // Obtain the delta time from last time update
        const dt = time - this.lastTimeUpdate;

        // Initialize time to iterate variable
        let timeToIterate;

        // If -1 <= delta time <= 1, iterate from actual state
        if (dt >= -1 && dt <= 1) {
            timeToIterate = dt;
        }

        // Else, iterate from initial state
        else {
            timeToIterate = time;
            this._objects.forEach((object: GravityObject) => {
                object.actualPosition.vector = object.initialPosition.vector;
                object.actualVelocity.vector = object.initialVelocity.vector;
            })
        }

        /**
         * <-- TODO: Store scene states in cache for big duration simulations -->
         */

        // Iterate!
        iterate(timeToIterate);

        this.lastTimeUpdate = time;

    }

}

class GravityCachedState {

    time: number;
    objects: {
        mass: number,
        position: Matrix,
        velocity: Matrix
    }[]

    constructor(data: Partial<GravityCachedState> = {}) {

        this.time = 0;
        this.objects = [];

        Object.assign(this, data);

    }

    next(dt: number) {



    }

}

export { GravityScene };
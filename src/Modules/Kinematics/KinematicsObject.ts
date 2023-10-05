import { SceneObject, ISceneObject } from "../../SceneObject";
import { Matrix, matrix, add } from 'mathjs';
import { KinematicsUtils } from "../../simu";
import { Velocity, Acceleration } from "../../utils";

export interface IKinematicsObject extends ISceneObject {
    _initialVelocity: Velocity,
    _accelerations: Acceleration[],
    _velocity: Velocity,
    _actualAcceleration: Acceleration
}

class KinematicsObject extends SceneObject {

    // Initial velocity vector
    private _initialVelocity: Velocity;

    // Actual velocity
    private _velocity: Velocity;

    // Accelerations over time
    private _accelerations: Acceleration[] = [];

    // Actual acceleration
    private _actualAcceleration: Acceleration;

    // Acceleration intervals
    private _accelerationIntervals: { startAt: number, endAt: number, duration: number, vector: Matrix }[];

    constructor(data: Partial<IKinematicsObject> = {}) {

        super(data);

        this._initialVelocity = new Velocity();
        this._velocity = new Velocity();
        this._accelerations = [];
        this._actualAcceleration = new Acceleration();
        this._accelerationIntervals = [];

        Object.assign(this, data);

        this.calculateAccelerationIntervals();

    }

    /**
     * Calculate the position, velocity and acceleration on the indicated time.
     * It will be necessary to pay attention to the acceleration intervals to
     * which the object is subjected.
    */

    update(time: number) {

        let currentPosition: Matrix = this._position.vector;
        let currentVelocity: Matrix = this._initialVelocity.vector;
        let currentAcceleration: Matrix = matrix([0, 0, 0]);

        this._accelerationIntervals.forEach((accelerationInterval) => {

            if (accelerationInterval.startAt <= time) {
                const intervalDuration = accelerationInterval.endAt < time ? accelerationInterval.duration : time - accelerationInterval.startAt;
                currentPosition = KinematicsUtils.calculatePosition(currentPosition, currentVelocity, intervalDuration, accelerationInterval.vector);
                currentVelocity = KinematicsUtils.calculateVelocity(currentVelocity, intervalDuration, accelerationInterval.vector);
            }

            if (accelerationInterval.startAt <= time && accelerationInterval.endAt >= time) {
                currentAcceleration = accelerationInterval.vector;
            }

        });

        this._position.vector = currentPosition;
        this._velocity.vector = currentVelocity;
        this._actualAcceleration.vector = currentAcceleration;

    }

    /**
     * Calculate acceleration intervals based on all provided accelerations. This must
     * be called after every this._accelerations variable modification.
     */

    calculateAccelerationIntervals(): void {

        // Get all points where accelerations change
        let points: number[] = [0, Number.MAX_VALUE];

        // Add the start and end points of each acceleration
        for (const acceleration of this._accelerations) {
            points.push(acceleration.startAt);
            points.push(acceleration.startAt + acceleration.duration);
        }

        // Remove duplicates and sort the points
        points = Array.from(new Set(points));
        points.sort((a, b) => a - b);

        // Calculate the acceleration intervals
        this._accelerationIntervals = [];

        for (let i = 1; i < points.length; i++) {

            let accelerationInterval = {
                startAt: points[i - 1],
                endAt: points[i],
                duration: points[i] - points[i - 1],
                vector: matrix([0, 0, 0])
            }

            this._accelerations.forEach((acceleration: Acceleration) => {

                if (accelerationInterval.startAt >= acceleration.startAt && accelerationInterval.endAt <= acceleration.startAt + acceleration.duration) {
                    accelerationInterval.vector = add(accelerationInterval.vector, acceleration.vector);
                }

            });

            this._accelerationIntervals.push(accelerationInterval);

        }

    }

    addAcceleration(acceleration: Acceleration) {
        this._accelerations.push(acceleration);
        this.calculateAccelerationIntervals();
    }

    removeAcceleration(acceleration: Acceleration) {

        const index = this._accelerations.indexOf(acceleration);

        if (index > -1) {
            this._accelerations.splice(index, 1);
        }

        this.calculateAccelerationIntervals();

    }

    /** Getters */

    get velocity(): Velocity {
        return this._velocity;
    }

    get actualAcceleration(): Acceleration {
        return this._actualAcceleration;
    }

    /** Setters */

    set initialVelocity(initialVelocity: Velocity) {
        this._initialVelocity = initialVelocity;
    }

    get initialVelocity(): Velocity {
        return this._initialVelocity;
    }

}

export { KinematicsObject };
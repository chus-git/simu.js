import { SceneObject, ISceneObject } from "../../SceneObject";
import { Matrix, matrix, add, multiply } from 'mathjs';

export interface IKinematicsObject extends ISceneObject {
    _initialVelocity: Matrix,
    _accelerations: Acceleration[],
    _actualVelocity: Matrix,
    _actualAcceleration: Matrix,
    _accelerationIntervals: { startAt: number, endAt: number, duration: number, value: Matrix }[],
}

class KinematicsObject extends SceneObject {

    // Initial velocity vector
    private _initialVelocity: Matrix;

    // Accelerations over time
    private _accelerations: Acceleration[] = [];

    // Actual velocity
    private _actualVelocity: Matrix;

    // Actual acceleration
    private _actualAcceleration: Matrix;

    // Acceleration intervals
    private _accelerationIntervals: { startAt: number, endAt: number, duration: number, value: Matrix }[];

    constructor(data: Partial<IKinematicsObject> = {}) {

        super(data);

        this._initialVelocity = matrix([0, 0, 0]);
        this._accelerations = [];
        this._actualVelocity = matrix([0, 0, 0]);
        this._actualAcceleration = matrix([0, 0, 0]);
        this._accelerationIntervals = [];

        Object.assign(this, data);

        this.calculateAccelerationIntervals();

    }

    update(time: number) {
console.log("Intervalos de aceleracion " + this._accelerationIntervals)
        // Initialize the current position, velocity, and acceleration to their initial values
        let currentPosition = this._initialPosition;
        let currentVelocity = this._initialVelocity;
        let currentAcceleration = matrix([0, 0, 0]);

        this._accelerationIntervals.forEach((accelerationInterval) => {
            if (accelerationInterval.startAt <= time) {

                // Calculate the duration of the current interval
                let intervalDuration = accelerationInterval.endAt < time ? accelerationInterval.duration : time - accelerationInterval.startAt;

                // Calculate the actual position at the end of this interval
                currentPosition = add(
                    add(currentPosition, multiply(currentVelocity, intervalDuration)),
                    multiply(0.5, multiply(accelerationInterval.value, Math.pow(intervalDuration, 2)))
                );

                // Calculate the actual velocity at the end of this interval
                currentVelocity = add(currentVelocity, multiply(intervalDuration, accelerationInterval.value));
            }

            if (accelerationInterval.startAt <= time && accelerationInterval.endAt >= time) {
                // Set the actual acceleration if the acceleration is occurring
                currentAcceleration = accelerationInterval.value;
            }
        });

        this._actualPosition = currentPosition;
        this._actualVelocity = currentVelocity;
        this._actualAcceleration = currentAcceleration;
console.log("Posicion final: ",this._actualPosition.toString())
    }

    /**
     * Calculate acceleration intervals based on all provided accelerations
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
                value: matrix([0, 0, 0])
            }

            this._accelerations.forEach((acceleration: Acceleration) => {

                if (accelerationInterval.startAt >= acceleration.startAt && accelerationInterval.endAt <= acceleration.startAt + acceleration.duration) {
                    accelerationInterval.value = add(accelerationInterval.value, acceleration.value);
                }

            });

            this._accelerationIntervals.push(accelerationInterval);

        }

    }

    addAcceleration(acceleration: Acceleration) {
        this._accelerations.push(acceleration);
        this.calculateAccelerationIntervals();
    }

    removeAcceleration(index: number) {

        if (index > -1 && index < this._accelerations.length) {
            this._accelerations.splice(index, 1);
            this.calculateAccelerationIntervals();
        } else {
            console.error(`Invalid index: ${index}. Cannot remove acceleration.`);
        }

    }

    /** Setters */

    set initialPosition(initialPosition: Matrix) {
        this._initialPosition = initialPosition;
    }

    set initialVelocity(initialVelocity: Matrix) {
        this._initialVelocity = initialVelocity;
    }

    set accelerationIntervals(accelerationIntervals: { startAt: number, endAt: number, duration: number, value: Matrix }[]) {
        this._accelerationIntervals = accelerationIntervals;
    }

}

export class Acceleration {

    private _value: Matrix = matrix([0, 0, 0]);

    private _startAt: number = 0;

    private _duration: number = 1;

    constructor(data: Partial<Acceleration> = {}) {
        Object.assign(this, data);
    }

    set value(value: Matrix) {
        this._value = value;
    }

    set startAt(startAt: number) {
        this._startAt = startAt;
    }

    set duration(duration: number) {
        this._duration = duration;
    }

    get value() {
        return this._value;
    }

    get startAt() {
        return this._startAt;
    }

    get duration() {
        return this._duration;
    }


}

export { KinematicsObject };
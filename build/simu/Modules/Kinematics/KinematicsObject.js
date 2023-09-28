import { SceneObject } from "../../SceneObject";
import { matrix, add } from 'mathjs';
import { KinematicsUtils } from "../../simu";
import { Velocity, Acceleration } from "../../utils";
class KinematicsObject extends SceneObject {
    constructor(data = {}) {
        super(data);
        // Accelerations over time
        this._accelerations = [];
        this._initialVelocity = new Velocity();
        this._actualVelocity = new Velocity();
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
    update(time) {
        let currentPosition = this._actualPosition.vector;
        let currentVelocity = this._initialVelocity.vector;
        let currentAcceleration = matrix([0, 0, 0]);
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
        this._actualPosition.vector = currentPosition;
        this._actualVelocity.vector = currentVelocity;
        this._actualAcceleration.vector = currentAcceleration;
    }
    /**
     * Calculate acceleration intervals based on all provided accelerations. This must
     * be called after every this._accelerations variable modification.
     */
    calculateAccelerationIntervals() {
        // Get all points where accelerations change
        let points = [0, Number.MAX_VALUE];
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
            };
            this._accelerations.forEach((acceleration) => {
                if (accelerationInterval.startAt >= acceleration.startAt && accelerationInterval.endAt <= acceleration.startAt + acceleration.duration) {
                    accelerationInterval.vector = add(accelerationInterval.vector, acceleration.vector);
                }
            });
            this._accelerationIntervals.push(accelerationInterval);
        }
    }
    addAcceleration(acceleration) {
        this._accelerations.push(acceleration);
        this.calculateAccelerationIntervals();
    }
    removeAcceleration(index) {
        if (index > -1 && index < this._accelerations.length) {
            this._accelerations.splice(index, 1);
            this.calculateAccelerationIntervals();
        }
        else {
            console.error(`Invalid index: ${index}. Cannot remove acceleration.`);
        }
    }
    /** Getters */
    get actualVelocity() {
        return this._actualVelocity;
    }
    get actualAcceleration() {
        return this._actualAcceleration;
    }
    /** Setters */
    set initialVelocity(initialVelocity) {
        this._initialVelocity = initialVelocity;
    }
    get initialVelocity() {
        return this._initialVelocity;
    }
}
export { KinematicsObject };

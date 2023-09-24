import SceneObject from "../../SceneObject";
import { matrix, add, multiply } from 'mathjs';
class KinematicsObject extends SceneObject {
    constructor(data = {}) {
        super(data);
        // Accelerations over time
        this._accelerations = [];
        this._initialVelocity = matrix([0, 0, 0]);
        this._accelerations = [];
        this._actualVelocity = matrix([0, 0, 0]);
        this._actualAcceleration = matrix([0, 0, 0]);
        this._accelerationIntervals = [];
        Object.assign(this, data);
    }
    update(time) {
        // Initialize the current position, velocity, and acceleration to their initial values
        let currentPosition = this._initialPosition;
        let currentVelocity = this._initialVelocity;
        let currentAcceleration = matrix([0, 0, 0]);
        this._accelerationIntervals.forEach((accelerationInterval) => {
            if (accelerationInterval.startAt <= time) {
                // Calculate the duration of the current interval
                let intervalDuration = accelerationInterval.endAt < time ? accelerationInterval.duration : time - accelerationInterval.startAt;
                // Calculate the actual position at the end of this interval
                currentPosition = add(add(currentPosition, multiply(currentVelocity, intervalDuration)), multiply(0.5, multiply(accelerationInterval.value, Math.pow(intervalDuration, 2))));
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
    }
    /**
     * Calculate acceleration intervals based on all provided accelerations
     */
    calculateAccelerationIntervals() {
        // Get all points where accelerations change
        let points = [0, 100000];
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
            };
            this._accelerations.forEach((acceleration) => {
                if (accelerationInterval.startAt >= acceleration.startAt && accelerationInterval.endAt <= acceleration.startAt + acceleration.duration) {
                    accelerationInterval.value = add(accelerationInterval.value, acceleration.value);
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
    /** Setters */
    set initialPosition(initialPosition) {
        this._initialPosition = initialPosition;
    }
    set initialVelocity(initialVelocity) {
        this._initialVelocity = initialVelocity;
    }
    set accelerationIntervals(accelerationIntervals) {
        this._accelerationIntervals = accelerationIntervals;
    }
}
class Acceleration {
    constructor(data = {}) {
        this._value = matrix([0, 0, 0]);
        this._startAt = 0;
        this._duration = 1;
        Object.assign(this, data);
    }
    set value(value) {
        this._value = value;
    }
    set startAt(startAt) {
        this._startAt = startAt;
    }
    set duration(duration) {
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
export default KinematicsObject;

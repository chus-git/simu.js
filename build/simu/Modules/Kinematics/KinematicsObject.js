import { add } from "mathjs";
import { SceneObject } from "../../SceneObject";
import { Vector } from "../../utils";
import { calculatePosition, calculateVelocity } from "./KinematicsUtils";
class KinematicsObject extends SceneObject {
    constructor(data = {}) {
        super(data);
        // Accelerations over time
        this._accelerations = [];
        this._initialVelocity = new Vector();
        this._velocity = new Vector();
        this._accelerations = [];
        this._acceleration = new Vector();
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
        let currentPosition = this._initialPosition.clone();
        let currentVelocity = this._initialVelocity.clone();
        let currentAcceleration = new Vector();
        this._accelerationIntervals.forEach((accelerationInterval) => {
            if (accelerationInterval.startAt <= time) {
                const intervalDuration = accelerationInterval.endAt < time ? accelerationInterval.duration : time - accelerationInterval.startAt;
                currentPosition.vector = calculatePosition(currentPosition.vector, currentVelocity.vector, intervalDuration, accelerationInterval.vector.vector);
                currentVelocity.vector = calculateVelocity(currentVelocity.vector, intervalDuration, accelerationInterval.vector.vector);
            }
            if (accelerationInterval.startAt <= time && accelerationInterval.endAt >= time) {
                currentAcceleration.vector = accelerationInterval.vector.vector;
            }
        });
        this._position = currentPosition;
        this._velocity = currentVelocity;
        this._acceleration = currentAcceleration;
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
                vector: new Vector()
            };
            this._accelerations.forEach((acceleration) => {
                if (accelerationInterval.startAt >= acceleration.startAt && accelerationInterval.endAt <= acceleration.startAt + acceleration.duration) {
                    accelerationInterval.vector.vector = add(accelerationInterval.vector.vector, acceleration.vector.vector);
                }
            });
            this._accelerationIntervals.push(accelerationInterval);
        }
    }
    addAcceleration(acceleration) {
        this._accelerations.push(acceleration);
        this.calculateAccelerationIntervals();
    }
    removeAcceleration(acceleration) {
        const index = this._accelerations.indexOf(acceleration);
        if (index > -1) {
            this._accelerations.splice(index, 1);
        }
        this.calculateAccelerationIntervals();
    }
    /** Getters */
    get velocity() {
        return this._velocity;
    }
    get acceleration() {
        return this._acceleration;
    }
    /** Setters */
    set initialVelocity(initialVelocity) {
        this._initialVelocity = initialVelocity;
    }
    get initialVelocity() {
        return this._initialVelocity;
    }
}
export default KinematicsObject;

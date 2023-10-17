import { add } from "mathjs";
import { SceneObject, ISceneObject } from "../../SceneObject";
import { Vector } from "../../utils";
import { calculatePosition, calculateVelocity } from "./KinematicsUtils";

export interface IKinematicsObject extends ISceneObject {
    _initialVelocity: Vector
}

class KinematicsObject extends SceneObject {

    // Initial velocity vector
    private _initialVelocity: Vector;

    // Actual velocity
    private _velocity: Vector;

    // Accelerations over time
    private _accelerations: { startAt: number, duration: number, vector: Vector }[] = [];

    // Actual acceleration
    private _acceleration: Vector;

    // Acceleration intervals
    private _accelerationIntervals: { startAt: number, endAt: number, duration: number, vector: Vector }[];

    constructor(data: Partial<IKinematicsObject> = {}) {

        super(data);

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

    update(time: number) {

        let currentPosition: Vector = this._initialPosition.clone();
        let currentVelocity: Vector = this._initialVelocity.clone();
        let currentAcceleration: Vector = new Vector();

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

            let accelerationInterval: {
                startAt: number,
                endAt: number,
                duration: number,
                vector: Vector
            } = {
                startAt: points[i - 1],
                endAt: points[i],
                duration: points[i] - points[i - 1],
                vector: new Vector()
            }

            this._accelerations.forEach((acceleration) => {

                if (accelerationInterval.startAt >= acceleration.startAt && accelerationInterval.endAt <= acceleration.startAt + acceleration.duration) {
                    accelerationInterval.vector.vector = add(accelerationInterval.vector.vector, acceleration.vector.vector);
                }

            });

            this._accelerationIntervals.push(accelerationInterval);

        }

    }

    addAcceleration(acceleration: { startAt: number, duration: number, vector: Vector }) {
        this._accelerations.push(acceleration);
        this.calculateAccelerationIntervals();
    }

    removeAcceleration(acceleration: { startAt: number, duration: number, vector: Vector }) {

        const index = this._accelerations.indexOf(acceleration);

        if (index > -1) {
            this._accelerations.splice(index, 1);
        }

        this.calculateAccelerationIntervals();

    }

    /** Getters */

    get velocity(): Vector {
        return this._velocity;
    }

    get acceleration(): Vector {
        return this._acceleration;
    }

    /** Setters */

    set initialVelocity(initialVelocity: Vector) {
        this._initialVelocity = initialVelocity;
    }

    get initialVelocity(): Vector {
        return this._initialVelocity;
    }

}

export default KinematicsObject;
import { Matrix, add, subtract } from "mathjs";
import { Scene } from "../../Scene";
import { Vector } from "../../utils";
import GravityObject from "./GravityObject";
import { MAX_GRAVITY_SIMULATION_DURATION } from "../../constants";
import { calculateGravityAcceleration } from "./GravityUtils";
import { calculatePosition, calculateVelocity } from "../Kinematics/KinematicsUtils";

class GravityScene extends Scene {

    protected _objects: GravityObject[];

    private cachedStates: GravityCachedScene[];

    private updatingCachedScenes: boolean;

    constructor(data: Partial<GravityScene> = {}) {

        super(data);

        this._objects = [];

        this.cachedStates = [];

        this.updatingCachedScenes = false;

        Object.assign(this, data);

    }

    // Function for obtain this object in json, obtain its size in bytes (kb) and show in an alert
    showMemoryUsage() {
        const json = JSON.stringify(this);
        const bytes = new Blob([json]).size;
        const kb = bytes / 1000;
        alert(`Memory usage: ${kb.toFixed(2)}kb`);
    }
    

    add(object: GravityObject) {
        super.add(object);
        this.updateInitialCachedState();
    }

    removeObject(object: GravityObject) {
        super.removeObject(object);
    }

    updateInitialCachedState() {

        this.cachedStates[0] = new GravityCachedScene({
            time: this.lastTimeUpdate,
            objects: this._objects.map((object: GravityObject) => {
                const result = {
                    mass: object.mass,
                    position: object.initialPosition.clone(),
                    velocity: object.initialVelocity.clone(),
                    acceleration: object.actualAcceleration.clone()
                }
                return result;
            })
        });

    }

    update(time: number): boolean {

        if (!super.update(time)) return false;

        const deltaTime = time - this.lastTimeUpdate;

        let state;

        // If only necessary do one step
        if (deltaTime > 0 && Math.abs(deltaTime) < 0.5) {

            state = new GravityCachedScene({
                time: this.lastTimeUpdate,
                objects: this._objects.map((object: GravityObject) => {
                    const result = {
                        mass: object.mass,
                        position: object.position.clone(),
                        velocity: object.velocity.clone(),
                        acceleration: object.actualAcceleration.clone()
                    }
                    return result;
                })
            });

            if (deltaTime > 0 && this.cachedStates.every(cachedState => Math.abs(cachedState.time - time) > 0.2)) {

                this.cachedStates.push(state.clone());
                console.log("State cached at second " + time.toFixed(2) + "s! Number of cached states: " + this.cachedStates.length);

                // If there are more than 10000 cached states, remove one random except first
                if (this.cachedStates.length > 10000) {
                    const index = Math.floor(Math.random() * (this.cachedStates.length - 1)) + 1;
                    this.cachedStates.splice(index, 1);
                }
            }

        }

        // If necessary do more than one step
        else {

            const closestState = this.cachedStates.reduce((prev, curr) => {
                return (Math.abs(curr.time - time) < Math.abs(prev.time - time) ? curr : prev);
            }).clone();

            if (Math.abs(closestState.time - time) > 5) {
                console.warn("Closest state is too far away! ", closestState.time, time);
                return false;
            }

            state = closestState;

        }

        state.stepTo(time);

        this.loadCachedScene(state);

        this.lastTimeUpdate = time;

        return true;

    }

    updateCachedScenes(to: number = MAX_GRAVITY_SIMULATION_DURATION, step: number = 0.005, cacheEach: number = 1) {

        const each = (cachedState: GravityCachedScene, i: number = 0) => {

            if (i <= to) {
                cachedState.stepTo(i, step);
                cachedStates.push(cachedState.clone());
                console.log(`Updating cached states... ${(i / to * 100).toFixed(1)}`)
                setTimeout(() => each(cachedState, i + cacheEach), 1);
            } else {
                this.cachedStates = cachedStates;
                console.log(`${this.cachedStates.length} estados cacheados: `, this.cachedStates)
                this.updatingCachedScenes = false;
            }

        }

        if (this.updatingCachedScenes) {
            console.warn("There is an active cached scenes update!");
            return;
        }

        this.updatingCachedScenes = true;

        let cachedStates: GravityCachedScene[] = [];

        const objects: GravityCachedObject[] = this._objects.map((object: GravityObject) => {
            const result = {
                mass: object.mass,
                position: object.position.clone(),
                velocity: object.velocity.clone(),
                acceleration: object.actualAcceleration.clone()
            }
            return result;
        });

        const cachedState: GravityCachedScene = new GravityCachedScene({
            time: 0,
            objects: objects
        });

        each(cachedState);

    }

    loadCachedScene(scene: GravityCachedScene) {

        this._objects.forEach((object: GravityObject, index: number) => {
            if (scene.objects[index] === undefined) {
                console.error("Not objects on cached scene", scene)
                return;
            }
            object.position.vector = scene.objects[index].position.clone().vector;
            object.velocity.vector = scene.objects[index].velocity.clone().vector;
            object.actualAcceleration.vector = scene.objects[index].acceleration.clone().vector;
        })

    }

}

class GravityCachedScene {

    time: number;
    objects: GravityCachedObject[];

    constructor(data: Partial<GravityCachedScene> = {}) {

        this.time = 0;
        this.objects = [];

        Object.assign(this, data);

        if (this.objects.length === 0) {
            console.warn("Empty cached scene!", data.time, data.objects);
        }

    }

    step(dt: number) {

        // Calculate all objects acceleration on each step
        this.objects.forEach((object1: GravityCachedObject) => {
            let acceleration = new Vector();
            this.objects.forEach((object2: GravityCachedObject) => {
                if (object1 !== object2) {
                    const distance = subtract(object2.position.vector, object1.position.vector);
                    const a = calculateGravityAcceleration(object2.mass, distance);
                    acceleration.vector = add(acceleration.vector, a);
                }
            });
            object1.acceleration = acceleration.clone();
        });

        // Update position and velocity with calculated acceleration
        this.objects.forEach((object: GravityCachedObject) => {
            object.position.vector = calculatePosition(object.position.vector, object.velocity.vector, dt, object.acceleration.vector);
            object.velocity.vector = calculateVelocity(object.velocity.vector, dt, object.acceleration.vector);
        })

        this.time += dt;

    }

    stepTo(to: number, step: number = 0.005) {

        if (to === this.time) return;

        const timeDiff = to - this.time;
        const stepSize = Math.sign(timeDiff) * Math.abs(step);

        while (Math.sign(timeDiff) === Math.sign(to - this.time)) {
            this.step(stepSize);
        }

    }

    clone(): GravityCachedScene {

        const clonedObjects: GravityCachedObject[] = this.objects.map(object => ({
            mass: object.mass,
            position: object.position.clone(),
            velocity: object.velocity.clone(),
            acceleration: object.acceleration.clone()
        }));

        return new GravityCachedScene({
            time: this.time,
            objects: clonedObjects
        });

    }


}

interface GravityCachedObject {
    mass: number,
    position: Vector,
    velocity: Vector,
    acceleration: Vector
}

export default GravityScene;
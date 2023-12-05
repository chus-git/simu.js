import { add, subtract } from "mathjs";
import { Scene } from "../../Scene";
import { Acceleration } from "../../utils";
import { MAX_GRAVITY_SIMULATION_DURATION } from "../../constants";
import { calculateGravityAcceleration } from "./GravityUtils";
import { calculatePosition, calculateVelocity } from "../Kinematics/KinematicsUtils";
class GravityScene extends Scene {
    constructor(data = {}) {
        super(data);
        this._objects = [];
        this.cachedStates = [];
        this.updatingCachedScenes = false;
        Object.assign(this, data);
    }
    addObject(object) {
        super.addObject(object);
    }
    removeObject(object) {
        super.removeObject(object);
    }
    update(time) {
        if (!super.update(time))
            return false;
        if (this.cachedStates.length === 0)
            return false;
        const deltaTime = time - this.lastTimeUpdate;
        let state;
        if (Math.abs(deltaTime) > 1) {
            return false;
        }
        // If only necessary do one step
        else if (Math.abs(deltaTime) < 0.5) {
            state = new GravityCachedScene({
                time: this.lastTimeUpdate,
                objects: this._objects.map((object) => {
                    const result = {
                        mass: object.mass,
                        position: object.position.vector.clone(),
                        velocity: object.velocity.vector.clone(),
                        acceleration: object.actualAcceleration.vector.clone()
                    };
                    return result;
                })
            });
            state.stepTo(time);
        }
        // If necessary do more than one step
        else {
            state = this.cachedStates.reduce((prev, curr) => {
                return (Math.abs(curr.time - time) < Math.abs(prev.time - time) ? curr : prev);
            }).clone();
            state.stepTo(time, Math.min(Math.abs(time - this.lastTimeUpdate), 1 / 60));
        }
        this.loadCachedScene(state);
        this.lastTimeUpdate = time;
        return true;
    }
    cache(to = MAX_GRAVITY_SIMULATION_DURATION, step = 0.01, cacheEach = 1) {
        if (this.updatingCachedScenes) {
            console.warn("There is an active cached scenes update!");
            return;
        }
        this.updatingCachedScenes = true;
        // Clear cached states
        this.cachedStates = [];
        let cachedStates = [];
        let objects = [];
        this._objects.forEach(o => {
            const object = {
                mass: o.mass,
                position: o.initialPosition.vector.clone(),
                velocity: o.initialVelocity.vector.clone(),
                acceleration: o.actualAcceleration.vector.clone()
            };
            objects.push(object);
        });
        // Prepare the cached 
        const cachedState = new GravityCachedScene({
            time: 0,
            objects: objects
        });
        for (let i = 0; i <= to; i += cacheEach) {
            cachedState.stepTo(i, step);
            cachedStates.push(cachedState.clone());
            console.log(`Updating cached states... ${(i / to * 100).toFixed(1)}`);
        }
        this.cachedStates = cachedStates;
        console.log(`${this.cachedStates.length} estados cacheados: `, this.cachedStates);
        this.updatingCachedScenes = false;
    }
    loadCachedScene(scene) {
        this._objects.forEach((object, index) => {
            object.position.vector = scene.objects[index].position.clone();
            object.velocity.vector = scene.objects[index].velocity.clone();
            object.actualAcceleration.vector = scene.objects[index].acceleration.clone();
        });
    }
}
class GravityCachedScene {
    constructor(data = {}) {
        this.time = 0;
        this.objects = [];
        Object.assign(this, data);
    }
    step(dt) {
        // Calculate all objects acceleration on each step
        this.objects.forEach((object1) => {
            let acceleration = new Acceleration();
            this.objects.forEach((object2) => {
                if (object1 !== object2) {
                    const distance = subtract(object2.position, object1.position);
                    const a = calculateGravityAcceleration(object2.mass, distance);
                    //console.log("Acceleration: " + acceleration.vector.toArray() + " Position 1: " + object2.position.toArray() + " Position 2: " + object1.position.toArray() + " Mass: " + object2.mass)
                    acceleration.vector = add(acceleration.vector, a);
                }
            });
            object1.acceleration = acceleration.vector.clone();
        });
        // Update position and velocity with calculated acceleration
        this.objects.forEach((object) => {
            object.position = calculatePosition(object.position, object.velocity, dt, object.acceleration);
            object.velocity = calculateVelocity(object.velocity, dt, object.acceleration);
        });
        this.time += dt;
    }
    stepTo(to, step = 0.01) {
        if (to === this.time)
            return;
        const timeDiff = to - this.time;
        const stepSize = Math.sign(timeDiff) * Math.abs(step);
        while (Math.sign(timeDiff) === Math.sign(to - this.time)) {
            this.step(stepSize);
        }
    }
    clone() {
        const clonedObjects = this.objects.map(object => ({
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
export { GravityScene };

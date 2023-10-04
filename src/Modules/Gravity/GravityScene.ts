import { Matrix, add, distance, norm, subtract } from "mathjs";
import { Scene } from "../../Scene";
import { Acceleration, Position, Velocity } from "../../utils";
import { GravityObject, IGravityObject } from "./GravityObject";
import { G, MAX_GRAVITY_SIMULATION_DURATION } from "../../constants";
import { calculateGravityAcceleration, calculateGravityForce } from "./GravityUtils";
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

    addObject(object: GravityObject) {
        super.addObject(object);
    }

    removeObject(object: GravityObject) {
        super.removeObject(object);
    }

    update(time: number): boolean {

        if (!super.update(time)) return false;
        if (this.cachedStates.length === 0) return false;

        const closestState = this.cachedStates.reduce((prev, curr) => {
            return (Math.abs(curr.time - time) < Math.abs(prev.time - time) ? curr : prev);
        }).clone();

        //console.log(`Estado cacheado más cercano a ${time}: ${closestState.time}. Objetos: `, closestState.objects);

        closestState.stepTo(time, 0.01);

        //console.log(`Se ha dado un paso de 0.2, objetos actualizados: `,closestState.objects)

        this.loadCachedScene(closestState);

        return true;

    }

    async updateCachedScenes(to: number = MAX_GRAVITY_SIMULATION_DURATION, step: number = 0.01, cacheEach: number = 1) {

        if (this.updatingCachedScenes) {
            console.warn("There is an active cached scenes update!");
            return;
        }

        this.updatingCachedScenes = true;

        // Clear cached states
        this.cachedStates = [];

        // Prepare the cached 
        const cachedState: GravityCachedScene = new GravityCachedScene({
            time: 0,
            objects: this._objects.map((object) => {
                const result = {
                    mass: object.mass,
                    position: object.initialPosition.vector,
                    velocity: object.initialVelocity.vector,
                    acceleration: object.actualAcceleration.vector
                }
                return result;
            })
        });

        for (let i = 0; i <= to; i+=cacheEach) {
            cachedState.stepTo(i, step);
            //console.log(`La posicion del objeto en el instante ${cachedState.time} es de ${cachedState.objects[1].position.get([0]).toFixed(2)}`)
            this.cachedStates.push(cachedState.clone());
        }

        console.log(`${this.cachedStates.length} estados cacheados: `, this.cachedStates)

        /*for (let i = 0; i < to / step; i++) {

            if (Number.isInteger(i * step)) {
                this.cachedStates.push(cachedState.clone());
            }

            cachedState.step(step);

        }*/

        this.updatingCachedScenes = false;

    }

    loadCachedScene(scene: GravityCachedScene) {

        this._objects.forEach((object: GravityObject, index: number) => {
            object.actualPosition.vector = scene.objects[index].position;
            object.actualVelocity.vector = scene.objects[index].velocity;
            object.actualAcceleration.vector = scene.objects[index].acceleration;
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

    }

    step(dt: number) {

        // Calculate all objects acceleration on each step
        this.objects.forEach((object1: GravityCachedObject) => {
            let acceleration = new Acceleration();
            this.objects.forEach((object2: GravityCachedObject) => {
                if (object1 !== object2) {
                    const a = calculateGravityAcceleration(object2.mass, subtract(object1.position, object2.position));
                    acceleration.vector = add(acceleration.vector, a);
                }
            });
            object1.acceleration = acceleration.vector;
        });

        // Update position and velocity with calculated acceleration
        this.objects.forEach((object: GravityCachedObject) => {
            object.position = calculatePosition(object.position, object.velocity, dt, object.acceleration);
            object.velocity = calculateVelocity(object.velocity, dt, object.acceleration);
        })

        this.time += dt;

    }

    stepTo(to: number, step: number = 0.01) {

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
    position: Matrix,
    velocity: Matrix,
    acceleration: Matrix
}

export { GravityScene };
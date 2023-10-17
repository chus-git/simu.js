import { Scene } from "../../Scene";
import { Vector } from "../../utils";
import KinematicsObject from "./KinematicsObject";

class KinematicsScene extends Scene {

    protected _objects: KinematicsObject[];

    private accelerations: { startAt: number, duration: number, vector: Vector }[];

    constructor(data: Partial<KinematicsScene> = {}) {

        super(data);

        this._objects = [];
        this.accelerations = [];

        Object.assign(this, data);

    }

    update(time: number): boolean {

        if (!super.update(time)) return false;

        this._objects.forEach((object: KinematicsObject) => {
            object.update(time);
        })
        
        return true;

    }

    add(object: KinematicsObject) {

        this._objects.push(object);

        this.accelerations.forEach((acceleration) => {
            object.addAcceleration(acceleration);
        });

    }

    addAcceleration(acceleration: { startAt: number, duration: number, vector: Vector }) {

        this.accelerations.push(acceleration);

        this._objects.forEach((object: KinematicsObject) => {
            object.addAcceleration(acceleration);
        });

    }

    removeAcceleration(acceleration: { startAt: number, duration: number, vector: Vector }) {

        const index = this.accelerations.indexOf(acceleration);

        if (index > -1) {
            this.accelerations.splice(index, 1);
        }

        this._objects.forEach((object: KinematicsObject) => {
            object.removeAcceleration(acceleration);
        });

    }

}

export default KinematicsScene;
import { Scene } from "../../Scene";
import { Vector } from "../../utils";
import KinematicsObject from "./KinematicsObject";
declare class KinematicsScene extends Scene {
    protected _objects: KinematicsObject[];
    private accelerations;
    constructor(data?: Partial<KinematicsScene>);
    update(time: number): boolean;
    add(object: KinematicsObject): void;
    addAcceleration(acceleration: {
        startAt: number;
        duration: number;
        vector: Vector;
    }): void;
    removeAcceleration(acceleration: {
        startAt: number;
        duration: number;
        vector: Vector;
    }): void;
}
export default KinematicsScene;

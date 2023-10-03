import { Scene } from "../../Scene";
import { Acceleration } from "../../utils";
import { KinematicsObject } from "./KinematicsObject";
declare class KinematicsScene extends Scene {
    protected _objects: KinematicsObject[];
    private accelerations;
    constructor(data?: Partial<KinematicsScene>);
    addObject(object: KinematicsObject): void;
    addAcceleration(acceleration: Acceleration): void;
    removeAcceleration(acceleration: Acceleration): void;
}
export { KinematicsScene };

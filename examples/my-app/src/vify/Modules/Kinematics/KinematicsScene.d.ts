import Scene from "../../Scene";
import KinematicsObject from "./KinematicsObject";
declare class KinematicsScene extends Scene {
    protected _objects: KinematicsObject[];
    constructor(data?: Partial<KinematicsScene>);
    addObject(object: KinematicsObject): void;
    update(time: number): void;
}
export default KinematicsScene;

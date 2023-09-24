import Scene from "../../Scene";
import KinematicsObject, { IKinematicsObject } from "./KinematicsObject";
declare class KinematicsScene extends Scene {
    protected _objects: KinematicsObject[];
    constructor(data?: Partial<KinematicsScene>);
    addObject(data?: Partial<IKinematicsObject>): void;
    update(time: number): void;
}
export default KinematicsScene;

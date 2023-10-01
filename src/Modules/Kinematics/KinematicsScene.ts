import { Scene } from "../../Scene";
import { KinematicsObject, IKinematicsObject } from "./KinematicsObject";

class KinematicsScene extends Scene {

    protected _objects: KinematicsObject[];

    constructor(data: Partial<KinematicsScene> = {}) {

        super(data);

        this._objects = [];

        Object.assign(this, data);

    }

    addObject(object: KinematicsObject) {
        this._objects.push(object);
    }

}

export { KinematicsScene };
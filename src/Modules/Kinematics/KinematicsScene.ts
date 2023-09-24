import Scene from "../../Scene";
import KinematicsObject, { IKinematicsObject } from "./KinematicsObject";

class KinematicsScene extends Scene {

    protected _objects: KinematicsObject[];

    constructor(data: Partial<KinematicsScene> = {}) {

        super(data);

        this._objects = [];

        Object.assign(this, data);

    }

    addObject(data: Partial<IKinematicsObject> = {}) {
        console.log("LLEGAMOS AQUI")
        const newObject: KinematicsObject = new KinematicsObject(data);

        this._objects.push(newObject);

    }

    update(time: number) {
        super.update(time);
    }

}

export default KinematicsScene;
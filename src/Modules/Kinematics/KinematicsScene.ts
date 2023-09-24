import Scene from "../../Scene";
import KinematicsObject from "./KinematicsObject";

class KinematicsScene extends Scene {

    constructor(data: Partial<KinematicsScene> = {}) {
        super(data);
        Object.assign(this, data);
    }

    addObject(object: KinematicsObject) {
        this._objects.push(object);
    }

    update(time: number) {
        super.update(time);
    }

}

export default KinematicsScene;
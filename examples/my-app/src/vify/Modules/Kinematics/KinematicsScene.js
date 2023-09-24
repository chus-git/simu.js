import Scene from "../../Scene";
import KinematicsObject from "./KinematicsObject";
class KinematicsScene extends Scene {
    constructor(data = {}) {
        super(data);
        this._objects = [];
        Object.assign(this, data);
    }
    addObject(data = {}) {
        console.log("LLEGAMOS AQUI");
        const newObject = new KinematicsObject(data);
        this._objects.push(newObject);
    }
    update(time) {
        super.update(time);
    }
}
export default KinematicsScene;

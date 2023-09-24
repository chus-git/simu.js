import Scene from "../../Scene";
class KinematicsScene extends Scene {
    constructor(data = {}) {
        super(data);
        this._objects = [];
        Object.assign(this, data);
    }
    addObject(object) {
        this._objects.push(object);
    }
    update(time) {
        super.update(time);
    }
}
export default KinematicsScene;

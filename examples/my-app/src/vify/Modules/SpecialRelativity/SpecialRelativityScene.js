import Scene from "../../Scene";
import SpecialRelativityObject from "./SpecialRelativityObject";
class SpecialRelativityScene extends Scene {
    constructor(data = {}) {
        super(data);
        this._objects = [];
        Object.assign(this, data);
    }
    addObject(data = {}) {
        const newObject = new SpecialRelativityObject(data);
        this._objects.push(newObject);
    }
    update(time) {
        super.update(time);
    }
}
export default SpecialRelativityScene;

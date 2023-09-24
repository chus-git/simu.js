import Scene from "../../Scene";
import SpecialRelativityObject from "./SpecialRelativityObject";
import { matrix } from "mathjs";
class SpecialRelativityScene extends Scene {
    constructor(data = {}) {
        super(data);
        Object.assign(this, data);
        this._objects.push(new SpecialRelativityObject({
            _velocity: matrix([SpecialRelativityObject.c * 0.9, 0, 0])
        }));
    }
    addObject(object) {
        this._objects.push(object);
    }
    update(time) {
        super.update(time);
    }
}
export default SpecialRelativityScene;

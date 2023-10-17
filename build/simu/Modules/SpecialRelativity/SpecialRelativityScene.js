import { Scene } from "../../Scene";
class SpecialRelativityScene extends Scene {
    constructor(data = {}) {
        super(data);
        this._objects = [];
        Object.assign(this, data);
    }
    add(object) {
        this._objects.push(object);
    }
}
export default SpecialRelativityScene;

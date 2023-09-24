import Scene from "../../Scene";
import SpecialRelativityObject from "./SpecialRelativityObject";
import { matrix } from "mathjs";

class SpecialRelativityScene extends Scene {

    constructor(data: Partial<SpecialRelativityScene> = {}) {
        super(data);
        Object.assign(this, data);
        this._objects.push(new SpecialRelativityObject({
            _velocity: matrix([SpecialRelativityObject.c*0.9, 0, 0])
        }));
    }

    addObject(object: SpecialRelativityObject): void {
        this._objects.push(object);
    }

    update(time: number) {
        super.update(time);
    }

}

export default SpecialRelativityScene;
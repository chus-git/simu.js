import { Scene } from "../../Scene";
import { SpecialRelativityObject, ISpecialRelativityObject} from "./SpecialRelativityObject";
import { matrix } from "mathjs";

class SpecialRelativityScene extends Scene {

    protected _objects: SpecialRelativityObject[];

    constructor(data: Partial<SpecialRelativityScene> = {}) {

        super(data);

        this._objects = [];

        Object.assign(this, data);
        
    }

    addObject(object: SpecialRelativityObject): void {
        this._objects.push(object);
    }

}

export { SpecialRelativityScene };
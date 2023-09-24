import Scene from "../../Scene";
import SpecialRelativityObject, {ISpecialRelativityObject} from "./SpecialRelativityObject";
import { matrix } from "mathjs";

class SpecialRelativityScene extends Scene {

    protected _objects: SpecialRelativityObject[];

    constructor(data: Partial<SpecialRelativityScene> = {}) {

        super(data);

        this._objects = [];

        Object.assign(this, data);
        
    }

    addObject(data: Partial<ISpecialRelativityObject> = {}): void {

        const newObject = new SpecialRelativityObject(data);

        this._objects.push(newObject);
    }

    update(time: number) {
        super.update(time);
    }

}

export default SpecialRelativityScene;
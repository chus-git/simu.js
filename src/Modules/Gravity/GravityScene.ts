import { Scene } from "../../Scene";
import { GravityObject } from "./GravityObject";

class GravityScene extends Scene {

    protected _objects: GravityObject[];

    constructor(data: Partial<GravityScene> = {}) {

        super(data);

        this._objects = [];

        Object.assign(this, data);

    }

    addObject(object: GravityObject) {
        this._objects.push(object);
    }

    update(time: number) {

        this._objects.forEach((object: GravityObject) => {
            object.update(time);
        });

    }

}

export { GravityScene };
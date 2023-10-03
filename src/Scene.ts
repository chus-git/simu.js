import {SceneObject, ISceneObject } from "./SceneObject";
import { GravityObject, GravityScene } from "./simu";

class Scene {

    // Simulation objects
    protected _objects: SceneObject[];

    protected lastTimeUpdate: number;

    constructor(data: Partial<Scene> = {}) {

        this._objects = [];

        this.lastTimeUpdate = 0;

        Object.assign(this, data);
    }

    update(time: number) {
        this._objects.forEach((object: SceneObject) => {
            object.update(time);
        });
    }

    addObject(object: SceneObject) {
        this._objects.push(object);
    }

    get objects() {
        return this._objects;
    }

    set objects(objects: SceneObject[]) {
        this._objects = objects;
    }

}

export { Scene };
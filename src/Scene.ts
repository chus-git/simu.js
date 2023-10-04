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

    update(time: number): boolean {

        if(this.lastTimeUpdate === time) return false;

        return true;

    }

    addObject(object: SceneObject) {
        this._objects.push(object);
    }

    removeObject(object: SceneObject) {
        const index = this._objects.indexOf(object);
        if (index > -1) {
            this._objects.splice(index, 1);
        }
    }

    get objects() {
        return this._objects;
    }

    set objects(objects: SceneObject[]) {
        this._objects = objects;
    }

}

export { Scene };
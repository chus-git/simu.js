import SceneObject, { ISceneObject } from "./SceneObject";

class Scene {

    // Simulation objects
    protected _objects: SceneObject[];

    constructor(data: Partial<Scene> = {}) {

        this._objects = [];

        Object.assign(this, data);
    }

    update(time: number) {
        this._objects.forEach((object: SceneObject) => {
            object.update(time);
        });
    }

    addObject(data: Partial<ISceneObject> = {}) {

        const newObject: SceneObject = new SceneObject(data);

        this._objects.push(newObject);
    }

    get objects() {
        return this._objects;
    }

    set objects(objects: SceneObject[]) {
        this._objects = objects;
    }

}

export default Scene;
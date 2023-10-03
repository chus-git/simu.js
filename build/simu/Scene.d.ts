import { SceneObject } from "./SceneObject";
declare class Scene {
    protected _objects: SceneObject[];
    protected lastTimeUpdate: number;
    constructor(data?: Partial<Scene>);
    update(time: number): void;
    addObject(object: SceneObject): void;
    get objects(): SceneObject[];
    set objects(objects: SceneObject[]);
}
export { Scene };

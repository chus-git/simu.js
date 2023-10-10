import { SceneObject } from "./SceneObject";
declare class Scene {
    protected _objects: SceneObject[];
    protected lastTimeUpdate: number;
    constructor(data?: Partial<Scene>);
    update(time: number): boolean;
    addObject(object: SceneObject): void;
    removeObject(object: SceneObject): void;
    get objects(): SceneObject[];
    set objects(objects: SceneObject[]);
}
export { Scene };

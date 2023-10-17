import { SceneObject } from "./SceneObject";
declare class Scene {
    protected _objects: Object[];
    protected lastTimeUpdate: number;
    constructor(data?: Partial<Scene>);
    update(time: number): boolean;
    add(object: SceneObject): void;
    removeObject(object: SceneObject): void;
    get objects(): Object[];
    set objects(objects: Object[]);
}
export { Scene };

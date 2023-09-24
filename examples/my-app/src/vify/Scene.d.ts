import SceneObject, { ISceneObject } from "./SceneObject";
declare class Scene {
    protected _objects: SceneObject[];
    constructor(data?: Partial<Scene>);
    update(time: number): void;
    addObject(data?: Partial<ISceneObject>): void;
    get objects(): SceneObject[];
    set objects(objects: SceneObject[]);
}
export default Scene;

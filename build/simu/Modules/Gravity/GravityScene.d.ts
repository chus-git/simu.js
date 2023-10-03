import { Scene } from "../../Scene";
import { GravityObject } from "./GravityObject";
declare class GravityScene extends Scene {
    protected _objects: GravityObject[];
    private cachedStates;
    constructor(data?: Partial<GravityScene>);
    addObject(object: GravityObject): void;
    update(time: number): void;
}
export { GravityScene };

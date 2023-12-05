import { Matrix } from "mathjs";
import { Scene } from "../../Scene";
import { GravityObject } from "./GravityObject";
declare class GravityScene extends Scene {
    protected _objects: GravityObject[];
    private cachedStates;
    private updatingCachedScenes;
    constructor(data?: Partial<GravityScene>);
    addObject(object: GravityObject): void;
    removeObject(object: GravityObject): void;
    update(time: number): boolean;
    cache(to?: number, step?: number, cacheEach?: number): void;
    loadCachedScene(scene: GravityCachedScene): void;
}
declare class GravityCachedScene {
    time: number;
    objects: GravityCachedObject[];
    constructor(data?: Partial<GravityCachedScene>);
    step(dt: number): void;
    stepTo(to: number, step?: number): void;
    clone(): GravityCachedScene;
}
interface GravityCachedObject {
    mass: number;
    position: Matrix;
    velocity: Matrix;
    acceleration: Matrix;
}
export { GravityScene };

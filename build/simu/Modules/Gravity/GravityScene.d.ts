import { Scene } from "../../Scene";
import { Vector } from "../../utils";
import GravityObject from "./GravityObject";
declare class GravityScene extends Scene {
    protected _objects: GravityObject[];
    private cachedStates;
    private updatingCachedScenes;
    constructor(data?: Partial<GravityScene>);
    showMemoryUsage(): void;
    add(object: GravityObject): void;
    removeObject(object: GravityObject): void;
    updateInitialCachedState(): void;
    update(time: number): boolean;
    updateCachedScenes(to?: number, step?: number, cacheEach?: number): void;
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
    position: Vector;
    velocity: Vector;
    acceleration: Vector;
}
export default GravityScene;

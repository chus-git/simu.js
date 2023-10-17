import { Vector } from "./utils";
export interface ISceneObject {
    _name: string;
    _icon: string;
    _initialPosition: Vector;
    _position: Vector;
}
declare class SceneObject {
    private _name;
    protected _initialPosition: Vector;
    protected _position: Vector;
    constructor(data?: Partial<ISceneObject>);
    update(time: number): void;
    /** Getters */
    get name(): string;
    get initialPosition(): Vector;
    get position(): Vector;
    /** Setters */
    set name(name: string);
    set initialPosition(position: Vector);
}
export { SceneObject };

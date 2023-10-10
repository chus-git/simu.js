import { Position } from "./utils";
export interface ISceneObject {
    _name: string;
    _icon: string;
    _initialPosition: Position;
    _position: Position;
}
declare class SceneObject {
    private _name;
    protected _initialPosition: Position;
    protected _position: Position;
    constructor(data?: Partial<ISceneObject>);
    update(time: number): void;
    /** Getters */
    get name(): string;
    get initialPosition(): Position;
    get position(): Position;
    /** Setters */
    set name(name: string);
    set initialPosition(position: Position);
}
export { SceneObject };

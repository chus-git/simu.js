import { Matrix } from "mathjs";
export interface ISceneObject {
    _name: string;
    _icon: string;
    _initialPosition: Matrix;
    _actualPosition: Matrix;
}
declare class SceneObject {
    private _name;
    private _icon;
    protected _initialPosition: Matrix;
    protected _actualPosition: Matrix;
    constructor(data?: Partial<ISceneObject>);
    update(time: number): void;
    get name(): string;
    set name(name: string);
    get icon(): string;
    set icon(icon: string);
    get initialPosition(): Matrix;
    set initialPosition(position: Matrix);
    get actualPosition(): Matrix;
    set actualPosition(position: Matrix);
}
export default SceneObject;

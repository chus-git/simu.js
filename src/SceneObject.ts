import { matrix, Matrix } from "mathjs";

export interface ISceneObject {
    _name: string,
    _icon: string,
    _initialPosition: Matrix,
    _actualPosition: Matrix
}

class SceneObject {

    // Object name
    private _name: string;

    // Object icon
    private _icon: string;

    // Initial object position
    protected _initialPosition: Matrix;

    // Actual object position
    protected _actualPosition: Matrix;

    constructor(data: Partial<ISceneObject> = {}) {

        this._name = "New object";
        this._icon = "default.png";
        this._initialPosition = matrix([0, 0, 0]);
        this._actualPosition = matrix([0, 0, 0]);

        Object.assign(this, data);
    }

    update(time: number) {
        
    }

    get name(): string {
        return this._name;
    }

    set name(name: string) {
        this._name = name;
    }

    get icon(): string {
        return this._icon;
    }

    set icon(icon: string) {
        this._icon = icon;
    }

    get initialPosition(): Matrix {
        return this._initialPosition;
    }

    set initialPosition(position: Matrix) {
        this._initialPosition = position;
    }

    get actualPosition(): Matrix {
        return this._actualPosition;
    }

}

export { SceneObject };
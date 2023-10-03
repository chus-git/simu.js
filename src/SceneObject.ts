import { matrix, Matrix } from "mathjs";
import { Position } from "./utils";

export interface ISceneObject {
    _name: string,
    _icon: string,
    _initialPosition: Position,
    _actualPosition: Position
}

class SceneObject {

    // Object name
    private _name: string;

    // Initial object position
    protected _initialPosition: Position;

    // Actual object position
    protected _actualPosition: Position;

    constructor(data: Partial<ISceneObject> = {}) {

        this._name = "New object";
        this._initialPosition = new Position();
        this._actualPosition = new Position();

        Object.assign(this, data);
    }

    update(time: number) {



    }

    /** Getters */

    get name(): string {
        return this._name;
    }

    get initialPosition(): Position {
        return this._initialPosition;
    }

    get actualPosition(): Position {
        return this._actualPosition;
    }

    /** Setters */

    set name(name: string) {
        this._name = name;
    }

    set initialPosition(position: Position) {
        this._initialPosition = position;
    }

}

export { SceneObject };
import { matrix, Matrix } from "mathjs";
import { Position } from "./utils";

export interface ISceneObject {
    _name: string,
    _icon: string,
    _initialPosition: Position,
    _position: Position
}

class SceneObject {

    // Object name
    private _name: string;

    // Initial object position
    protected _initialPosition: Position;

    // Actual object position
    protected _position: Position;

    constructor(data: Partial<ISceneObject> = {}) {

        this._name = "New object";
        this._initialPosition = new Position();

        Object.assign(this, data);

        this._position = new Position();
        this._position.vector = this._initialPosition.vector.clone();

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

    get position(): Position {
        return this._position;
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
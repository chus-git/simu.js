import { Vector } from "./utils";

export interface ISceneObject {
    _name: string,
    _icon: string,
    _initialPosition: Vector,
    _position: Vector
}

class SceneObject {

    // Object name
    private _name: string;

    // Initial object position
    protected _initialPosition: Vector;

    // Actual object position
    protected _position: Vector;

    constructor(data: Partial<ISceneObject> = {}) {

        this._name = "New object";
        this._initialPosition = new Vector();

        Object.assign(this, data);

        this._position = new Vector();
        this._position = this._initialPosition.clone();

    }

    update(time: number) {



    }

    /** Getters */

    get name(): string {
        return this._name;
    }

    get initialPosition(): Vector {
        return this._initialPosition;
    }

    get position(): Vector {
        return this._position;
    }

    /** Setters */

    set name(name: string) {
        this._name = name;
    }

    set initialPosition(position: Vector) {
        this._initialPosition = position;
    }

}

export { SceneObject };
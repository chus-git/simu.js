import { Position } from "./utils";
class SceneObject {
    constructor(data = {}) {
        this._name = "New object";
        this._initialPosition = new Position();
        Object.assign(this, data);
        this._position = new Position();
        this._position.vector = this._initialPosition.vector.clone();
    }
    update(time) {
    }
    /** Getters */
    get name() {
        return this._name;
    }
    get initialPosition() {
        return this._initialPosition;
    }
    get position() {
        return this._position;
    }
    /** Setters */
    set name(name) {
        this._name = name;
    }
    set initialPosition(position) {
        this._initialPosition = position;
    }
}
export { SceneObject };

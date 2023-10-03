import { Position } from "./utils";
class SceneObject {
    constructor(data = {}) {
        this._name = "New object";
        this._initialPosition = new Position();
        this._actualPosition = new Position();
        Object.assign(this, data);
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
    get actualPosition() {
        return this._actualPosition;
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

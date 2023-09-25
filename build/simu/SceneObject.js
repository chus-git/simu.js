import { matrix } from "mathjs";
class SceneObject {
    constructor(data = {}) {
        this._name = "New object";
        this._icon = "default.png";
        this._initialPosition = matrix([0, 0, 0]);
        this._actualPosition = matrix([0, 0, 0]);
        Object.assign(this, data);
    }
    update(time) {
    }
    get name() {
        return this._name;
    }
    set name(name) {
        this._name = name;
    }
    get icon() {
        return this._icon;
    }
    set icon(icon) {
        this._icon = icon;
    }
    get initialPosition() {
        return this._initialPosition;
    }
    set initialPosition(position) {
        this._initialPosition = position;
    }
    get actualPosition() {
        return this._actualPosition;
    }
}
export { SceneObject };

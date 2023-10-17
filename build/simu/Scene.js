class Scene {
    constructor(data = {}) {
        this._objects = [];
        this.lastTimeUpdate = 0;
        Object.assign(this, data);
    }
    update(time) {
        if (this.lastTimeUpdate === time)
            return false;
        return true;
    }
    add(object) {
        this._objects.push(object);
    }
    removeObject(object) {
        const index = this._objects.indexOf(object);
        if (index > -1) {
            this._objects.splice(index, 1);
        }
    }
    get objects() {
        return this._objects;
    }
    set objects(objects) {
        this._objects = objects;
    }
}
export { Scene };

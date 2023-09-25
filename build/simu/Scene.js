class Scene {
    constructor(data = {}) {
        this._objects = [];
        Object.assign(this, data);
    }
    update(time) {
        this._objects.forEach((object) => {
            object.update(time);
        });
    }
    addObject(object) {
        this._objects.push(object);
    }
    get objects() {
        return this._objects;
    }
    set objects(objects) {
        this._objects = objects;
    }
}
export { Scene };

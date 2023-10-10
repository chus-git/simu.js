import { Scene } from "../../Scene";
class KinematicsScene extends Scene {
    constructor(data = {}) {
        super(data);
        this._objects = [];
        this.accelerations = [];
        Object.assign(this, data);
    }
    addObject(object) {
        this._objects.push(object);
        this.accelerations.forEach((acceleration) => {
            object.addAcceleration(acceleration);
        });
    }
    addAcceleration(acceleration) {
        this.accelerations.push(acceleration);
        this._objects.forEach((object) => {
            object.addAcceleration(acceleration);
        });
    }
    removeAcceleration(acceleration) {
        const index = this.accelerations.indexOf(acceleration);
        if (index > -1) {
            this.accelerations.splice(index, 1);
        }
        this._objects.forEach((object) => {
            object.removeAcceleration(acceleration);
        });
    }
}
export { KinematicsScene };

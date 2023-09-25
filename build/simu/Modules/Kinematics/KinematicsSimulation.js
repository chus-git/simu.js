import { Simulation } from "../../Simulation";
import { KinematicsScene } from "./KinematicsScene";
class KinematicsSimulation extends Simulation {
    constructor(data = {}) {
        super(data);
        this._scene = new KinematicsScene();
        Object.assign(this, data);
    }
}
export { KinematicsSimulation };

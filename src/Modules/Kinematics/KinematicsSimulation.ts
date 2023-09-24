import { Simulation } from "../../Simulation";
import { KinematicsScene } from "./KinematicsScene";

class KinematicsSimulation extends Simulation {

    protected _scene: KinematicsScene;

    constructor(data: Partial<KinematicsSimulation> = {}) {

        super(data);

        this._scene = new KinematicsScene();

        Object.assign(this, data);

    }

}

export { KinematicsSimulation };
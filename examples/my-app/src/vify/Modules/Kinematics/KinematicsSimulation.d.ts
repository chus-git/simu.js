import Simulation from "../../Simulation";
import KinematicsScene from "./KinematicsScene";
declare class KinematicsSimulation extends Simulation {
    protected _scene: KinematicsScene;
    constructor(data?: Partial<KinematicsSimulation>);
}
export default KinematicsSimulation;

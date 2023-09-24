import Simulation from "../../Simulation";
import SpecialRelativityScene from "./SpecialRelativityScene";
declare class SpecialRelativitySimulation extends Simulation {
    protected _scene: SpecialRelativityScene;
    constructor(data?: Partial<SpecialRelativitySimulation>);
}
export default SpecialRelativitySimulation;

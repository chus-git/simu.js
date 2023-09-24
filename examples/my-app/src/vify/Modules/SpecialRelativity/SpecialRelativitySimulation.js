import Simulation from "../../Simulation";
import SpecialRelativityScene from "./SpecialRelativityScene";
class SpecialRelativitySimulation extends Simulation {
    constructor(data = {}) {
        super(data);
        this._scene = new SpecialRelativityScene();
        Object.assign(this, data);
    }
}
export default SpecialRelativitySimulation;

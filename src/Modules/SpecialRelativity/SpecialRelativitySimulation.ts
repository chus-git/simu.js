import Simulation from "../../Simulation";
import SpecialRelativityScene from "./SpecialRelativityScene";

class SpecialRelativitySimulation extends Simulation {

    protected _scene: SpecialRelativityScene;

    constructor(data: Partial<SpecialRelativitySimulation> = {}) {

        super(data);

        this._scene = new SpecialRelativityScene();

        Object.assign(this, data);

    }

}

export default SpecialRelativitySimulation;
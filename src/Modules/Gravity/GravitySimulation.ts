import { Simulation } from "../../Simulation";
import { MAX_GRAVITY_SIMULATION_DURATION } from "../../constants";
import { GravityScene } from "./GravityScene";

class GravitySimulation extends Simulation {

    protected _scene: GravityScene;

    constructor(data: Partial<GravitySimulation> = {}) {

        super(data);

        this._scene = new GravityScene();
        this._duration = MAX_GRAVITY_SIMULATION_DURATION;

        Object.assign(this, data);

    }

    set duration(duration: number) {
        const minDuration = Math.min(duration, MAX_GRAVITY_SIMULATION_DURATION);
        this._duration = minDuration;
    }

}

export { GravitySimulation };
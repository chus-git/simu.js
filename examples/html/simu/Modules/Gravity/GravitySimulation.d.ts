import { Simulation } from "../../Simulation";
import { GravityScene } from "./GravityScene";
declare class GravitySimulation extends Simulation {
    protected _scene: GravityScene;
    constructor(data?: Partial<GravitySimulation>);
    set duration(duration: number);
}
export { GravitySimulation };

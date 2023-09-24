import Scene from "../../Scene";
import SpecialRelativityObject from "./SpecialRelativityObject";
declare class SpecialRelativityScene extends Scene {
    constructor(data?: Partial<SpecialRelativityScene>);
    addObject(object: SpecialRelativityObject): void;
    update(time: number): void;
}
export default SpecialRelativityScene;

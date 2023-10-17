import { Scene } from "../../Scene";
import SpecialRelativityObject from "./SpecialRelativityObject";
declare class SpecialRelativityScene extends Scene {
    protected _objects: SpecialRelativityObject[];
    constructor(data?: Partial<SpecialRelativityScene>);
    add(object: SpecialRelativityObject): void;
}
export default SpecialRelativityScene;

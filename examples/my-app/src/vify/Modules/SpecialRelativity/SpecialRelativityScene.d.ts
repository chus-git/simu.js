import Scene from "../../Scene";
import SpecialRelativityObject, { ISpecialRelativityObject } from "./SpecialRelativityObject";
declare class SpecialRelativityScene extends Scene {
    protected _objects: SpecialRelativityObject[];
    constructor(data?: Partial<SpecialRelativityScene>);
    addObject(data?: Partial<ISpecialRelativityObject>): void;
    update(time: number): void;
}
export default SpecialRelativityScene;

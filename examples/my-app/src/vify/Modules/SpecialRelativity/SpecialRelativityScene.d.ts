import { Scene } from "../../Scene";
import { SpecialRelativityObject } from "./SpecialRelativityObject";
declare class SpecialRelativityScene extends Scene {
    protected _objects: SpecialRelativityObject[];
    constructor(data?: Partial<SpecialRelativityScene>);
    addObject(object: SpecialRelativityObject): void;
    update(time: number): void;
}
export { SpecialRelativityScene };

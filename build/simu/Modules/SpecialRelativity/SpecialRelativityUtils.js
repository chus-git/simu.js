import { norm } from "mathjs";
import { SPEED_OF_LIGHT } from "../../constants";
const calculateTimeDilation = (v0, t) => {
    const properTime = t / Math.sqrt((1 - (Math.pow(Number(norm(v0)), 2) / Math.pow(SPEED_OF_LIGHT, 2))));
    return properTime;
};
export { calculateTimeDilation };

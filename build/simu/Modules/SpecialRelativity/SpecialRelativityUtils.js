import { SPEED_OF_LIGHT } from "../../constants";
const calculateTimeDilation = (v, t) => {
    const properTime = t / Math.sqrt((1 - Math.pow(v, 2) / Math.pow(SPEED_OF_LIGHT, 2)));
    return properTime;
};
const calculateLorentzFactor = (v) => {
    const lorentzFactor = 1 / (Math.sqrt(1 - v) / Math.pow(SPEED_OF_LIGHT, 2));
    return lorentzFactor;
};
export { calculateTimeDilation, calculateLorentzFactor };

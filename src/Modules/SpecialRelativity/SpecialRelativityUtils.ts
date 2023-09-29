import { SPEED_OF_LIGHT } from "../../constants";

const calculateTimeDilation = (v: number, t: number) => {
    const properTime = t / Math.sqrt((1 - v ** 2 / SPEED_OF_LIGHT ** 2));
    return properTime;
}

const calculateLorentzFactor = (v: number) => {
    const lorentzFactor = 1 / (Math.sqrt(1 - v) / SPEED_OF_LIGHT ** 2);
    return lorentzFactor;
}

export { calculateTimeDilation, calculateLorentzFactor };
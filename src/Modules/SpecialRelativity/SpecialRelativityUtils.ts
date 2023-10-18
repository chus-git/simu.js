import { SPEED_OF_LIGHT } from "../../constants";

// Calculate time dilation with the formula: t' = t / sqrt(1 - (v^2 / c^2))
const calculateTimeDilation = (v: number, t: number) => {
    const properTime = t / Math.sqrt(1 - (Math.pow(v, 2) / Math.pow(SPEED_OF_LIGHT, 2)));
    return properTime;
}

// Calculate lorentz factor with the formula: gamma = 1 / sqrt(1 - (v^2 / c^2))
const calculateLorentzFactor = (v: number) => {
    const lorentzFactor = 1 / Math.sqrt(1 - (Math.pow(v, 2) / Math.pow(SPEED_OF_LIGHT, 2)));
    return lorentzFactor;
}

export { calculateTimeDilation, calculateLorentzFactor };
// vify.ts
export { Simulation, SimulationState } from './Simulation';
export { Scene } from './Scene';
export { SceneObject } from './SceneObject';
export { KinematicsSimulation } from './Modules/Kinematics/KinematicsSimulation';
export { KinematicsScene } from './Modules/Kinematics/KinematicsScene';
export { KinematicsObject } from './Modules/Kinematics/KinematicsObject';
export { SpecialRelativitySimulation } from './Modules/SpecialRelativity/SpecialRelativitySimulation';
export { SpecialRelativityScene } from './Modules/SpecialRelativity/SpecialRelativityScene';
export { SpecialRelativityObject } from './Modules/SpecialRelativity/SpecialRelativityObject';
export * from './constants';
import { matrix } from 'mathjs';
export const vector2 = (x = 0, y = 0) => {
    return matrix([x, y]);
};
export const vector3 = (x = 0, y = 0, z = 0) => {
    return matrix([x, y, z]);
};

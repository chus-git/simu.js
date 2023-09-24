// simu.ts

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

import { matrix, Matrix } from 'mathjs';

export const vector2 = (x: number = 0, y: number = 0): Matrix => {
    return matrix([x, y, 0]);
}

export const vector3 = (x: number = 0, y: number = 0, z: number = 0): Matrix => {
    return matrix([x, y, z]);
}
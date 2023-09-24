import KinematicsSimulation from './Modules/Kinematics/KinematicsSimulation';
import SpecialRelativitySimulation from './Modules/SpecialRelativity/SpecialRelativitySimulation';
declare class Vify {
    static KinematicsSimulation(data?: Partial<KinematicsSimulation>): KinematicsSimulation;
    static SpecialRelativitySimulation(data?: Partial<SpecialRelativitySimulation>): SpecialRelativitySimulation;
}
export default Vify;

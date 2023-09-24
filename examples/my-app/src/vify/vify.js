// vify.ts
import KinematicsSimulation from './Modules/Kinematics/KinematicsSimulation';
import SpecialRelativitySimulation from './Modules/SpecialRelativity/SpecialRelativitySimulation';
class Vify {
    static KinematicsSimulation(data = {}) {
        return new KinematicsSimulation(data);
    }
    static SpecialRelativitySimulation(data = {}) {
        return new SpecialRelativitySimulation(data);
    }
}
export default Vify;

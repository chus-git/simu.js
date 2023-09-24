// vify.ts

import KinematicsSimulation from './Modules/Kinematics/KinematicsSimulation';
import SpecialRelativitySimulation from './Modules/SpecialRelativity/SpecialRelativitySimulation';

class Vify {

    public static KinematicsSimulation(data: Partial<KinematicsSimulation> = {}): KinematicsSimulation {
        return new KinematicsSimulation(data);
    }

    public static SpecialRelativitySimulation(data: Partial<SpecialRelativitySimulation> = {}): SpecialRelativitySimulation {
        return new SpecialRelativitySimulation(data);
    }

}

export default Vify;
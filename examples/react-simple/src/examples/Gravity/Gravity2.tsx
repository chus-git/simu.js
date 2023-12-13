import { useEffect, useState } from 'react';
import * as SIMU from '../../../../../build/simu/simu';
import * as Three from './Three';

function GravityExample() {

    const [simulation, setSimulation] = useState(new SIMU.Simulation({
        _duration: 1000,
        _playbackSpeed: 1
    }));

    const [scene, setScene] = useState(new SIMU.Gravity.Scene());

    const [earth, setEarth] = useState(new SIMU.Gravity.Object({
        _mass: 10e11
    }));

    const [moon, setMoon] = useState(new SIMU.Gravity.Object({
        _mass: 1,
        _initialPosition: SIMU.vector(50, 0),
        _initialVelocity: SIMU.vector(0, 0.5)
    }));

    const [moon2, setMoon2] = useState(new SIMU.Gravity.Object({
        _mass: 10e11,
        _initialPosition: SIMU.vector(0, 50),
        _initialVelocity: SIMU.vector(-0.5, 0)
    }));

    const [moon3, setMoon3] = useState(new SIMU.Gravity.Object({
        _mass: 10e11,
        _initialPosition: SIMU.vector(0, -50),
        _initialVelocity: SIMU.vector(0.5, 0)
    }));

    const [object1, setObject1] = useState(new SIMU.Gravity.Object({
        _mass: 1,
        _initialPosition: SIMU.vector(100, 0),
        _initialVelocity: SIMU.vector(0, 1.5)
    }));

    const [object2, setObject2] = useState(new SIMU.Gravity.Object({
        _mass: 1,
        _initialPosition: SIMU.vector(0, 100),
        _initialVelocity: SIMU.vector(-1.5, 0)
    }));

    const [object3, setObject3] = useState(new SIMU.Gravity.Object({
        _mass: 1,
        _initialPosition: SIMU.vector(0, -100),
        _initialVelocity: SIMU.vector(1.5, 0)
    }));

    const [object4, setObject4] = useState(new SIMU.Gravity.Object({
        _mass: 1,
        _initialPosition: SIMU.vector(-100, 0),
        _initialVelocity: SIMU.vector(0, -1.5)
    }));

    const [simulationTime, setSimulationTime] = useState(simulation.time);

    useEffect(() => {

        simulation.loadScene(scene);

        scene.add(earth);
        scene.add(moon);

        scene.cache(100, 0.001);

        const handleUpdateSimulation = () => {
            setSimulationTime(simulation.time);
            Three.update(earth.position.vector, moon.position.vector, moon2.position.vector, moon3.position.vector, object1.position.vector, object2.position.vector, object3.position.vector, object4.position.vector);
            Three.render();
        };

        simulation.updateEventEmitter.subscribe(handleUpdateSimulation);

        return () => {
            simulation.updateEventEmitter.unsubscribe(handleUpdateSimulation);
        };

    }, []);

    const handleInputChange = (event: any) => {
        const newValue = parseFloat(event.target.value);
        simulation.time = newValue;
    };

    return (
        <>
            <div className="card" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column' }}>
                <p>{simulation.time.toFixed(2)}</p>
                <p>x{simulation.playbackSpeed}</p>
            </div>
            <button onClick={() => {
                if (simulation.state === 'play') {
                    simulation.pause();
                } else {
                    //simulation.play();
                    simulation.play();
                }
            }}>
                {simulation.state === 'play' ? 'Pause' : 'Play'}
            </button>
            <input
                type="range"
                min="0"
                max={1000}
                step="1"
                value={simulationTime}
                onChange={handleInputChange}
            />
            <input
                type="range"
                min={-16}
                max={64}
                step="1"
                value={simulation.playbackSpeed}
                onChange={(event: any) => {
                    const newValue = parseFloat(event.target.value);
                    simulation.playbackSpeed = newValue;
                }}
            />
            <button onClick={() => scene.showMemoryUsage()}>Download</button>
        </>
    )
}

export default GravityExample;

import { useEffect, useState } from 'react';
import * as SIMU from '../../../../../build/simu/simu';
import * as Three from './Three';

function GravityExample() {

    const [simulation, setSimulation] = useState(new SIMU.Simulation({
        _inLoop: true,
        _duration: 120,
        _playbackSpeed: 10
    }));

    const [scene, setScene] = useState(new SIMU.Gravity.Scene());

    const [earth, setEarth] = useState(new SIMU.Gravity.Object({
        _mass: 10e10
    }));

    const [moon, setMoon] = useState(new SIMU.Gravity.Object({
        _mass: 1,
        _position: SIMU.vector(6),
        _initialVelocity: SIMU.vector(0, 1.3)
    }));

    const [simulationTime, setSimulationTime] = useState(simulation.time);

    useEffect(() => {

        simulation.loadScene(scene);

        scene.add(earth);
        scene.add(moon);

        scene.updateCachedScenes(12000);

        const handleUpdateSimulation = () => {
            setSimulationTime(simulation.time);
            Three.update(earth.position.vector, moon.position.vector);
            Three.render();
        };

        simulation.updateEventEmmitter.subscribe(handleUpdateSimulation);

        return () => {
            simulation.updateEventEmmitter.unsubscribe(handleUpdateSimulation);
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
                max={120}
                value={simulationTime}
                onChange={handleInputChange}
            />
        </>
    )
}

export default GravityExample;

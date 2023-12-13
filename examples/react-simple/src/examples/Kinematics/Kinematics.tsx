import { useEffect, useState } from 'react';
import * as SIMU from '../../../../../build/simu/simu';

function KinematicsExample() {

    const [simulation, setSimulation] = useState(new SIMU.Simulation({
        _inLoop: true,
        _duration: 60,
        _playbackSpeed: 1
    }));

    const [scene, setScene] = useState(new SIMU.Kinematics.Scene());

    const [ball, setBall] = useState(new SIMU.Kinematics.Object({
        _initialVelocity: SIMU.vector(1)
    }));

    const [simulationTime, setSimulationTime] = useState(simulation.time);

    useEffect(() => {

        simulation.loadScene(scene);

        scene.add(ball);

        const handleUpdateSimulation = () => {
            setSimulationTime(simulation.time);
            console.log(ball.position.x)
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
                <p>Position x: {ball.position.x}</p>
                <p>Velocity x: {ball.velocity.x}</p>
                <p>Acceleration x: {ball.acceleration.x}</p>
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
                max={60}
                value={simulationTime}
                onChange={handleInputChange}
            />
        </>
    )
}

export default KinematicsExample;

import { useEffect, useState } from 'react'
import * as SIMU from '../../../build/simu/simu';
import './App.css';
import * as Three from './utils/Three';

function App() {

  const [simulation, setSimulation] = useState(new SIMU.GravitySimulation({
    inLoop: true,
    duration: 60,
    playbackSpeed: 1
  }));

  const [scene, setScene] = useState(new SIMU.GravityScene());

  const [earth, setEarth] = useState(new SIMU.GravityObject({
    _mass: 10e10
  }));

  const [moon, setMoon] = useState(new SIMU.GravityObject({
    _mass: 1,
    _position: new SIMU.Position({ _x: 6 }),
    _initialVelocity: new SIMU.Velocity({ _y: 1.3 })
  }));

  const [simulationTime, setSimulationTime] = useState(simulation.time);

  useEffect(() => {

    simulation.scene = scene;

    scene.addObject(earth);
    scene.addObject(moon);

    scene.updateCachedScenes(60);

    const handleUpdateSimulation = () => {
      setSimulationTime(simulation.time);
      Three.update(earth.position.asArray(), moon.position.asArray());
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
        max={60}
        value={simulationTime}
        onChange={handleInputChange}
      />
    </>
  )
}

export default App

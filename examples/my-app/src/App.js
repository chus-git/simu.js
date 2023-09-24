import logo from './logo.svg';
import './App.css';
import Vify from './vify/vify';
import SpecialRelativityObject from './vify/Modules/SpecialRelativity/SpecialRelativityObject';
import KinematicsObject from './vify/Modules/Kinematics/KinematicsObject';
import React, { useRef, useEffect, useState } from 'react';

function App() {

  // Vify simulation
  const [simulation, setSimulation] = useState(
    Vify.SpecialRelativitySimulation({
      duration: 20,
      playbackSpeed: 1
    })
  );

  // Simulation time
  const [simulationTime, setSimulationTime] = useState(simulation.time);

  // Simulation state
  const [simualtionState, setSimulationState] = useState(simulation.state);

  useEffect(() => {

    const handleUpdateSimulation = (updatedSimulation) => {
      setSimulationTime(simulation.time);
      setSimulationState(updatedSimulation.state);
    };

    // Suscríbete al evento de actualización de la simulación
    simulation.updateEventEmmitter.subscribe(handleUpdateSimulation);

    return () => {
      simulation.updateEventEmmitter.unsubscribe(handleUpdateSimulation);
    };

  }, []);

  return (
    <div className="App">
      <div id="vify" style={{ maxWidth: '1000px', height: '500px' }}>
        <p>Tiempo de la simulación: {Math.round(simulation.time * 100) / 100} Estado: {simulation.state} </p>
        <p>Tiempo del objeto: {simulation.scene.objects[0].properTime} Estado: {simulation.state} </p>
        <button onClick={() => simulation.pause()}>Pause</button>
        <button onClick={() => simulation.play()}>Play</button>
      </div>
    </div>
  );
}

export default App;

import { useEffect, useState } from 'react'
import * as SIMU from '../../../build/simu/simu';
import './App.css';

function App() {

  // Kinematic simulation
  const [simulation, setSimulation] = useState(new SIMU.KinematicsSimulation());

  // Simulation time
  const [simulationTime, setSimulationTime] = useState(simulation.time);

  // Car acceleration
  const [carAcceleration, setCarAcceleration] = useState(new SIMU.Acceleration());

  // Car
  const [car, setCar] = useState(new SIMU.KinematicsObject({
    _name: 'Car',
    _initialPosition: new SIMU.Position(),
    _initialVelocity: new SIMU.Velocity(), // 36km/h => 10m/s
    _accelerations: [carAcceleration]
  }));

  // Car
  const [person, setPerson] = useState(new SIMU.KinematicsObject({
    _name: 'Person',
    _initialPosition: new SIMU.Position()
  }));

  useEffect(() => {

    const handleUpdateSimulation = () => {
      setSimulationTime(simulation.time);
    };

    simulation.updateEventEmmitter.subscribe(handleUpdateSimulation);

    return () => {
      simulation.updateEventEmmitter.unsubscribe(handleUpdateSimulation);
    };

  }, []);

  return (
    <>
      <div className="card" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column', width: '800px' }}>
        <header style={{ maxWidth: '600px', textAlign: 'center' }}>
          <h1 style={{ margin: '0 0 16px 0' }}>Kinematic Physics</h1>
          <p style={{ marginBottom: '30px' }}><span style={{ color: 'rgb(255 63 63)' }}><strong>Statement:</strong></span> A car is traveling at 36 km/h. There is an elderly person crossing the road 20 meters ahead. What is the minimum deceleration the car must apply to avoid hitting the elderly person?</p>
        </header>
        <div style={{ width: '100%', background: 'white', height: '400px' }}>
          
        </div>
        <button onClick={() => {
          if (simulation.state === 'play') {
            simulation.pause();
          } else {
            simulation.play();
          }
        }}>
          {simulation.state === 'play' ? 'Pause' : 'Play'}
        </button>
        <button onClick={() => {
          simulation.scene.addObject(new SIMU.KinematicsObject({
            _initialVelocity: new SIMU.Velocity({_x: 1})
          }))
        }}>
          Add object
        </button>
      </div>
    </>
  )
}

export default App

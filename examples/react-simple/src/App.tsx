import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import * as Simu from '../../../build/simu/simu';
import * as Three from 'three';
import './App.css';
import Representation from './components/Representation';

function App() {

  // Kinematic simulation
  const [simulation, setSimulation] = useState(new Simu.KinematicsSimulation());

  // Simulation time
  const [simulationTime, setSimulationTime] = useState(simulation.time);

  // Car acceleration
  const [carAcceleration, setCarAcceleration] = useState(new Simu.KinematicAcceleration());

  // Car
  const [car, setCar] = useState(new Simu.KinematicsObject({
    _name: 'Car',
    _initialPosition: Simu.vector2(0, 0),
    _initialVelocity: Simu.vector2(10, 0), // 36km/h => 10m/s
    _accelerations: [carAcceleration]
  }));

  useEffect(() => {

    simulation.scene.addObject(car);

    const handleUpdateSimulation = () => {
      setSimulationTime(simulation.time);
      console.log("car position: " + car.actualPosition.toString())
    };

    simulation.updateEventEmmitter.subscribe(handleUpdateSimulation);

    return () => {
      simulation.updateEventEmmitter.unsubscribe(handleUpdateSimulation);
    };

  }, []);

  return (
    <>
      <div className="card" style={{display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column', width: '800px'}}>
        <header style={{ maxWidth: '600px', textAlign: 'center' }}>
          <h1 style={{margin: '0 0 16px 0'}}>Kinematic Physics</h1>
          <p style={{marginBottom: '30px'}}><span style={{ color: 'rgb(255 63 63)' }}><strong>Statement:</strong></span> A car is traveling at 36km/h. There is an elderly person crossing the road 20 meters ahead. What is the minimum acceleration required for the car to avoid hitting the elderly person?</p>
        </header>
        <div style={{ width: '100%', background: 'white', height: '400px' }}>
          <Representation></Representation>
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
          simulation.scene.addObject(new Simu.KinematicsObject({
            _initialVelocity: Simu.vector2(1, 0)
          }))
        }}>
          Add object
        </button>
      </div>
    </>
  )
}

export default App

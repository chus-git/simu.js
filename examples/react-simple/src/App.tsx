import { useEffect, useState } from 'react'
import * as SIMU from '../../../build/simu/simu';
import './App.css';

function App() {

  // Kinematic simulation
  const [simulation, setSimulation] = useState(new SIMU.GravitySimulation({
    inLoop: true,
    playbackSpeed: 1,
    duration: 1000
  }));

  // Simulation time
  const [simulationTime, setSimulationTime] = useState(simulation.time);

  useEffect(() => {

    const object1 = new SIMU.GravityObject({
      _mass: 7.342e+22,
      _name: 'Luna'
    });

    const object2 = new SIMU.GravityObject({
      _initialPosition: new SIMU.Position({
        _x: -2000000
      }),
      _mass: 1,
      _name: 'Piedrecita'
    })

    const object3 = new SIMU.GravityObject({
      _initialPosition: new SIMU.Position({
        _x: -2000000
      }),
      _initialVelocity: new SIMU.Velocity({
        _x: 100,
        _y: 100,
        _z: 100,
      }),
      _mass: 1,
      _name: 'Piedrecita'
    })

    const object4 = new SIMU.GravityObject({
      _initialPosition: new SIMU.Position({
        _x: -2000000
      }),
      _initialVelocity: new SIMU.Velocity({
        _x: 100,
        _y: 100,
        _z: 100,
      }),
      _mass: 1,
      _name: 'Piedrecita'
    })

    const object5 = new SIMU.GravityObject({
      _initialPosition: new SIMU.Position({
        _x: -2000000
      }),
      _initialVelocity: new SIMU.Velocity({
        _x: 100,
        _y: 100,
        _z: 100,
      }),
      _mass: 1,
      _name: 'Piedrecita'
    })

    simulation.scene.addObject(object1);
    simulation.scene.addObject(object2);
    simulation.scene.addObject(object3);
    simulation.scene.addObject(object4);
    simulation.scene.addObject(object5);

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
        <p>{simulation.time.toFixed(2)}</p>
        <p>Actual position: {simulation.scene.objects[1]?.actualPosition.x.toFixed(2)}</p>
        <p>Actual velocity: {simulation.scene.objects[1]?.actualVelocity.x.toFixed(2)}</p>
        <p>Actual acceleration: {simulation.scene.objects[1]?.actualAcceleration.x.toFixed(2)}</p>
        <div style={{ width: '100%', background: 'white', height: '400px' }}>

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
        <button onClick={() => {
          simulation.scene.addObject(new SIMU.KinematicsObject({
            _initialVelocity: new SIMU.Velocity({ _x: 1 })
          }))
        }}>
          Add object
        </button>
        <button onClick={() => {
          simulation.time = 1;
        }}>
          1
        </button>
        <button onClick={() => {
          simulation.time = 2;
        }}>
          2
        </button>
        <button onClick={() => {
          simulation.time = 3;
        }}>
          3
        </button>
        <button onClick={() => {
          simulation.time = 10;
        }}>
          10
        </button>
        <button onClick={() => {
          simulation.time = 20;
        }}>
          20
        </button>
        <button onClick={() => {
          simulation.time = 30;
        }}>
          30
        </button>
      </div>
    </>
  )
}

export default App

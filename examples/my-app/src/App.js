import logo from './logo.svg';
import './App.css';
import Vify from './vify/vify';
import React, { useState } from 'react';
import KinematicsModule from './vify/modules/Kinematics/KinematicsModule';
import KinematicsObject from './vify/modules/Kinematics/KinematicsObject';
import Engine from './vify/Engine';

function App() {

  React.useEffect(() => {

    const vify = new Vify({
      renderElement: document.getElementById('vify'),
      engine: new Engine(
        new KinematicsModule()
      )
    });

    let object = new KinematicsObject();
    vify.engine.simulation.scene.addObject(object)
    vify.engine.simulation.toggleLooping();
    vify.engine.simulation.playbackSpeed = 0.2;
    vify.engine.simulation.resume();

  }, []);

  return (
    <div className="App" style={{display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%', height: '100vh'}}>
      <div id="vify" style={{width: '1000px', height: '500px'}}></div>
    </div>
  );
}

export default App;

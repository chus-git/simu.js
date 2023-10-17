# simu.js

[![NPM version](https://img.shields.io/npm/v/simu.svg?style=flat)](https://www.npmjs.com/package/simu) [![NPM monthly downloads](https://img.shields.io/npm/dm/simu.svg?style=flat)](https://npmjs.org/package/simu) [![NPM total downloads](https://img.shields.io/npm/dt/simu.svg?style=flat)](https://npmjs.org/package/simu)

- [Introduction](#introduction)
- [Modules](#modules)
    - [Kinematics](#kinematics)
    - [Special relativity](#special-relativity)
- [Simulation](#simulation-1)

## Introduction

This library offers a robust logic engine for simulating physics within environments of up to three dimensions. It provides a variety of pre-built modules for your convenience.

The special feature of this library is that it allows you to determine the state of a scene at any given moment by specifying only its initial properties.

## Modules

You can use different physics modules prepared to be loaded on a [simulation](#simulation). These are the ones currently available:

### Kinematics

The Kinematics module enables you to craft dynamic scenes with the flexibility to introduce accelerations that influence all objects within the scene, such as gravity or air forces, for instance.

```javascript
import * as SIMU from 'simu';

const kinematicsScene = new SIMU.Kinematics.Scene();

// Permanent acceleration (earth gravity)
kinematicsScene.addAcceleration({
    vector: SIMU.vector(0, -9.81);
});

// Point acceleration that starts at second 2 with 1s duration
kinematicsScene.addAcceleration({
    startAt: 2,
    duration: 1,
    vector: SIMU.vector(1, 0)
})
```

You have the flexibility to create kinematics objects with customizable initial properties such as position and velocity. Additionally, you can seamlessly incorporate accelerations into your object, like a vertical helicopter acceleration.

```javascript
const helicopter = new SIMU.Kinematics.Object({
    _name: 'Helicopter',
    _initialPosition: SIMU.vector(0, 100, 0);
});

// Add permanent vertical helicopter acceleration
helicopter.addAcceleration({
    vector: SIMU.vector(0, 9.81);
});

kinematicsScene.add(helicopter);
```

Using this example, you can simulate a helicopter maintaining its altitude while being affected by an airflow starting at the second 2.

```javascript
for(let i = 0; i <= 5; i++) {
    scene.update(i);
    console.log(helicopter.name + " position at second " + i + ": " + helicopter.position.vector)
}
```

Output:

```bash
"Helicopter position at second 0: [0, 10, 0]"
"Helicopter position at second 1: [0, 10, 0]"
"Helicopter position at second 2: [0, 10, 0]"
"Helicopter position at second 3: [1, 10, 0]"
"Helicopter position at second 4: [2, 10, 0]"
"Helicopter position at second 5: [3, 10, 0]"
```

### Special relativity

The Special Relativity module empowers you to construct scenes featuring objects affected by relativistic phenomena, particularly at velocities approaching the speed of light.

```javascript
import * as SIMU from 'simu';

const rocket = new SIMU.SpecialRelativity.Object({
    _name: 'Rocket',
    _velocity: SIMU.vector(SIMU.SPEED_OF_LIGHT * 0.95, 0, 0)
});

for(let i = 0; i <= 10; i++) {
    rocket.update(i);
    console.log("At second " + i + ", Rocket proper time is " + rocket.properTime)
}
```

Let's create a scene and add a second object.

```javascript
const specialRelativityScene = new SIMU.SpecialRelativity.Scene();

const mike = new SIMU.SpecialRelativity.Object({
    _name: 'Mike',
    _initialPosition: SIMU.vector(0, 0, 0),
    _velocity: SIMU.vector(0, 0, 0)
});

// Set rocket position at 1 light second away from mike
rocket.initialPosition = SIMU.vector(1/SIMU.PositionUnit.LightSeconds, 1000, 0);

specialRelativityScene.add(rocket);
specialRelativityScene.add(mike);
```

Let's observe some relativistic properties of rocket from Mike's perspective:

```javascript
let properties;

specialRelativityScene.update(60);
properties = mike.calculateRelativisticProperties(rocket);
console.log("In one minute, the rocket's time is " + properties.tRelative + " seconds behind Mike's");

specialRelativityScene.update(3600);
properties = mike.calculateRelativisticProperties(rocket);
console.log("In one hour, the rocket's time is " + properties.tRelative + " seconds behind Mike's");

specialRelativityScene.update(31536000);
properties = mike.calculateRelativisticProperties(rocket);
console.log("In one year, the rocket's time is " + properties.tRelative + " seconds behind Mike's");
```

## Simulation

A simulation is an instance that enables you to breathe life into the given scene, granting you the ability to manipulate various aspects. This includes functions such as playing, pausing, rewinding, adjusting playback speed, and establishing a maximum duration, among other features.

This is an illustrative example of how to implement a simulation using the kinematics scene as detailed in the [kinematics](#kinematics) module point:

```javascript
import * as SIMU from './simu';

const simulation = new SIMU.Simulation({
    duration: 3600,
    inLoop: true,
    playbackSpeed: 1
});

simulation.loadScene(kinematicsScene);

simulation.play();

simulation.updateEventEmmitter.subscribe((time) = {
    console.log("Helicopter's position at second " + ": " + helicopter.position.vector)
})
```

### Cloning this repository

You can clone this repository with the following command:

```sh
git clone https://github.com/chus-git/simu.js.git
```
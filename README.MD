# simu.js

[![NPM version](https://img.shields.io/npm/v/simu.svg?style=flat)](https://www.npmjs.com/package/simu) [![NPM monthly downloads](https://img.shields.io/npm/dm/simu.svg?style=flat)](https://npmjs.org/package/simu) [![NPM total downloads](https://img.shields.io/npm/dt/simu.svg?style=flat)](https://npmjs.org/package/simu)

- [Introduction](#introduction)
- [Units](#units)
- [Modules](#modules)
    - [Kinematics](#kinematics)
    - [Special relativity](#special-relativity)
- [Simulation](#simulation-1)

> Atention! This is a work in progress. The documentation is not complete and the library is not ready for production.

## Introduction

This library offers a robust logic engine for simulating physics within environments of up to three dimensions. It provides a variety of pre-built modules for your convenience.

The special feature of this library is that it allows you to determine the state of a scene at any given moment by specifying only its initial properties.

## Units

Units are expressed in the International System. You can use the following units:

### Time

Time is expressed in seconds. It is used to determine the duration of a [simulation](#simulation), set the simulation time, among other uses. Here are some examples:

```javascript
import * as SIMU from 'simu';

// A simulation that lasts 60 seconds
let simulation = new SIMU.Simulation({
    duration: 60
});

// Set simulation time to 30 seconds
simulation.time = 30;

// Update the simulation to the next second
simulation.update(simulation.time + 1);
```

### Vectors

Position, velocity and acceleration are expressed in vector units. You can create a vector in the following way:

```javascript
import * as SIMU from 'simu';

// Position x=1m, y=0m, z=0m
let position = SIMU.vector(1, 0, 0);

// Velocity x=0m/s, y=1m/s, z=0m/s
let velocity = SIMU.vector(0, 1, 0);

// Acceleration x=0m/s^2, y=0m/s^2, z=1m/s^2
let acceleration = SIMU.vector(0, 0, 1);
```

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

// Airflow acceleration that starts at second 2 with 1s duration
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
    _initialPosition: SIMU.vector(0, 10, 0);
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

Output

```bash
At second 0, Rocket proper time is 0
At second 1, Rocket proper time is 3.2025630761017405
At second 2, Rocket proper time is 6.405126152203481
At second 3, Rocket proper time is 9.60768922830522
At second 4, Rocket proper time is 12.810252304406962
At second 5, Rocket proper time is 16.0128153805087
At second 6, Rocket proper time is 19.21537845661044
At second 7, Rocket proper time is 22.41794153271218
At second 8, Rocket proper time is 25.620504608813924
At second 9, Rocket proper time is 28.823067684915664
At second 10, Rocket proper time is 32.0256307610174
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

specialRelativityScene.update(0);

let properties = mike.calculateRelativisticProperties(rocket);

// Obtaining rocket's lorentz factor
console.log("At second 0, the rocket's lorentz factor is " + properties.lorentzFactor + " from Mike's perspective");

// Obtaining rocket's velocity relative to Mike
console.log("At second 0, the rocket's velocity relative to Mike is " + properties.vRelative.vector);

// Obtaining rocket's time relative to Mike
console.log("At second 0, the rocket's time is " + (rocket.properTime - mike.properTime) + " seconds behind Mike's");

// Obtaining rocket's length in meters at different moments
let rocketLength = 10;
console.log("At second 0, the rocket's length is " + properties.lorentzFactor * rocketLength + " meters from Mike's perspective");

// Obtaining rocket's mass in kilograms
console.log("At second 0, the rocket's mass is " + properties.mRelative + " kilograms from Mike's perspective");
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

simulation.updateEventEmitter.subscribe(() = {
    console.log("Helicopter's position at second " + simulation.time + ": " + helicopter.position.vector)
})
```

### Cloning this repository

You can clone this repository with the following command:

```sh
git clone https://github.com/chus-git/simu.js.git
```
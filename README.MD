# simu.js

[![NPM version](https://img.shields.io/npm/v/simu.svg?style=flat)](https://www.npmjs.com/package/simu) [![NPM monthly downloads](https://img.shields.io/npm/dm/simu.svg?style=flat)](https://npmjs.org/package/simu) [![NPM total downloads](https://img.shields.io/npm/dt/simu.svg?style=flat)](https://npmjs.org/package/simu)

- [Introduction](#introduction)
- [Units](#units)
    - [Vectors](#vectors)
    - [Conversions](#conversions)
- [Modules](#modules)
    - [Kinematics](#kinematics)
    - [Special relativity](#special-relativity)
    - [Gravity](#gravity)
- [Simulation](#simulation)
- [Cloning this repository](#cloning-this-repository)
## Introduction

This library offers a robust logic engine for simulating physics within environments of up to three dimensions. It provides a variety of pre-built modules for your convenience.

The special feature of this library is that it allows you to determine the state of a scene at any given moment by specifying only its initial properties.

## Units

Units are expressed in the International System.

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

Access to vector components:

```javascript
console.log(position.vector); // [1, 0, 0]
console.log(velocity.vector); // [0, 1, 0]
console.log(acceleration.vector); // [0, 0, 1]

console.log(position.x); // 1
console.log(velocity.y); // 1
console.log(acceleration.z); // 1
```

Modify vector components:

```javascript
position.vector = [2, 0, 0];
velocity.y = 2;
```

Clone a vector:

```javascript
let anotherVector = position.clone();
```

### Conversions

You can convert units to other units of the same type:

```javascript
let position = SIMU.vector(1, 0);
let velocity = SIMU.vector(SIMU.SPEED_OF_LIGHT * 0.5, 0);
let acceleration = SIMU.vector(0, -SIMU.G_SUN);

// Get position as cm
console.log(position.x + "m = " + SIMU.convert(position.x, SIMU.PositionUnit.Centimeters) + "cm");

// Get velocity as c
console.log(velocity.x + "m/s = " + SIMU.convert(velocity.x, SIMU.VelocityUnit.SpeedOfLight) + "c");

// Get acceleration as km/h^2
console.log(acceleration.y + "m/s^2 = " + SIMU.convert(acceleration.y, SIMU.AccelerationUnit.KilometersPerSecondSquared) + "km/s^2");
```

Output:

```
1m = 100cm
149896229m/s = 0.49999985730156c
-274m/s^2 = -0.274km/s^2
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

### Gravity

Gravity module allows you to simulate the gravitational attraction between two objects or more objects. It's more complex than other modules because it requires to calculate the gravitational force between all objects in the scene in different moments, being necessaty to cache an entire simulation in memory, if you want to reproduce a gravity simulation.

This is an example of how to implement a gravity simulation:

```javascript
import * as SIMU from 'simu';

const earth = new SIMU.Gravity.Object({
    _name: 'Earth',
    _mass: 5.972e+24,
    _initialPosition: SIMU.vector(0, 0, 0),
    _velocity: SIMU.vector(0, 0, 0)
});

const moon = new SIMU.Gravity.Object({
    _name: 'Moon',
    _mass: 7.34767309e+22,
    _initialPosition: SIMU.vector(384400000, 0, 0),
    _velocity: SIMU.vector(0, 1022, 0)
});

const gravityScene = new SIMU.Gravity.Scene();

gravityScene.add(earth);
gravityScene.add(moon);

gravityScene.update(0);

console.log("Moon acceleration: " + moon.acceleration.vector)
```

As it have been said, if you want to reproduce a gravity simulation, you can do it reproducing it from time 0, but if you want to reproduce it from a specific time, you have to "cache" the scene with an specified duration:

```javascript
// With the code provided before

const simulation = new SIMU.Simulation();

simulation.loadScene(gravityScene);

/* Reproduce from time 0, not cache required because
* next step (0.1s-0.2s) is not far away from
* previous step (0s), so is not required too much
* processing capacity */

simulation.time = 0;
simulation.play();
simulation.pause();

/* Reproduce from time 10, cache required because next
* step (time 10s) is far away from previous step (time 0s) */

gravityScene.cache(10);
simulation.time = 10;
simulation.play();
simulation.pause();
```

You can manage the precision of the cached scene on cache() function:

```javascript
// Cache 100 seconds of simulation with a precision of 0.001 seconds between steps
gravityScene.cache(100, 0.001);

// Additionally, you can change the period scene is cached. Default is 1s, so if you indicate to cache 100s there will be 100 steps cached. The smaller the value, the less computational power will be required, but more memory will be used.
gravityScene.cache(100, 0.001, 1);
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

## Cloning this repository

You can clone this repository with the following command:

```sh
git clone https://github.com/chus-git/simu.js.git
```
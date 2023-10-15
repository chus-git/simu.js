# simu.js

[![NPM version](https://img.shields.io/npm/v/simu.svg?style=flat)](https://www.npmjs.com/package/simu) [![NPM monthly downloads](https://img.shields.io/npm/dm/simu.svg?style=flat)](https://npmjs.org/package/simu) [![NPM total downloads](https://img.shields.io/npm/dt/simu.svg?style=flat)](https://npmjs.org/package/simu)

#### JavaScript physics simulation library

This library provides a logic engine that allows you to represent physics simulations where objects interact in a 1D, 2D, or 3D space over time.

### Usage

This code creates a simulation where an object with a position and velocity moves over time in a simulation with a scene prepared for calculations in the field of kinematics. In this case, we will observe the object's position at different moments in time in a two-dimensional space.

```javascript
import * as SIMU from './simu';

const scene = new SIMU.Kinematics.Scene();

const object = new SIMU.Kinematics.Object({
    _name: 'Funny object',
    _initialVelocity: new SIMU.Vector(1, 0, 0)
});

scene.add(object);

const simulation = new SIMU.Simulation();

simulation.loadScene(scene);

for (let i = 0; i <= 10; i++) {
    simulation.time = i;
    console.log(object.name + " is at position x=" + object.position.x + "m at second " + simulation.time);
}

```

If everything went well, you should see the following output

```bash
"Funny object is at position x=0m at second 0"
"Funny object is at position x=1m at second 1"
"Funny object is at position x=2m at second 2"
"Funny object is at position x=3m at second 3"
"Funny object is at position x=4m at second 4"
"Funny object is at position x=5m at second 5"
"Funny object is at position x=6m at second 6"
"Funny object is at position x=7m at second 7"
"Funny object is at position x=8m at second 8"
"Funny object is at position x=9m at second 9"
"Funny object is at position x=10m at second 10"
```

### Cloning this repository

You can clone this repository with the following command:

```sh
git clone https://github.com/chus-git/simu.js.git
```
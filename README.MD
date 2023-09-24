# simu.js

#### JavaScript physics simulation library

This library provides a logic engine that allows you to represent physics simulations where objects interact in a 1D, 2D, or 3D space over time. It can be implemented in any web library or framework.

### Usage

This code creates a simulation where an object with a position and velocity moves over time in a simulation with a scene prepared for calculations in the field of kinematics. In this case, we will observe the object's position at different moments in time in a two-dimensional space.

```javascript
import * as Simu from 'simu';

// init

const simulation = new Simu.KinematicsSimulation();

const object = new Simu.KinematicsObject({
    _name: 'Funny object',
    _initialPosition: Simu.vector2(0, 0),
    _initialVelocity: Simu.vector2(1, 0)
});

simulation.scene.addObject(object);

simulation.setTime(1);

console.log(object.name + " is at position x=" + object.actualPosition.get([0]) + "m at second " + simulation.time);

```

If everything went well, you should see the following output

```bash
"Funny object is at position x=1m at second 1"
```

### Cloning this repository

You can clone this repository with the following command:

```sh
git clone https://github.com/chus-git/simujs.git
```
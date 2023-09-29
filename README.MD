# simu.js

#### JavaScript physics simulation library

This library provides a logic engine that allows you to represent physics simulations where objects interact in a 1D, 2D, or 3D space over time. It can be implemented in any web library or framework.

### Usage

This code creates a simulation where an object with a position and velocity moves over time in a simulation with a scene prepared for calculations in the field of kinematics. In this case, we will observe the object's position at different moments in time in a two-dimensional space.

```javascript
import * as SIMU from 'simu';

let simulation = new SIMU.KinematicsSimulation();

let object = new SIMU.KinematicsObject({
    _name: 'Funny object',
    _initialVelocity: new SIMU.Velocity({_x: 1})
});

simulation.scene.addObject(object);

simulation.time = 1;

console.log(object.name + " is at position x=" + object.actualPosition.x + "m at second " + simulation.time);

```

If everything went well, you should see the following output

```bash
"Funny object is at position x=1m at second 1"
```

### Cloning this repository

You can clone this repository with the following command:

```sh
git clone https://github.com/chus-git/simu.js.git
```
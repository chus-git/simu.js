# Introduction

Simu.js is a JavaScript library that offers a robust logic engine for simulating physics within environments of up to three dimensions. It provides a variety of pre-built modules for your convenience.

The special feature of this library is that it allows you to determine the state of a scene at any given moment by specifying only its initial properties.

## Modules

These are the actual modules you can use by now:

[Kinematics](#kinematics)

[Special relativity](#special-relativity)

[Gravity](#gravity)

### Kinematics

Kinematics module allows you to create a scene with objects that interact using MRUA ecuations.

```javascript
import * as SIMU from './simu';

const scene = new SIMU.Kinematics.Scene();

// We add earth gravity to the scene
scene.addAcceleration({
    vector: SIMU.vector(0, -9.81, 0)
});

const ball = new SIMU.Kinematics.Object({
    _name: 'Ball',
    _initialPosition: SIMU.vector(0, 9.81, 0)
});

scene.add(ball);

scene.update(0);
console.log("Height of Ball at time 0s => " + object.position.y + "m")

scene.update(1);
console.log("Height of Ball at time 1s => " + object.position.y + "m")
```

If everything went well, you should see the following output

```bash
Height of Ball at time 0s => 9.81m
Height of Ball at time 1s => 0m
```

### Special relativity

The special relativity module allows you to create a scene designed for objects traveling at velocities close to the speed of light.

```javascript
import * as SIMU from './simu';

const scene = new SIMU.SpecialRelativity.Scene();

const rocket = new SIMU.SpecialRelativity.Object({
    _name: 'Rocket',
    _velocity: SIMU.vector(SIMU.SPEED_OF_LIGHT*0.95, 0, 0)
});

const john = new SIMU.SpecialRelativity.Object({
    _name: 'John',
    _velocity: SIMU.vector(0, 0, 0)
});

scene.add(rocket);
scene.add(john);

scene.update(60);

console.log("Time for John: " + "Time for rocket: ")
```

If everything went well, you should see the following output

```bash
Height of Ball at time 0s => 9.81m
Height of Ball at time 1s => 0m
```

### Gravity

The gravity module allows you to create a scene designed for objects affected by gravity.

```javascript
import * as SIMU from './simu';

const scene = new SIMU.Gravity.Scene();

const earth = new SIMU.Gravity.Object({
    _name: 'Earth',
    _initialPosition: SIMU.vector(0, 0, 0),
    _mass: 5.972e24
});

const moon = new SIMU.Gravity.Object({
    _name: 'Moon',
    _initialVelocity: SIMU.vector(0, 1022, 0),
    _initialPosition: SIMU.vector(384400000, 0, 0),
    _mass: 7.342e22 
});

scene.add(earth);
scene.add(moon);

scene.update(0);

console.log("Moon acceleration is " + moon.acceleration.vector)
```

If everything went well, you should see the following output

```bash
Moon acceleration is 
```
import * as SIMU from 'http://127.0.0.1:8080/simu/simu.js';

const simulation = new SIMU.GravitySimulation({
    duration: 60,
    inLoop: true
});

const scene = new SIMU.GravityScene();

const object1 = new SIMU.GravityObject({
    _mass: 10e5
});

const object2 = new SIMU.GravityObject({
    _mass: 1,
    _actualPosition: SIMU.Position({
        _x: 10
    }),
    _initialVelocity: SIMU.Velocity({
        _y: 1
    })
});

scene.addObject(object1)
scene.addObject(object2)

scene.updateCachedScenes(60);

simulation.play()
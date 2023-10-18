import * as THREE from 'three';

// Configuración de la escena
const scene = new THREE.Scene();
const aspectRatio = (500 / 500);
const camera = new THREE.OrthographicCamera(
    -5 * aspectRatio, // left
    5 * aspectRatio, // right
    5,              // top
    -5,              // bottom
    1,              // near
    1000            // far
);
camera.position.z = 10;

camera.zoom = 0.03;

camera.updateProjectionMatrix();

const renderer = new THREE.WebGLRenderer();
renderer.setSize(500, 500);
document.body.appendChild(renderer.domElement);

// Creación de la Tierra
const geometry = new THREE.CircleGeometry(2, 32);
const material = new THREE.MeshBasicMaterial({ color: 0xff0000 }); // Rojo

const earth = new THREE.Mesh(geometry, material);
scene.add(earth);

const moon = new THREE.Mesh(geometry, material);
scene.add(moon);

// Creación de la Luna
const moon2 = new THREE.Mesh(geometry, material);
scene.add(moon2);

const moon3 = new THREE.Mesh(geometry, material);
scene.add(moon3);

const object1 = new THREE.Mesh(geometry, material);
scene.add(object1);

const object2 = new THREE.Mesh(geometry, material);
scene.add(object2);

const object3 = new THREE.Mesh(geometry, material);
scene.add(object3);

const object4 = new THREE.Mesh(geometry, material);
scene.add(object4);

// Función para actualizar la posición de la Tierra y la Luna
export function update(earthPosition: number[], moonPosition: number[], moon2Position: number[], moon3Position: number[], object1Position: number[], object2Position: number[], object3Position: number[], object4Position: number[]) {
    earth.position.copy(new THREE.Vector3(earthPosition[0], earthPosition[1], earthPosition[2]));
    moon.position.copy(new THREE.Vector3(moonPosition[0], moonPosition[1], moonPosition[2]));
    moon2.position.copy(new THREE.Vector3(moon2Position[0], moon2Position[1], moon2Position[2]));
    moon3.position.copy(new THREE.Vector3(moon3Position[0], moon3Position[1], moon3Position[2]));
    object1.position.copy(new THREE.Vector3(object1Position[0], object1Position[1], object1Position[2]));
    object2.position.copy(new THREE.Vector3(object2Position[0], object2Position[1], object2Position[2]));
    object3.position.copy(new THREE.Vector3(object3Position[0], object3Position[1], object3Position[2]));
    object4.position.copy(new THREE.Vector3(object4Position[0], object4Position[1], object4Position[2]));
}

// Función para renderizar la escena
export function render() {
    renderer.render(scene, camera);
}
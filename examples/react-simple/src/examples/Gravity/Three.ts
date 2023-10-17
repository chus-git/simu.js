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

camera.zoom = 0.2;

camera.updateProjectionMatrix();

const renderer = new THREE.WebGLRenderer();
renderer.setSize(500, 500);
document.body.appendChild(renderer.domElement);

// Creación de la Tierra
const earthGeometry = new THREE.CircleGeometry(2, 32);
const earthMaterial = new THREE.MeshBasicMaterial({ color: 0xff0000 }); // Rojo
const earth = new THREE.Mesh(earthGeometry, earthMaterial);
scene.add(earth);

// Creación de la Luna
const moonGeometry = new THREE.CircleGeometry(1, 32);
const moonMaterial = new THREE.MeshBasicMaterial({ color: 0xff0000 }); // Rojo
const moon = new THREE.Mesh(moonGeometry, moonMaterial);
scene.add(moon);

// Función para actualizar la posición de la Tierra y la Luna
export function update(earthPosition: number[], moonPosition: number[]) {
    earth.position.copy(new THREE.Vector3(earthPosition[0], earthPosition[1], earthPosition[2]));
    moon.position.copy(new THREE.Vector3(moonPosition[0], moonPosition[1], moonPosition[2]));
}

// Función para renderizar la escena
export function render() {
    renderer.render(scene, camera);
}
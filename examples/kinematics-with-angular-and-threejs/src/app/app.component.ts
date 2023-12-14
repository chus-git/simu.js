import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import * as THREE from 'three';
import * as SIMU from 'simu';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, FormsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {

  title = 'kinematics-with-angular-and-threejs';

  /** User answer */
  answer: number = 0;

  /** Prepare the SIMU variables */
  simulation: SIMU.Simulation;
  scene: SIMU.Kinematics.Scene;
  car: SIMU.Kinematics.Object;
  elderlyPerson: SIMU.Kinematics.Object;
  carDeceleration: SIMU.Vector = new SIMU.Vector(0, 0);

  /** Prepare the THREE variables */
  @ViewChild('canvasElement', { static: true }) canvasRef?: ElementRef<HTMLCanvasElement>;
  sceneThree: THREE.Scene;
  camera: THREE.OrthographicCamera;
  renderer: THREE.WebGLRenderer;
  carThree: THREE.Mesh;
  elderlyPersonThree: THREE.Mesh;

  constructor() {

    /* === SIMU VARIABLES INITIALIZATION === */

    // Create the simulation
    this.simulation = new SIMU.Simulation();

    // Create the scene
    this.scene = new SIMU.Kinematics.Scene();

    // Create the car at the origin (x: 0, y: 0)
    this.car = new SIMU.Kinematics.Object({
      _name: 'Car',
      _initialVelocity: new SIMU.Vector(10, 0),
    });

    // Create the elderly person 20 meters away from the car (x: 20, y: 0)
    this.elderlyPerson = new SIMU.Kinematics.Object({
      _name: 'Elderly Person',
      _initialPosition: new SIMU.Vector(20, 0),
    });

    // Load the car and the elderly person into the scene
    this.scene.add(this.car);
    this.scene.add(this.elderlyPerson);

    // Load the scene into the simulation
    this.simulation.loadScene(this.scene);

    /* === THREE VARIABLES INITIALIZATION === */

    // Create the canvas
    if(!this.canvasRef) {
      this.canvasRef = new ElementRef<HTMLCanvasElement>(document.createElement('canvas'));
    }

    // Configurar Three.js para renderizar en el canvas
    this.renderer = new THREE.WebGLRenderer({ canvas: this.canvasRef?.nativeElement });
    this.renderer.setSize(window.innerWidth, window.innerHeight);

    // Create the THREE scene
    this.sceneThree = new THREE.Scene();

    // Create the THREE camera
    this.camera = new THREE.OrthographicCamera(
      window.innerWidth / -2,
      window.innerWidth / 2,
      window.innerHeight / -2,
      window.innerHeight / 2,
      1,
      1000
    );

    // Create the THREE renderer
    this.renderer = new THREE.WebGLRenderer();

    // Set the renderer size
    this.renderer.setSize(window.innerWidth, window.innerHeight);

    // Add the renderer to the DOM
    document.body.appendChild(this.renderer.domElement);

    // Create the THREE car
    const geometryCar = new THREE.BoxGeometry(1, 0.5, 0.5);

    // Create the THREE material
    const materialCar = new THREE.MeshBasicMaterial({ color: 0x00ff00 });

    // Create the THREE mesh
    this.carThree = new THREE.Mesh(geometryCar, materialCar);

    // Add the THREE mesh to the THREE scene
    this.sceneThree.add(this.carThree);

    // Create the THREE elderly person
    const geometryElderlyPerson = new THREE.BoxGeometry(0.5, 0.5, 0.5);

    // Create the THREE material
    const materialElderlyPerson = new THREE.MeshBasicMaterial({ color: 0xff0000 });

    // Create the THREE mesh
    this.elderlyPersonThree = new THREE.Mesh(geometryElderlyPerson, materialElderlyPerson);

    // Add the THREE mesh to the THREE scene
    this.sceneThree.add(this.elderlyPersonThree);

    // Set the camera position
    this.camera.position.z = 5;

  }

  ngOnInit() {

    this.simulation.updateEventEmitter.subscribe((time: number) => {
      console.log(`Position of the car at time ${time} is ${this.car.position.x} and velocity is ${this.car.velocity.x}`);
      if(this.car.position.x >= 20) {
        this.simulation.pause();
        alert('The car has reached the elderly person.');
      }
    });

  }

  checkAnswer() {

    this.simulation.pause();
    this.simulation.time = 0;
    this.car.accelerations = [];

    this.simulation.duration = this.car.initialVelocity.x / this.answer;

    this.car.addAcceleration({
      startAt: 0,
      duration: 100,
      vector: new SIMU.Vector(-this.answer, 0)
    });
    
    console.log(this.simulation.duration, this.car.initialVelocity.x, this.answer);

    this.simulation.play();

  }

}
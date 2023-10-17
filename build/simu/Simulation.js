import { Scene } from "./Scene";
import EventEmitter from "./EventEmitter";
var SimulationState;
(function (SimulationState) {
    SimulationState["Pause"] = "pause";
    SimulationState["Play"] = "play";
})(SimulationState || (SimulationState = {}));
/**
 * Represents a simulation with a time-based scene.
 */
class Simulation {
    constructor(data = {}) {
        this._time = 0;
        this._duration = Number.MAX_VALUE;
        this._inLoop = false;
        this._playbackSpeed = 1;
        this._state = SimulationState.Pause;
        this._scene = new Scene();
        this.updateEventEmmitter = new EventEmitter();
        Object.assign(this, data);
    }
    /**
     * Resets the simulation.
     * Sets the current simulation time to 0.
     */
    reset() {
        this.time = 0;
        this.duration = Number.MAX_VALUE;
        this._state = SimulationState.Pause;
    }
    /**
     * Plays the simulation.
     * If the simulation is already in the Play or Loop state, it does nothing.
     * Otherwise, it resumes the time loop.
     */
    play() {
        if (this._state === SimulationState.Play || this.time >= this.duration) {
            return;
        }
        this._state = SimulationState.Play;
        this.resumeTimeLoop();
    }
    /**
     * Pauses the simulation.
     * Clears the time loop and sets the simulation state to Pause.
     */
    pause() {
        this._state = SimulationState.Pause;
    }
    /**
     * Toggles the looping state of the simulation.
     * If the simulation is currently in a loop, it stops the loop.
     * If the simulation is not in a loop, it starts the loop.
     */
    toggleLooping() {
        this.inLoop = !this._inLoop;
    }
    /**
     * Resumes the time loop.
     */
    resumeTimeLoop() {
        let lastTime = performance.now();
        const timeLoop = (currentTime) => {
            // Calculate delta time
            const deltaTime = (currentTime - lastTime) * this.playbackSpeed;
            // Save last time update
            lastTime = currentTime;
            // Add the calculated time difference from the last time update
            let time = this._time + (deltaTime / 1000);
            // Return to the beginning of the simulation if it is playing in a loop
            if (this._playbackSpeed > 0 && this._inLoop && time >= this._duration) {
                time -= this._duration;
            }
            // Return to the end of the simulation if it is playing in a loop
            else if (this._playbackSpeed < 0 && this._inLoop && time <= 0) {
                time += this._duration;
            }
            // Pause the simulation if it has reached the set duration
            else if (this._playbackSpeed > 0 && this._state === SimulationState.Play && time >= this._duration) {
                time = this._duration;
                this.pause();
            }
            else if (this._playbackSpeed < 0 && this._state === SimulationState.Play && time <= 0) {
                time = 0;
                this.pause();
            }
            this._time = time;
            this.update(this._time);
            // Continue with the loop if simulation is playing
            if (this._state === SimulationState.Play) {
                requestAnimationFrame(timeLoop);
            }
        };
        requestAnimationFrame(timeLoop);
    }
    /**
     * Updates the simulation's scene at the given time.
     * @param {number} time - The simulation time to update to.
     */
    update(time = this._time) {
        this._scene.update(time);
        this.updateEventEmmitter.emit(this._time);
    }
    /**
     * Loads a new scene for the simulation.
     * @param {Scene} scene - The scene to load.
     */
    loadScene(scene) {
        this._scene = scene;
    }
    /** Setters */
    set time(time) {
        if (time > this._duration)
            this._time = this._duration;
        else if (time < 0)
            this._time = 0;
        else
            this._time = time;
        this.update();
    }
    set duration(duration) {
        this._duration = duration;
    }
    set inLoop(inLoop) {
        this._inLoop = inLoop;
    }
    set playbackSpeed(playbackSpeed) {
        this._playbackSpeed = playbackSpeed;
    }
    /** Getters */
    get time() {
        return this._time;
    }
    get duration() {
        return this._duration;
    }
    get inLoop() {
        return this._inLoop;
    }
    get playbackSpeed() {
        return this._playbackSpeed;
    }
    get state() {
        return this._state;
    }
}
export { Simulation, SimulationState };

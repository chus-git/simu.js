import { Scene } from "./Scene";
import EventEmitter from "./EventEmitter";
var SimulationState;
(function (SimulationState) {
    SimulationState["Pause"] = "pause";
    SimulationState["Play"] = "play";
})(SimulationState || (SimulationState = {}));
class Simulation {
    constructor(data = {}) {
        this._time = 0;
        this._duration = 10;
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
        this.duration = 1;
        this.state = SimulationState.Pause;
    }
    /**
     * Plays the simulation.
     * If the simulation is already in the Play or Loop state, it does nothing.
     * Otherwise, it resumes the time loop.
     */
    play() {
        if (this.state === SimulationState.Play || this.time >= this.duration) {
            return;
        }
        this.state = SimulationState.Play;
        this.resumeTimeLoop();
    }
    /**
     * Pauses the simulation.
     * Clears the time loop and sets the simulation state to Pause.
     */
    pause() {
        this.state = SimulationState.Pause;
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
     * This function is responsible for incrementing the
     * simulation time by 0.001 every millisecond.
     */
    resumeTimeLoop() {
        let lastTime = performance.now();
        const timeLoop = (currentTime) => {
            // Calculate delta time
            const deltaTime = (currentTime - lastTime) * this.playbackSpeed;
            // Save last time update
            lastTime = currentTime;
            // Add the calculated time difference from the last time update
            let time = this.time + (deltaTime / 1000);
            // Return to the beginning of the simulation if it is playing in a loop
            if (this.inLoop && time >= this.duration) {
                time -= this.duration;
            }
            // Pause the simulation if it has reached the set duration
            else if (this.state === SimulationState.Play && time >= this.duration) {
                time = this._duration;
                this.pause();
            }
            this.time = time;
            // Continue with the loop if simulation is playing
            if (this.state === SimulationState.Play) {
                requestAnimationFrame(timeLoop);
            }
        };
        requestAnimationFrame(timeLoop);
    }
    /**
     * Update the simulation attending to the actual
     * simulation time
     */
    update() {
        this._scene.update(this.time);
        this.updateEventEmmitter.emit(this.time);
    }
    /** Setters */
    set time(time) {
        if (time > this._duration)
            this._time = this._duration;
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
    set state(state) {
        this._state = state;
    }
    set scene(scene) {
        this._scene = scene;
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
    get scene() {
        return this._scene;
    }
}
export { Simulation, SimulationState };

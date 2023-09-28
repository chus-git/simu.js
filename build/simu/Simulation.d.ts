import { Scene } from "./Scene";
import EventEmitter from "./EventEmitter";
declare enum SimulationState {
    Pause = "pause",
    Play = "play"
}
declare class Simulation {
    protected _time: number;
    protected _duration: number;
    protected _inLoop: boolean;
    protected _playbackSpeed: number;
    protected _state: SimulationState;
    protected _scene: Scene;
    updateEventEmmitter: EventEmitter<number>;
    constructor(data?: Partial<Simulation>);
    /**
     * Resets the simulation.
     * Sets the current simulation time to 0.
     */
    reset(): void;
    /**
     * Plays the simulation.
     * If the simulation is already in the Play or Loop state, it does nothing.
     * Otherwise, it resumes the time loop.
     */
    play(): void;
    /**
     * Pauses the simulation.
     * Clears the time loop and sets the simulation state to Pause.
     */
    pause(): void;
    /**
     * Toggles the looping state of the simulation.
     * If the simulation is currently in a loop, it stops the loop.
     * If the simulation is not in a loop, it starts the loop.
     */
    toggleLooping(): void;
    /**
     * Resumes the time loop.
     * This function is responsible for incrementing the
     * simulation time by 0.001 every millisecond.
     */
    resumeTimeLoop(): void;
    /**
     * Update the simulation attending to the actual
     * simulation time
     */
    update(): void;
    /** Setters */
    set time(time: number);
    set duration(duration: number);
    set inLoop(inLoop: boolean);
    set playbackSpeed(playbackSpeed: number);
    set state(state: SimulationState);
    set scene(scene: Scene);
    /** Getters */
    get time(): number;
    get duration(): number;
    get inLoop(): boolean;
    get playbackSpeed(): number;
    get state(): SimulationState;
    get scene(): Scene;
}
export declare enum VelocityUnit {
    MetersPerSecond = 0
}
export { Simulation, SimulationState };

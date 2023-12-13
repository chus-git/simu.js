import { Scene } from "./Scene";
import EventEmitter from "./EventEmitter";
declare enum SimulationState {
    Pause = "pause",
    Play = "play"
}
export interface ISimulation {
    _duration: number;
    _inLoop: boolean;
    _playbackSpeed: number;
}
/**
 * Represents a simulation with a time-based scene.
 */
declare class Simulation {
    protected _time: number;
    protected _duration: number;
    protected _inLoop: boolean;
    protected _playbackSpeed: number;
    protected _state: SimulationState;
    protected _scene: Scene;
    updateEventEmitter: EventEmitter<number>;
    constructor(data?: Partial<ISimulation>);
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
     */
    resumeTimeLoop(): void;
    /**
     * Updates the simulation's scene at the given time.
     * @param {number} time - The simulation time to update to.
     */
    update(time?: number): void;
    /**
     * Loads a new scene for the simulation.
     * @param {Scene} scene - The scene to load.
     */
    loadScene(scene: Scene): void;
    /** Setters */
    set time(time: number);
    set duration(duration: number);
    set inLoop(inLoop: boolean);
    set playbackSpeed(playbackSpeed: number);
    /** Getters */
    get time(): number;
    get duration(): number;
    get inLoop(): boolean;
    get playbackSpeed(): number;
    get state(): SimulationState;
}
export { Simulation, SimulationState };

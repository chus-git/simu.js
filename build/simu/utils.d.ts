import { Matrix } from "mathjs";
interface IPosition {
    _x: number;
    _y: number;
    _z: number;
}
declare class Position {
    private _x;
    private _y;
    private _z;
    private _vector;
    constructor(data?: Partial<IPosition>);
    asArray(): import("mathjs").MathArray;
    /** Getters */
    get x(): number;
    get y(): number;
    get z(): number;
    get vector(): Matrix;
    /** Setters */
    set x(value: number);
    set y(value: number);
    set z(value: number);
    set vector(value: Matrix);
}
declare enum PositionUnit {
    Meters = 1,
    Kilometers = 0.001,
    Miles = 0.000621371,
    Feet = 3.28084
}
interface IVelocity {
    _x: number;
    _y: number;
    _z: number;
}
declare class Velocity {
    private _x;
    private _y;
    private _z;
    private _vector;
    constructor(data?: Partial<IVelocity>);
    asArray(): import("mathjs").MathArray;
    /** Getters */
    get x(): number;
    get y(): number;
    get z(): number;
    get vector(): Matrix;
    /** Setters */
    set x(value: number);
    set y(value: number);
    set z(value: number);
    set vector(value: Matrix);
}
declare enum VelocityUnit {
    MetersPerSecond = 1,
    KilometersPerHour = 3.6,
    MilesPerHour = 2.23694,
    FeetPerSecond = 3.28084
}
interface IAcceleration {
    _x: number;
    _y: number;
    _z: number;
    _startAt: number;
    _duration: number;
}
declare class Acceleration {
    private _x;
    private _y;
    private _z;
    private _vector;
    private _startAt;
    private _duration;
    constructor(data?: Partial<IAcceleration>);
    /** Getters */
    get startAt(): number;
    get duration(): number;
    get x(): number;
    get y(): number;
    get z(): number;
    get vector(): Matrix;
    /** Setters */
    set startAt(startAt: number);
    set duration(duration: number);
    set x(value: number);
    set y(value: number);
    set z(value: number);
    set vector(value: Matrix);
}
declare enum AccelerationUnit {
    MetersPerSecondSquared = 1,
    KilometersPerHourSquared = 0.000277778,
    MilesPerHourSquared = 0.00044704,
    FeetPerSecondSquared = 0.3048
}
export { Position, PositionUnit, Velocity, VelocityUnit, Acceleration, AccelerationUnit };

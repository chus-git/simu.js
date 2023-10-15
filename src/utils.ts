class Vector {

    private _vector: number[];

    constructor(x: number = 0, y: number = 0, z: number = 0) {
        this._vector = [x, y, z];
    }

    clone() {
        return new Vector(this.x, this.y, this.z);
    }

    get x() {
        return this._vector[0];
    }

    get y() {
        return this._vector[1];
    }

    get z() {
        return this._vector[2];
    }

    get vector() {
        return this._vector;
    }

    set x(x: number) {
        this._vector[0] = x;
    }

    set y(y: number) {
        this._vector[1] = y;
    }

    set z(z: number) {
        this._vector[2] = z;
    }

    set vector(vector: number[]) {
        this._vector = vector;
    }

}

class Position {

    private _vector: Vector;

    constructor(x: number = 0, y: number = 0, z: number = 0) {
        this._vector = new Vector(x, y, z);
    }

    /** Getters */

    get x() {
        return this._vector.x;
    }

    get y() {
        return this._vector.y;
    }

    get z() {
        return this._vector.z;
    }

    get vector(): Vector {
        return this._vector;
    }

    /** Setters */

    set x(x: number) {
        this._vector.x = x;
    }

    set y(y: number) {
        this._vector.y = y;
    }

    set z(z: number) {
        this._vector.z = z;
    }

    set vector(vector: Vector) {
        this._vector = vector.clone();
    }

}

enum PositionUnit {
    Nanometers = 1e+9,
    Micrometers = 1e+6,
    Millimeters = 1e+3,
    Centimeters = 1e+2,
    Decimeters = 1e+1,
    Meters = 1,
    Dekameters = 1e-1,
    Hectometers = 1e-2,
    Kilometers = 1e-3,
    Megameters = 1e-6,
    Gigameters = 1e-9,
    Inches = 39.3701,
    Feet = 3.28084,
    Yards = 1.09361,
    Miles = 0.000621371,
    NauticalMiles = 0.000539957,
    AstronomicalUnits = 6.68459e-12,
    LightYears = 1.0570e-16,
    Parsecs = 3.24078e-17
}

class Velocity {

    private _vector: Vector;

    constructor(x: number = 0, y: number = 0, z: number = 0) {
        this._vector = new Vector(x, y, z);
    }

    /** Getters */

    get x() {
        return this._vector.x;
    }

    get y() {
        return this._vector.y;
    }

    get z() {
        return this._vector.z;
    }

    get vector(): Vector {
        return this._vector;
    }

    /** Setters */

    set x(x: number) {
        this._vector.x = x;
    }

    set y(y: number) {
        this._vector.y = y;
    }

    set z(z: number) {
        this._vector.z = z;
    }

    set vector(vector: Vector) {
        this._vector = vector.clone();
    }

}

enum VelocityUnit {
    MetersPerSecond = 1,
    KilometersPerHour = 3.6,
    MilesPerHour = 2.23694,
    FeetPerSecond = 3.28084,
    Knots = 1.94384,
    MachAtSeaLevel = 0.00293858,
    SpeedOfLight = 3.33564e-9,
    SpeedOfSoundAtSeaLevel = 0.00291129
}

interface IAcceleration {
    _vector: Vector,
    _startAt: number;
    _duration: number;
}

class Acceleration {

    private _vector: Vector;

    private _startAt: number = 0;

    private _duration: number = Number.MAX_VALUE;

    constructor(data: Partial<IAcceleration> = {}) {

        this._vector = new Vector();

        Object.assign(this, data);

    }

    /** Getters */

    get startAt() {
        return this._startAt;
    }

    get duration() {
        return this._duration;
    }

    get x() {
        return this._vector.x;
    }

    get y() {
        return this._vector.y;
    }

    get z() {
        return this._vector.z;
    }

    get vector() {
        return this._vector;
    }

    /** Setters */

    set startAt(startAt: number) {
        this._startAt = startAt;
    }

    set duration(duration: number) {
        this._duration = duration;
    }

    set x(x: number) {
        this._vector.x = x;
    }

    set y(y: number) {
        this._vector.y = y;
    }

    set z(z: number) {
        this._vector.z = z;
    }

    set vector(vector: Vector) {
        this._vector = vector;
    }

}

enum AccelerationUnit {
    MetersPerSecondSquared = 1,
    KilometersPerHourSquared = 0.000277778,
    MilesPerHourSquared = 0.00044704,
    FeetPerSecondSquared = 0.3048
}

export { Vector, Position, PositionUnit, Velocity, VelocityUnit, Acceleration, AccelerationUnit }
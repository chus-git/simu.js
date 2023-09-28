import { Matrix, matrix } from "mathjs";

interface IPosition {
    _x: number,
    _y: number,
    _z: number
}

class Position {

    private _x: number;
    private _y: number;
    private _z: number;

    private _vector: Matrix;

    constructor(data: Partial<IPosition> = {}) {

        this._x = 0;
        this._y = 0;
        this._z = 0;

        Object.assign(this, data);

        this._vector = matrix([this._x, this._y, this._z]);

    }

    asArray() {
        return this._vector.toArray();
    }

    /** Getters */

    get x() {
        return this._x;
    }

    get y() {
        return this._y;
    }

    get z() {
        return this._z;
    }

    get vector() {
        return this._vector;
    }

    /** Setters */

    set x(value: number) {
        this._x = value;
        this._vector.set([0], value);
    }

    set y(value: number) {
        this._y = value
        this._vector.set([1], value);
    }

    set z(value: number) {
        this._z = value;
        this._vector.set([2], value);
    }

    set vector(value: Matrix) {
        this._vector = value;
        this._x = value.get([0]);
        this._y = value.get([1]);
        this._z = value.get([2]);
    }

}

enum PositionUnit {
    Meters = 1,
    Kilometers = 0.001,
    Miles = 0.000621371,
    Feet = 3.28084
}

interface IVelocity {
    _x: number,
    _y: number,
    _z: number
}

class Velocity {

    private _x: number;
    private _y: number;
    private _z: number;

    private _vector: Matrix;

    constructor(data: Partial<IVelocity> = {}) {

        this._x = 0;
        this._y = 0;
        this._z = 0;

        Object.assign(this, data);

        this._vector = matrix([this._x, this._y, this._z]);

    }

    asArray() {
        return this._vector.toArray();
    }

    /** Getters */

    get x() {
        return this._x;
    }

    get y() {
        return this._y;
    }

    get z() {
        return this._z;
    }

    get vector() {
        return this._vector;
    }

    /** Setters */

    set x(value: number) {
        this._x = value;
        this._vector.set([0], value);
    }

    set y(value: number) {
        this._y = value
        this._vector.set([1], value);
    }

    set z(value: number) {
        this._z = value;
        this._vector.set([2], value);
    }

    set vector(value: Matrix) {
        this._vector = value;
        this._x = value.get([0]);
        this._y = value.get([1]);
        this._z = value.get([2]);
    }

}

enum VelocityUnit {
    MetersPerSecond = 1,
    KilometersPerHour = 3.6,
    MilesPerHour = 2.23694,
    FeetPerSecond = 3.28084
}

interface IAcceleration {
    _x: number,
    _y: number,
    _z: number,
    _startAt: number;
    _duration: number;
}

class Acceleration {

    private _x: number;
    private _y: number;
    private _z: number;

    private _vector: Matrix;

    private _startAt: number = 0;

    private _duration: number = 1;

    constructor(data: Partial<IAcceleration> = {}) {

        this._x = 0;
        this._y = 0;
        this._z = 0;
        this._vector = matrix([0, 0, 0]);

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
        return this._x;
    }

    get y() {
        return this._y;
    }

    get z() {
        return this._z;
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

    set x(value: number) {
        this._x = value;
        this._vector.set([0], value);
    }

    set y(value: number) {
        this._y = value
        this._vector.set([1], value);
    }

    set z(value: number) {
        this._z = value;
        this._vector.set([2], value);
    }

    set vector(value: Matrix) {
        this._vector = value;
        this._x = value.get([0]);
        this._y = value.get([1]);
        this._z = value.get([2]);
    }


}

enum AccelerationUnit {
    MetersPerSecondSquared = 1,
    KilometersPerHourSquared = 0.000277778,
    MilesPerHourSquared = 0.00044704,
    FeetPerSecondSquared = 0.3048
}

export {Position, PositionUnit, Velocity, VelocityUnit, Acceleration, AccelerationUnit}
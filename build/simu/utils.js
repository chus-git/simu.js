import { matrix } from "mathjs";
class Position {
    constructor(data = {}) {
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
    set x(value) {
        this._x = value;
        this._vector.set([0], value);
    }
    set y(value) {
        this._y = value;
        this._vector.set([1], value);
    }
    set z(value) {
        this._z = value;
        this._vector.set([2], value);
    }
    set vector(value) {
        this._vector = value;
        this._x = value.get([0]);
        this._y = value.get([1]);
        this._z = value.get([2]);
    }
}
var PositionUnit;
(function (PositionUnit) {
    PositionUnit[PositionUnit["Meters"] = 1] = "Meters";
    PositionUnit[PositionUnit["Kilometers"] = 0.001] = "Kilometers";
    PositionUnit[PositionUnit["Miles"] = 0.000621371] = "Miles";
    PositionUnit[PositionUnit["Feet"] = 3.28084] = "Feet";
})(PositionUnit || (PositionUnit = {}));
class Velocity {
    constructor(data = {}) {
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
    set x(value) {
        this._x = value;
        this._vector.set([0], value);
    }
    set y(value) {
        this._y = value;
        this._vector.set([1], value);
    }
    set z(value) {
        this._z = value;
        this._vector.set([2], value);
    }
    set vector(value) {
        this._vector = value;
        this._x = value.get([0]);
        this._y = value.get([1]);
        this._z = value.get([2]);
    }
}
var VelocityUnit;
(function (VelocityUnit) {
    VelocityUnit[VelocityUnit["MetersPerSecond"] = 1] = "MetersPerSecond";
    VelocityUnit[VelocityUnit["KilometersPerHour"] = 3.6] = "KilometersPerHour";
    VelocityUnit[VelocityUnit["MilesPerHour"] = 2.23694] = "MilesPerHour";
    VelocityUnit[VelocityUnit["FeetPerSecond"] = 3.28084] = "FeetPerSecond";
})(VelocityUnit || (VelocityUnit = {}));
class Acceleration {
    constructor(data = {}) {
        this._startAt = 0;
        this._duration = 1;
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
    set startAt(startAt) {
        this._startAt = startAt;
    }
    set duration(duration) {
        this._duration = duration;
    }
    set x(value) {
        this._x = value;
        this._vector.set([0], value);
    }
    set y(value) {
        this._y = value;
        this._vector.set([1], value);
    }
    set z(value) {
        this._z = value;
        this._vector.set([2], value);
    }
    set vector(value) {
        this._vector = value;
        this._x = value.get([0]);
        this._y = value.get([1]);
        this._z = value.get([2]);
    }
}
var AccelerationUnit;
(function (AccelerationUnit) {
    AccelerationUnit[AccelerationUnit["MetersPerSecondSquared"] = 1] = "MetersPerSecondSquared";
    AccelerationUnit[AccelerationUnit["KilometersPerHourSquared"] = 0.000277778] = "KilometersPerHourSquared";
    AccelerationUnit[AccelerationUnit["MilesPerHourSquared"] = 0.00044704] = "MilesPerHourSquared";
    AccelerationUnit[AccelerationUnit["FeetPerSecondSquared"] = 0.3048] = "FeetPerSecondSquared";
})(AccelerationUnit || (AccelerationUnit = {}));
export { Position, PositionUnit, Velocity, VelocityUnit, Acceleration, AccelerationUnit };

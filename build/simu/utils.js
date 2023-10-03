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
        return this._vector.clone();
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
    PositionUnit[PositionUnit["Nanometers"] = 1000000000] = "Nanometers";
    PositionUnit[PositionUnit["Micrometers"] = 1000000] = "Micrometers";
    PositionUnit[PositionUnit["Millimeters"] = 1000] = "Millimeters";
    PositionUnit[PositionUnit["Centimeters"] = 100] = "Centimeters";
    PositionUnit[PositionUnit["Decimeters"] = 10] = "Decimeters";
    PositionUnit[PositionUnit["Meters"] = 1] = "Meters";
    PositionUnit[PositionUnit["Dekameters"] = 0.1] = "Dekameters";
    PositionUnit[PositionUnit["Hectometers"] = 0.01] = "Hectometers";
    PositionUnit[PositionUnit["Kilometers"] = 0.001] = "Kilometers";
    PositionUnit[PositionUnit["Megameters"] = 0.000001] = "Megameters";
    PositionUnit[PositionUnit["Gigameters"] = 1e-9] = "Gigameters";
    PositionUnit[PositionUnit["Inches"] = 39.3701] = "Inches";
    PositionUnit[PositionUnit["Feet"] = 3.28084] = "Feet";
    PositionUnit[PositionUnit["Yards"] = 1.09361] = "Yards";
    PositionUnit[PositionUnit["Miles"] = 0.000621371] = "Miles";
    PositionUnit[PositionUnit["NauticalMiles"] = 0.000539957] = "NauticalMiles";
    PositionUnit[PositionUnit["AstronomicalUnits"] = 6.68459e-12] = "AstronomicalUnits";
    PositionUnit[PositionUnit["LightYears"] = 1.057e-16] = "LightYears";
    PositionUnit[PositionUnit["Parsecs"] = 3.24078e-17] = "Parsecs";
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
        return this._vector.clone();
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
    VelocityUnit[VelocityUnit["Knots"] = 1.94384] = "Knots";
    VelocityUnit[VelocityUnit["MachAtSeaLevel"] = 0.00293858] = "MachAtSeaLevel";
    VelocityUnit[VelocityUnit["SpeedOfLight"] = 3.33564e-9] = "SpeedOfLight";
    VelocityUnit[VelocityUnit["SpeedOfSoundAtSeaLevel"] = 0.00291129] = "SpeedOfSoundAtSeaLevel";
})(VelocityUnit || (VelocityUnit = {}));
class Acceleration {
    constructor(data = {}) {
        this._startAt = 0;
        this._duration = Number.MAX_VALUE;
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
        return this._vector.clone();
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

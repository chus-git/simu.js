class Vector {
    constructor(x = 0, y = 0, z = 0) {
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
    set x(x) {
        this._vector[0] = x;
    }
    set y(y) {
        this._vector[1] = y;
    }
    set z(z) {
        this._vector[2] = z;
    }
    set vector(vector) {
        this._vector = vector;
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
    PositionUnit[PositionUnit["LightSeconds"] = 3.33564e-9] = "LightSeconds";
    PositionUnit[PositionUnit["AstronomicalUnits"] = 6.68459e-12] = "AstronomicalUnits";
    PositionUnit[PositionUnit["LightYears"] = 1.057e-16] = "LightYears";
    PositionUnit[PositionUnit["Parsecs"] = 3.24078e-17] = "Parsecs";
})(PositionUnit || (PositionUnit = {}));
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
var AccelerationUnit;
(function (AccelerationUnit) {
    AccelerationUnit[AccelerationUnit["MetersPerSecondSquared"] = 1] = "MetersPerSecondSquared";
    AccelerationUnit[AccelerationUnit["KilometersPerSecondSquared"] = 0.001] = "KilometersPerSecondSquared";
    AccelerationUnit[AccelerationUnit["KilometersPerHourSquared"] = 0.000277778] = "KilometersPerHourSquared";
    AccelerationUnit[AccelerationUnit["MilesPerHourSquared"] = 0.00044704] = "MilesPerHourSquared";
    AccelerationUnit[AccelerationUnit["FeetPerSecondSquared"] = 0.3048] = "FeetPerSecondSquared";
})(AccelerationUnit || (AccelerationUnit = {}));
const vector = (x = 0, y = 0, z = 0) => {
    return new Vector(x, y, z);
};
// Converts a value in International System units to another unit
const convert = (valueInIS, to) => {
    return valueInIS * to;
};
export { Vector, vector, PositionUnit, VelocityUnit, AccelerationUnit, convert };

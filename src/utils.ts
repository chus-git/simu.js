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
    LightSeconds = 3.33564e-9,
    AstronomicalUnits = 6.68459e-12,
    LightYears = 1.0570e-16,
    Parsecs = 3.24078e-17,
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

enum AccelerationUnit {
    MetersPerSecondSquared = 1,
    KilometersPerSecondSquared = 0.001,
    KilometersPerHourSquared = 0.000277778,
    MilesPerHourSquared = 0.00044704,
    FeetPerSecondSquared = 0.3048
}

const vector = (x: number = 0, y: number = 0, z: number = 0) => {
    return new Vector(x, y, z);
}

// Converts a value in International System units to another unit
const convert = (valueInIS: number, to: number) => {
    return valueInIS * to;
}

export { Vector, vector, PositionUnit, VelocityUnit, AccelerationUnit, convert }
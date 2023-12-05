declare class Vector {
    private _vector;
    constructor(x?: number, y?: number, z?: number);
    clone(): Vector;
    get x(): number;
    get y(): number;
    get z(): number;
    get vector(): number[];
    set x(x: number);
    set y(y: number);
    set z(z: number);
    set vector(vector: number[]);
}
declare enum PositionUnit {
    Nanometers = 1000000000,
    Micrometers = 1000000,
    Millimeters = 1000,
    Centimeters = 100,
    Decimeters = 10,
    Meters = 1,
    Dekameters = 0.1,
    Hectometers = 0.01,
    Kilometers = 0.001,
    Megameters = 0.000001,
    Gigameters = 1e-9,
    Inches = 39.3701,
    Feet = 3.28084,
    Yards = 1.09361,
    Miles = 0.000621371,
    NauticalMiles = 0.000539957,
    LightSeconds = 3.33564e-9,
    AstronomicalUnits = 6.68459e-12,
    LightYears = 1.057e-16,
    Parsecs = 3.24078e-17
}
declare enum VelocityUnit {
    MetersPerSecond = 1,
    KilometersPerHour = 3.6,
    MilesPerHour = 2.23694,
    FeetPerSecond = 3.28084,
    Knots = 1.94384,
    MachAtSeaLevel = 0.00293858,
    SpeedOfLight = 3.33564e-9,
    SpeedOfSoundAtSeaLevel = 0.00291129
}
declare enum AccelerationUnit {
    MetersPerSecondSquared = 1,
    KilometersPerSecondSquared = 0.001,
    KilometersPerHourSquared = 0.000277778,
    MilesPerHourSquared = 0.00044704,
    FeetPerSecondSquared = 0.3048
}
declare const vector: (x?: number, y?: number, z?: number) => Vector;
declare const convert: (valueInIS: number, to: number) => number;
export { Vector, vector, PositionUnit, VelocityUnit, AccelerationUnit, convert };

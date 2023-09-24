import SceneObject, { ISceneObject } from "../../SceneObject";
import { Matrix, add, divide, matrix, multiply, subtract, map, norm } from 'mathjs';

interface ISpecialRelativityObject extends ISceneObject {
    _velocity: Matrix,
    _properTime: number,
    _lorentzFactor: number
}

class SpecialRelativityObject extends SceneObject {

    // Initial velocity vector
    private _velocity: Matrix;

    // Proper time
    private _properTime: number;

    // Lorentz factor
    private _lorentzFactor: number;

    // The speed of light in a vacuum in m/s
    public static c: number = 299792458;

    constructor(data: Partial<ISpecialRelativityObject> = {}) {

        super(data);

        this._velocity = matrix([0, 0, 0]);
        this._properTime = 0;
        this._lorentzFactor = 1;

        Object.assign(this, data);

    }

    update(time: number) {

        // Calculate the actual position
        const actualPosition: Matrix = add(
            this._initialPosition,
            multiply(this._velocity, time)
        );
        this._actualPosition = actualPosition;

        // Calculate proper time relative to point 0
        this._properTime = this.calculateProperTimeDueTimeDilation(time, this._velocity);

        /*console.log("Se procede a actualizar con tiempo " + time)

        // Numerator
        const numerator: Matrix = subtract(this._initialPosition, multiply(this._velocity, time));
        console.log(`Numerador - Paso 1 - Multiplicamos ${this._velocity.toString()} por ${time} => ${multiply(this._velocity, time)}`);
        console.log(`Numerador - Paso 2 - Restamos ${this._initialPosition} - ${multiply(this._velocity, time)} => ${subtract(this._initialPosition, multiply(this._velocity, time))}`);

        const velocityPow2: Matrix = map(this._velocity, (velocity) => Math.pow(velocity, 2));
        console.log(`Denominador - Paso 1 - Elevamos la velocidad al cuadrado: ${velocityPow2.toString()}.`)

        const division = map(
            velocityPow2, (value) => value / Math.pow(SpecialRelativityObject.c, 2)
        );


        console.log(`Denominador - Paso 2 - Elevamos c al cuadrado: ${Math.pow(SpecialRelativityObject.c, 2)}.`)
        console.log(`Denominador - Paso 3 - Dividimos la velocidad al cuadrado entre c al cuadrado: ${division.toString()}`)

        // Denominator
        const denominator = map(
            map(division, (division) => 1 - division), (differenceResult) => Math.sqrt(differenceResult)
        );

        console.log(`Denominador - Paso 4 - Restamos 1 a la division: ${map(division, (division) => 1 - division)}`);
        console.log(`Denominador - Paso 5 - Raiz cuadrada de la resta: ${map(
            map(division, (division) => 1 - division), (differenceResult) => Math.sqrt(differenceResult)
        )}`);

        this._actualPosition = map(numerator, (value, index) => value / denominator.get(index))
        console.log(`Posicion actual - Paso 1 - Dividimos el nominador por el denominador: ${this._actualPosition.toString()}`)

        console.log(this._actualPosition.toString())*/

    }

    calculateProperTimeDueTimeDilation(time: number, relativeVelocity: Matrix): number {
        
        const velocity = norm(relativeVelocity);
        console.log(`Velocidad ${velocity}`)

        const properTime = time / Math.sqrt((1 - (Math.pow(Number(velocity), 2)/Math.pow(SpecialRelativityObject.c, 2))));

        return properTime;

    }

    // Setters and Getters

    get properTime(): number {
        return this._properTime;
    }

    set properTime(time: number) {
        this._properTime = time;
    }

    get actualPosition(): Matrix {
        return this._actualPosition;
    }

    set actualPosition(position: Matrix) {
        this._actualPosition = position;
    }

    get velocity(): Matrix {
        return this._velocity;
    }

    set velocity(velocity: Matrix) {
        this._velocity = velocity;
    }

}

export default SpecialRelativityObject;
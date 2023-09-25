import { SceneObject } from "../../SceneObject";
import { add, matrix, multiply, norm } from 'mathjs';
import { SPEED_OF_LIGHT } from "../../constants";
class SpecialRelativityObject extends SceneObject {
    constructor(data = {}) {
        super(data);
        this._velocity = matrix([0, 0, 0]);
        this._properTime = 0;
        this._lorentzFactor = 1;
        Object.assign(this, data);
    }
    update(time) {
        // Calculate the actual position
        const actualPosition = add(this._initialPosition, multiply(this._velocity, time));
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
    calculateProperTimeDueTimeDilation(time, relativeVelocity) {
        const velocity = norm(relativeVelocity);
        console.log(`Velocidad ${velocity}`);
        const properTime = time / Math.sqrt((1 - (Math.pow(Number(velocity), 2) / Math.pow(SPEED_OF_LIGHT, 2))));
        return properTime;
    }
    // Setters and Getters
    get properTime() {
        return this._properTime;
    }
    set properTime(time) {
        this._properTime = time;
    }
    get actualPosition() {
        return this._actualPosition;
    }
    set actualPosition(position) {
        this._actualPosition = position;
    }
    get velocity() {
        return this._velocity;
    }
    set velocity(velocity) {
        this._velocity = velocity;
    }
}
export { SpecialRelativityObject };

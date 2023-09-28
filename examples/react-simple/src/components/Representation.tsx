import React, { useEffect, useRef, useState } from "react";
import * as PIXI from 'pixi.js';
import * as Simu from 'simu';

interface IRepresentation {
    simulation: Simu.KinematicsSimulation,
    car: Simu.KinematicsObject,
    person: Simu.KinematicsObject
}

const Representation: React.FC<IRepresentation> = (props) => {

    const [pixiContainer, setPixiContainer] = useState<any>(document.getElementById('pixi-container'));

    const [app, setApp] = useState<PIXI.Application>(new PIXI.Application({
        background: '#ff0000',
        resizeTo: window
    }));

    const [carSprite, setCarSprite] = useState(PIXI.Sprite.from('https://pixijs.com/assets/bunny.png'));

    const [personSprite, setPersonSprite] = useState(PIXI.Sprite.from('https://pixijs.com/assets/bunny.png'));

    useEffect(() => {

        setPixiContainer(document.getElementById('pixi-container'));
        pixiContainer.appendChild(app.view);

        const render = () => {

            carSprite.position.x = props.car.actualPosition.get([0]);
            carSprite.position.y = props.car.actualPosition.get([1]);

            personSprite.position.x = props.person.actualPosition.get([0]);
            personSprite.position.y = props.person.actualPosition.get([1]);

        };

        // Aquí puedes dibujar tus gráficos en el lienzo PixiJS
        if (props.simulation)
            props.simulation.updateEventEmmitter.subscribe(render);

        // Limpia el lienzo cuando el componente se desmonta
        return () => {
            app.destroy();
            props.simulation.updateEventEmmitter.unsubscribe(render);
        };
    }, []);

    return (
        <div id="pixi-container"></div>
    );
}

export default Representation;
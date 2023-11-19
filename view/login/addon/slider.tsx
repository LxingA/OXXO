/*
@author LxingA
@project OXXO
@name Help Desk
@description Complementos para el Componente con el Slider de la Vista de Autenticación
@date 17/11/23 12:00
*/
import type {Dispatch,SetStateAction} from 'react';

/** Establecer el Contenedor con la Imagén del Slider */
export const Image = ({image,title,message}:{
    /** Ruta Absoluta HTTP Firmada de la Imágen para el Deslizador */
    image: string,
    /** Titulo a Mostrar en el Deslizador */
    title: string,
    /** Mensaje Descriptivo a Mostrar en el Deslizador */
    message: string
}) => {
    return (
        <div className="ImgContent">
            <div className="ctnImg">
                <img src={image}/>
            </div>
            <div className="ctn">
                <h3>
                    {title}
                </h3>
                <p>
                    {message}
                </p>
            </div>
        </div>
    );
};

/** Contenedor con los Botonés de Acción del Slider */
export const Control = ({callback,viewID}:{
    /** Referencía al Callback para Mutar el Estado Actual del Deslizador Activo */
    callback: Dispatch<SetStateAction<number>>,
    /** Número Actual del Deslizador Activo */
    viewID: number
}) => {
    return (
        <div className="NavCtn">
            <button className={viewID == 0 ? "circle active" : "circle"} onClick={() => callback(0)}></button>
            <button className={viewID == 1 ? "circle active" : "circle"} onClick={() => callback(1)}></button>
            <button className={viewID == 2 ? "circle active" : "circle"} onClick={() => callback(2)}></button>
        </div>
    );
};
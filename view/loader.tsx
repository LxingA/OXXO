/*
@author LxingA
@project OXXO
@name Help Desk
@description Plantilla para la Carga Global de la Aplicación
@date 17/11/23 00:00
*/
import {useContext} from 'react';
import {Context as Service} from '../context/service';
import Domain from '../util/domain';

/** Componente Global para la Vista de Carga de la Aplicación */
const Loader = () => {
    const {application} = useContext(Service);
    return (
        <div className="LoadingBox">
            <div className="ctn">
                <img className="animate__pulse" src={Domain(application?.dark ? "logo/dark.webp" : "logo/light.webp")}/>
                <div className="loader"></div>
            </div>
        </div>
    );
};

export default Loader;
/*
@author LxingA
@project OXXO
@name Help Desk
@description Plantilla para la Carga Global de la Aplicación
@date 17/11/23 00:00
*/
import {useContext} from 'react';
import {Context as Service} from '../context/service';

/** Componente Global para la Vista de Carga de la Aplicación */
const Loader = () => {
    const {application,asset} = useContext(Service);
    return (
        <div className="maincontent">
            <div className="LoadingBox">
                <div className="ctn">
                    <img className="animate__pulse" src={asset!["logo"][application!["dark"] ? "dark" : "light"]}/>
                    <div className="loader"></div>
                </div>
            </div>
        </div>
    );
};

export default Loader;
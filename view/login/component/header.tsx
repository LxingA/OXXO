/*
@author LxingA
@project OXXO
@name Help Desk
@description Componente con la Cabecera Principal de la Vista de Autenticación
@date 15/11/23 22:00
*/
import {useContext} from 'react';
import {Link} from 'react-router-dom';
import {Context} from '../../../context/global';
import AddonOptions from '../addon/headerOptions';

/** Componente con la Cabecera de la Vista de Autenticación */
const Header = () => {
    const Global = useContext(Context);
    return (
        <div className="NavForm">
            <div className="col1">
                <Link to="/">
                    <img src={Global["application"]?.logo[(Global["application"]?.dark ? "dark" : "white")] as string}/>
                </Link>
            </div>
            <div className="col2">
                <AddonOptions />
            </div>
        </div>
    );
};

export default Header;
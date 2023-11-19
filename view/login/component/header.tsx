/*
@author LxingA
@project OXXO
@name Help Desk
@description Componente con la Cabecera de la Vista de Autenticación
@date 17/11/23 09:00
*/
import {useContext} from 'react';
import {Context} from '../../../context/service';
import {Logo,Option} from '../addon/header';

/** Componente con la Cabecera de la Vista de Autenticación */
const Header = () => {
    const {asset,application,dispatcher} = useContext(Context);
    return (
        <div className="NavForm">
            <Logo path={asset!.logo![application?.dark ? "light" : "color"]}/>
            <Option state={application!.dark} dispatch={dispatcher!}/>
        </div>
    )
};

export default Header;
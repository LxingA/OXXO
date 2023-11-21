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
import Domain from '../../../util/domain';

/** Componente con la Cabecera de la Vista de Autenticación */
const Header = () => {
    const {application,dispatcher} = useContext(Context);
    return (
        <div className="NavForm">
            <Logo path={Domain(application?.dark ? "logo/dark.webp" : "logo/light.webp")}/>
            <Option state={application!.dark} dispatch={dispatcher!}/>
        </div>
    )
};

export default Header;
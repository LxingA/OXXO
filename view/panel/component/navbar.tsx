/*
@author LxingA
@project OXXO
@name Help Desk
@description Componente con la Barra de Navegación del Panel de Control
@date 18/11/23 15:30
*/
import {useContext} from 'react';
import {Context as Authentication} from '../../../context/auth';
import {UserGreeting} from '../addon/navbar';

/** Componente con la Barra de Navegación del Panel de Control */
const Navbar = () => {
    const {user} = useContext(Authentication);
    return (
        <div className="navPanelSecundary Floating">
            <div className="col1">
                <UserGreeting name={user!["displayName"] ?? user!["email"] as string}/>
            </div>
            <div className="col2 OptionsContent">

            </div>
        </div>
    );
};

export default Navbar;
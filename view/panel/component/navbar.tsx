/*
@author LxingA
@project OXXO
@name Help Desk
@description Componente con la Barra de Navegación del Panel de Control
@date 18/11/23 15:30
*/
import {useContext} from 'react';
import {Context as Authentication} from '../../../context/auth';
import {Context as Service} from '../../../context/service';
import {UserGreeting,Options} from '../addon/navbar';
import {Link} from 'react-router-dom';
import Domain from '../../../util/domain';

/** Componente con la Barra de Navegación del Panel de Control */
const Navbar = () => {
    const {application} = useContext(Service);
    const {user} = useContext(Authentication);
    return (
        <div className="navPanelSecundary Floating">
            <div className="col1">
                <UserGreeting name={user!["displayName"] ?? user!["email"] as string}/>
            </div>
            <Link to="/" className="LogoMain">
                <img src={Domain(`logo/${application?.dark ? "dark" : "light"}.webp`)}/>
            </Link>
            <div className="col2 OptionsContent">
                <Options enableSearch={false}/>
            </div>
        </div>
    );
};

export default Navbar;
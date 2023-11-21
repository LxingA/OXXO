/*
@author LxingA
@project OXXO
@name Help Desk
@description Componente con el Menú Inicio del Panel de Control
@date 18/11/23 00:30
*/
import {Fragment,useContext} from 'react';
import {Context as Authenticacion} from '../../../context/auth';
import {Context as Service} from '../../../context/service';
import {ButtonSignOut,PhotoCircle,Navbar} from '../addon/menu';
import Domain from '../../../util/domain';

/** Componente con el Menú Principal del Panel de Control */
const Menu = () => {
    const {user} = useContext(Authenticacion);
    const {firebase} = useContext(Service);
    return (
        <Fragment>
            <div className="col1 mm">
                <PhotoCircle userDefault={Domain("user/default.webp")} userPhoto={user!["photoURL"]}/>
            </div>
            <div className="col2 mm">
                <Navbar />
            </div>
            <div className="col3 mm">
                <ButtonSignOut firebaseAuth={firebase!["authentication"]}/>
            </div>
        </Fragment>
    );
};

export default Menu;
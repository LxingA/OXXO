/*
@author LxingA
@project OXXO
@name Help Desk
@description Plantilla para la Verificación de la Sesión en la Aplicación
@date 17/11/23 00:00
*/
import {ReactNode,useContext} from 'react';
import {Context} from '../context/auth';
import {Navigate,useLocation} from 'react-router-dom';

/** Plantilla para la Verificación de la Sesión en la Aplicación */
const Auth = ({children}:{
    /** Referencía al Hijo DOM de la Plantilla */
    children: ReactNode
}) => {
    const {state} = useContext(Context);
    const {pathname,search} = useLocation();
    return state ? children : (
        <Navigate to={`/auth?continue=${encodeURIComponent(pathname+search)}`} replace/>
    );
};

export default Auth;
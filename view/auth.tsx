/*
@author LxingA
@project OXXO
@name Help Desk
@description Plantilla para Determinar cuando el Usuario se ha Autenticado en la Aplicación
@date 15/11/23 23:00
*/
import {useContext} from 'react';
import {Context} from '../context/global';
import type {ReactNode} from 'react';
import ViewLogin from '../view/login';

const Authentication = ({children}:{
    children: ReactNode
}) => {
    const Global = useContext(Context);
    return (Global["application"]?.authentic) ? (
        children
    ) : <ViewLogin />;
};

export default Authentication;
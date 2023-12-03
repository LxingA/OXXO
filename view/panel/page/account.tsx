/*
@author LxingA
@project OXXO
@name Help Desk
@description Página Predeterminada para la Edición de la Cuenta de un Usuario
@date 19/11/23 14:00
*/
import {Fragment,useEffect} from 'react';
import {AccountInformation,AccountPhoto} from '../component/account';

/** Página para Mostrar la Edición de la Información de un Usuario */
const Account = () => {
    useEffect(() => {
        const divParent = document["querySelector"](".ctnMainPatern")!;
        divParent["setAttribute"]("class","ctnMainPatern UserMain");
        return () => divParent["setAttribute"]("class","ctnMainPatern");
    },[]);
    return (
        <Fragment>
            <div className="col1">
                <AccountInformation />
            </div>
            <div className="col2">
                <AccountPhoto />
            </div>
        </Fragment>
    );
};

export default Account;
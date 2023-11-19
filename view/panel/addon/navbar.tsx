/*
@author LxingA
@project OXXO
@name Help Desk
@description Complementos para el Componente con la Barra de Navegación del Panel de Control
@date 18/11/23 15:30
*/
import {Fragment} from 'react';
import {useTranslation} from 'react-i18next';

/** Complemento para Mostrar el Saludo al Usuario */
export const UserGreeting = ({name}:{
    /** Nombre del Usuario o Correo Electrónico */
    name: string
}) => {
    const {t} = useTranslation();
    return (
        <Fragment>
            <h3>
                {t("SLangAppTranslationViewPanelNavbarGreetingLabel")}, <strong>{name}</strong>
            </h3>
        </Fragment>
    );
};
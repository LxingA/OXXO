/*
@author LxingA
@project OXXO
@name Help Desk
@description Página para Realizar la Recuperación de la Contraseña para un Usuario
@date 18/11/23 17:30
*/
import {Fragment} from 'react';
import {useTranslation} from 'react-i18next';
import {Input,Suggest} from '../addon/form';

/** Página Predeterminada para la Recuperación de Contraseña de un Usuario */
const Recovery = () => {
    const {t} = useTranslation();
    const buttonLabel = t("SLangAppTranslationViewLoginRecoveryButtonLabel")["split"]("|");
    return (
        <Fragment>
            <h3>
                {t("SLangAppTranslationViewLoginRecoveryTitle")}
            </h3>
            <Input title={t("SLangAppTranslationViewLoginFormInputUserLabel")} icon="envelope-alt" options={{
                type: "email",
                placeholder: t("SLangAppTranslationViewLoginFormInputUserHolder"),
                name: "osoxxo_input_recovery_mail"
            }}/>
            <button className="full">
                {buttonLabel[0]}
            </button>
            <Suggest major path="/auth/login" message={t("SLangAppTranslationViewLoginRecoveryAuthenticMessage")} text={t("SLangAppTranslationViewLoginRecoveryAuthenticAlt")}/>
        </Fragment>
    );
};

export default Recovery;
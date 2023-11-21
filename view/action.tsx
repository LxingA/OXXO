/*
@author LxingA
@project OXXO
@name Help Desk
@description Vista Predeterminada para las Acciones de los Usuarios de Verificar Correos, Reautenticarse Etc.
@date 20/11/23 19:30
*/
import {useEffect,useContext,Fragment,useState} from 'react';
import {useSearchParams,Navigate} from 'react-router-dom';
import {useTranslation} from 'react-i18next';
import {Context as Service} from '../context/service';
import {applyActionCode} from 'firebase/auth';
import type {Auth} from 'firebase/auth';
import type {ReactNode} from 'react';
import ComponentHeader from './login/component/header';

/** Contenedor con los Componentes Hijos para Cada Acción de la Aplicación */
const Element = {
    /** Componente Hijo para la Verificación de un Correo Electrónico */
    verifyEmail: ({authentic,code}:{
        /** Referencía a la Instancia de Firebase Auth by Identity Platform */
        authentic: Auth,
        /** Código de Autorización para Aplicar la Acción Solicitada */
        code: string
    }) => {
        const {t} = useTranslation();
        const [loading,setLoading] = useState<boolean>(true);
        const label = t("SLangAppTranslationViewPanelPageAccountPersonalVerifyEmailButton")["split"]("|")[1] + "...";
        const Handler = async() => {
            try{
                (await applyActionCode(authentic,code));
                setLoading(false);
            }catch(_){
                //Definir los errores generales
            }
        };
        useEffect(() => {
            Handler();
        });
        return (
            <Fragment>
                {!loading && (
                    <i className="uil uil-check Mainh3"></i>
                )}
                <h3>
                    {loading ? label : "dsdsdsds"}
                </h3>
                {!loading && (
                    <Fragment>
                        <p className="sucessfullp">
                            {t("SLangAppTranslationViewActionPageDoVerifyEmailSuccessMessage")}
                        </p>
                        <button className="full" onClick={() => {location["href"] = "/"}}>
                            {authentic["currentUser"] ? t("SLangAppTranslationViewPanelPageIndexTitle") : t("SLangAppTranslationViewLoginRecoveryAuthenticAlt")}
                        </button>
                    </Fragment>
                )}
            </Fragment>
        );
    }
};

/** Definición de la Plantilla para la Verificación de las Acciones */
const Template = ({children}:{
    /** Referencía al Hijo DOM del Componente */
    children: ReactNode
}) => {
    return (
        <div className="formContentMain MainCG">
            <ComponentHeader />
            <div className="formctn">
                <div className="container">
                    {children}
                </div>
            </div>
        </div>
    );
};

/** Renderización de la Funcionalidad para Establecer la Acción */
const Component = ({code,mode,client}:{
    /** Código de Autorización para Aplicar la Acción Solicitada */
    code: string | null,
    /** Modo de Acción a Accionar */
    mode: string,
    /** Referencía a la Instancia de Firebase Auth by Identity Platform */
    client: Auth
}) => {
    switch(mode){
        case "verifyEmail":
        return code ? (
            <Template>
                <Element.verifyEmail authentic={client} code={code}/>
            </Template>
        ) : <Navigate to="/" replace/>;
    }
};

/** Vista Predeterminada para las Acciones de la Autenticación de la Aplicación */
const Action = () => {
    const [query] = useSearchParams();
    const {application,firebase} = useContext(Service);
    const {t} = useTranslation();
    const allowedMethods = ["resetPassword","recoverEmail","verifyEmail","reauthUser"];
    const definedTitle = `%TITLE% - ${application?.client} ${application?.name}`;
    useEffect(() => {
        switch(query["get"]("mode")!){
            case "resetPassword":
                document["title"] = definedTitle["replace"]("%TITLE%",t("SLangAppTranslationViewActionPageDoResetPasswordTitle"));
            break;
            case "recoverEmail":
                document["title"] = definedTitle["replace"]("%TITLE%",t("SLangAppTranslationViewActionPageDoRecoverEmailTitle"));
            break;
            case "verifyEmail":
                document["title"] = definedTitle["replace"]("%TITLE%",t("SLangAppTranslationViewActionPageDoVerifyEmailTitle"));
            break;
            case "reauthUser":
                document["title"] = definedTitle["replace"]("%TITLE%",t("SLangAppTranslationViewActionPageDoReauthUserTitle"));
            break;
        }
    });
    return (query["has"]("mode") && allowedMethods["includes"](query["get"]("mode")!)) ? (
        <Component client={firebase!["authentication"]} mode={query["get"]("mode")!} code={query["get"]("oobCode")}/>
    ) : <Navigate to="/" replace/>;
};

export default Action;
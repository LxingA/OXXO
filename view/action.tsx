/*
@author LxingA
@project OXXO
@name Help Desk
@description Vista Predeterminada para las Acciones de los Usuarios de Verificar Correos, Reautenticarse Etc.
@date 20/11/23 19:30
*/
import {useEffect,useContext,Fragment,useState} from 'react';
import {useSearchParams,Navigate,useNavigate} from 'react-router-dom';
import {useTranslation} from 'react-i18next';
import {Context as Service} from '../context/service';
import {upperStringFirst} from '../util/extra';
import {applyActionCode,checkActionCode} from 'firebase/auth';
import {verifyPasswordResetCode,confirmPasswordReset} from 'firebase/auth';
import {reauthenticateWithCredential,EmailAuthProvider} from 'firebase/auth';
import type {Auth} from 'firebase/auth';
import type {ReactNode,MouseEvent,ChangeEvent} from 'react';
import type {ValidityInput} from './login/type/form';
import ComponentHeader from './login/component/header';

/** Contenedor con los Componentes Hijos para Cada Acción de la Aplicación */
const Element = {
    /** Componente Hijo para la Aplicación de un Código de Acción */
    verify: ({client,code,mode}:{
        /** Referencía a la Instancia de Firebase Auth by Identity Platform */
        client: Auth,
        /** Código de Autorización para Aplicar la Acción Solicitada */
        code: string | null,
        /** Nombre del Modo de la Acción para la Definición en la Plantilla */
        mode: string
    }) => {
        const {t} = useTranslation();
        const [state,setState] = useState<boolean | null>(null);
        const [loading,setLoading] = useState<boolean>(false);
        const conditional = (typeof state === "boolean");
        const buttonLabel = t(`SLangAppTranslationViewActionPageDo${upperStringFirst(mode)}ButtonLabel`)["split"]("|");
        const handler = async(event:MouseEvent<HTMLButtonElement>) => {
            event["preventDefault"]();
            setLoading(true);try{
                (await checkActionCode(client,code!));
                (await applyActionCode(client,code!));
                (await client["updateCurrentUser"](client["currentUser"]));
                setState(true);
                setTimeout(() => {
                    location["href"] = "/account";
                },2000);
            }catch(_){setState(false)}
        };return (
            <Fragment>
                {conditional && (
                    <i className={`uil uil-${state ? "check" : "times"} Mainh3`}></i>
                )}
                <h3>
                    {conditional ? (state ? t(`SLangAppTranslationViewActionPageDo${upperStringFirst(mode)}SuccessLabel`) : t(`SLangAppTranslationViewActionPageDo${upperStringFirst(mode)}ErrorLabel`)) : t(`SLangAppTranslationViewActionPageDo${upperStringFirst(mode)}Title`)}
                </h3>
                {conditional ? (
                    <Fragment>
                        <p className="sucessfullp">
                            {state ? t(`SLangAppTranslationViewActionPageDo${upperStringFirst(mode)}SuccessMessage`) : t(`SLangAppTranslationViewActionPageDo${upperStringFirst(mode)}ErrorMessage`)}
                        </p>
                    </Fragment>
                ) : (
                    <Fragment>
                        <button className="full" onClick={handler} disabled={loading}>
                            {loading ? buttonLabel[1] : buttonLabel[0]}
                        </button>
                    </Fragment>
                )}
            </Fragment>
        );
    },
    /** Componente Hijo para el Cambio de la Contraseña de un Usuario */
    password: ({client,code,mode}:{
        /** Referencía a la Instancia de Firebase Auth by Identity Platform */
        client: Auth,
        /** Código de Autorización para Aplicar la Acción Solicitada */
        code: string | null,
        /** Nombre del Modo de la Acción para la Definición en la Plantilla */
        mode: string
    }) => {
        const {t} = useTranslation();
        const {authentication} = useContext(Service);
        const [state,setState] = useState<boolean | null>(null);
        const [loading,setLoading] = useState<boolean>(false);
        const [value,setValue] = useState<ValidityInput>({value:undefined});
        const [query] = useSearchParams();
        const navigator = useNavigate();
        const conditional = (typeof state === "boolean");
        const buttonLabel = t(`SLangAppTranslationViewActionPageDo${upperStringFirst(mode)}ButtonLabel`)["split"]("|");
        const handler = {
            click: async(event:MouseEvent<HTMLButtonElement>) => {
                event["preventDefault"]();
                setLoading(true);try{
                    switch(mode){
                        case "resetPassword":
                            (await verifyPasswordResetCode(client,code!));
                            (await confirmPasswordReset(client,code!,value["value"]!));
                            (await client["updateCurrentUser"](client["currentUser"]));
                            setState(true);
                        break;
                        case "reauth":
                            const savedRequestedID = sessionStorage["getItem"]("sindexauthentictoken");
                            if(!savedRequestedID || (query["get"]("requestID") !== JSON["parse"](savedRequestedID)["token"])) setState(false);
                            else{
                                let dencryptRequestedID = JSON["parse"](savedRequestedID);
                                (await reauthenticateWithCredential(client["currentUser"]!,EmailAuthProvider["credential"](client["currentUser"]!["email"]!,value["value"]!)));
                                setState(true);
                                setTimeout(() => navigator(decodeURIComponent(dencryptRequestedID["continue"]),{replace:true}),3000);
                                sessionStorage["removeItem"]("sindexauthentictoken");
                            }
                        break;
                    }
                }catch(_){setState(false)}
            },
            change: (event:ChangeEvent<HTMLInputElement>) => setValue(older => {
                let current = older;
                if(event["target"]["value"]["length"] === 0) current = {value:undefined};
                else{
                    if(event["target"]["value"]["length"] <= authentication!["password"]["min"]) current["check"] = "invalid";
                    else if(event["target"]["value"]["length"] >= authentication!["password"]["max"]) current["check"] = "invalid";
                    else{
                        current["check"] = "valid";
                        current["value"] = event["target"]["value"];
                    }
                }return {...current};
            })
        };return (
            <Fragment>
                <h3>
                    {conditional ? (state ? t(`SLangAppTranslationViewActionPageDo${upperStringFirst(mode)}SuccessLabel`) : t(`SLangAppTranslationViewActionPageDo${upperStringFirst(mode)}ErrorLabel`)) : t("SLangAppTranslationViewLoginAuthTitle")}
                </h3>
                {conditional ? (
                    <Fragment>
                        <p className="sucessfullp">
                            {state ? t(`SLangAppTranslationViewActionPageDo${upperStringFirst(mode)}SuccessMessage`) : t(`SLangAppTranslationViewActionPageDo${upperStringFirst(mode)}ErrorMessage`)}
                        </p>
                    </Fragment>
                ) : (
                    <Fragment>
                        <input type="password" placeholder={t(`SLangAppTranslationViewActionPageDo${upperStringFirst(mode)}InputLabel`)} onChange={handler["change"]}/>
                        <button onClick={handler["click"]} className="full" disabled={loading || (value["check"] == "invalid" || typeof value["value"] == "undefined")}>
                            {loading ? buttonLabel[1] : buttonLabel[0]}
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
            <ComponentHeader query={false}/>
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
    const parameters = {client,code,mode};
    switch(mode){
        case "verifyEmail": case "recoverEmail":
        return code ? (
            <Template>
                <Element.verify {...parameters}/>
            </Template>
        ) : <Navigate to="/" replace/>;
        case "resetPassword": case "reauth":
        return (
            <Template>
                <Element.password {...parameters}/>
            </Template>
        );
    }
};

/** Vista Predeterminada para las Acciones de la Autenticación de la Aplicación */
const Action = () => {
    const [query] = useSearchParams();
    const {application,firebase} = useContext(Service);
    const {t} = useTranslation();
    const navigator = useNavigate();
    const allowedMethods = ["resetPassword","recoverEmail","verifyEmail","reauth"];
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
            case "reauth":
                (!query["has"]("requestID") || !sessionStorage["getItem"]("sindexauthentictoken")) && navigator("/",{replace:true});
                document["title"] = definedTitle["replace"]("%TITLE%",t("SLangAppTranslationViewActionPageDoReauthUserTitle"));
            break;
        }
    });
    return (query["has"]("mode") && allowedMethods["includes"](query["get"]("mode")!)) ? (
        <Component client={firebase!["authentication"]} mode={query["get"]("mode")!} code={query["get"]("oobCode")}/>
    ) : <Navigate to="/" replace/>;
};

export default Action;
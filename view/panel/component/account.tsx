/*
@author LxingA
@project OXXO
@name Help Desk
@description Componentes para la Vista de Edición de Cuentas del Panel de Control
@date 19/11/23 15:00
*/
import {Fragment,useContext,useState} from 'react';
import {useTranslation} from 'react-i18next';
import {Context as Authentication} from '../../../context/auth';
import {Context as Service} from '../../../context/service';
import {ref,uploadBytes,getDownloadURL} from 'firebase/storage';
import {updateProfile,updateEmail,updatePassword,sendEmailVerification} from 'firebase/auth';
import {Input} from '../addon/account';
import {v4} from 'uuid';
import {useNavigate,useSearchParams} from 'react-router-dom';
import Loader from '../../loader';
import Domain from '../../../util/domain';
import type {ChangeEvent,MouseEvent} from 'react';
import type {ValidityInput} from '../../login/type/form';
import $ from 'jquery';

/** Componente con la Información General de un Usuario */
export const AccountInformation = () => {
    const defaultValues = {
        osoxxo_input_account_name: {
            value: undefined
        },
        osoxxo_input_account_email: {
            value: undefined
        },
        osoxxo_input_account_password: {
            value: undefined
        }
    };
    const navigator = useNavigate();
    const {t} = useTranslation();
    const {user} = useContext(Authentication);
    const {authentication} = useContext(Service);
    const [query] = useSearchParams();
    const [values,setValues] = useState<Record<string,ValidityInput>>(defaultValues);
    const [loading,setLoading] = useState<Record<string,boolean>>({
        osoxxo_input_account_name: false,
        osoxxo_input_account_email: false,
        osoxxo_input_account_password: false,
        osoxxo_input_account_verify: false
    });
    const [message,setMessage] = useState<Record<string,string | null>>({
        osoxxo_input_account_name: null,
        osoxxo_input_account_email: null,
        osoxxo_input_account_password: null,
        osoxxo_input_account_verify: null
    });
    /** Callback de Utilidad para la Mutación del Objeto para la Carga de la Entrada */
    const UtilHandlerLoader = (state:Record<string,boolean>,name:string,action:boolean) => {
        let current = state;
        current[name] = action;
        return {...current};
    };
    /** Callback de Utilidad para la Mutación del Objeto para los Mensajes de la Entrada */
    const UtilHandlerMessage = (state:Record<string,string | null>,name:string,action:string | null) => {
        let current = state;
        current[name] = action;
        return {...current};
    };
    /** Callback para Validar las Entradas del Formulario */
    const ChangedHandler = (event:ChangeEvent<HTMLInputElement>) => {
        event["preventDefault"]();
        setValues(state => {
            let newState = state;
            let current;
            switch(event["target"]["name"]){
                case "osoxxo_input_account_name":
                    current = state[event["target"]["name"]];
                    if(event["target"]["value"]["length"] === 0){
                        setMessage(state => UtilHandlerMessage(state,event["target"]["name"],null));
                        current = defaultValues[event["target"]["name"]];
                    }else{
                        if(event["target"]["value"]["length"] <= 3) current["check"] = "invalid";
                        else if(event["target"]["value"]["length"] >= 50) current["check"] = "invalid";
                        else if(!(/([A-Za-zÀ-ÿ\u00f1\u00d1\s]+)$/["test"](event["target"]["value"]))) current["check"] = "invalid";
                        else{
                            current["check"] = "valid";
                            current["value"] = event["target"]["value"];
                        }
                    }
                break;
                case "osoxxo_input_account_email":
                    current = state[event["target"]["name"]];
                    if(event["target"]["value"]["length"] === 0){
                        setMessage(state => UtilHandlerMessage(state,event["target"]["name"],null));
                        current = defaultValues[event["target"]["name"]];
                    }else{
                        if(event["target"]["value"]["length"] <= 6) current["check"] = "invalid";
                        else if(event["target"]["value"]["length"] >= 50) current["check"] = "invalid";
                        else if(!(/^([A-Za-z\_\-0-9]+)\@([a-z]+)\.([a-z]+){2,4}(\.([a-z]+){2,4})?$/["test"](event["target"]["value"]))) current["check"] = "invalid";
                        else{
                            current["check"] = "valid";
                            current["value"] = event["target"]["value"];
                        }
                    }
                break;
                case "osoxxo_input_account_password":
                    current = state[event["target"]["name"]];
                    if(event["target"]["value"]["length"] === 0){
                        setMessage(state => UtilHandlerMessage(state,event["target"]["name"],null));
                        current = defaultValues[event["target"]["name"]];
                    }else{
                        if(event["target"]["value"]["length"] <= authentication!["password"]["min"]) current["check"] = "invalid";
                        else if(event["target"]["value"]["length"] >= authentication!["password"]["max"]) current["check"] = "invalid";
                        else{
                            current["check"] = "valid";
                            current["value"] = event["target"]["value"];
                        }
                    }
                break;
            }
            newState[event["target"]["name"]] = current;
            return {...newState};
        });
    };
    /** Callback para realizar la Mutación de Algún Dato en el Usuario */
    const MutateHandler = async(name:string,event?:MouseEvent<HTMLButtonElement>): Promise<void> => {
        event && event["preventDefault"]();
        setLoading(state => UtilHandlerLoader(state,name,true));
        setMessage(state => UtilHandlerMessage(state,name,null));
        try{
            switch(name){
                case "osoxxo_input_account_name":
                    (await updateProfile(user!,{displayName:values[name]["value"]}));
                    setValues(state => ({...state,osoxxo_input_account_name:{value:undefined}}));
                    $('input[name="osoxxo_input_account_name"]')["val"]("");
                break;
                case "osoxxo_input_account_email":
                    (await updateEmail(user!,values[name]["value"]!));
                    setValues(state => ({...state,osoxxo_input_account_email:{value:undefined}}));
                    $('input[name="osoxxo_input_account_email"]')["val"]("");
                break;
                case "osoxxo_input_account_password":
                    (await updatePassword(user!,values[name]["value"]!));
                    setValues(state => ({...state,osoxxo_input_account_password:{value:undefined}}));
                    $('input[name="osoxxo_input_account_password"]')["val"]("");
                break;
                case "osoxxo_input_account_verify":
                    (await sendEmailVerification(user!));
                break;
            }
            setLoading(state => UtilHandlerLoader(state,name,false));
            (name !== "osoxxo_input_account_verify") && setValues(state => {
                let current = state;
                current[name] = defaultValues[name];
                return {...current};
            });
            (name == "osoxxo_input_account_verify") && setMessage(state => UtilHandlerMessage(state,name,t("SLangAppTranslationViewPanelPageAccountPersonalVerifySenderSuccess")));
        }catch(error){
            switch((error as {})["code"]){
                case "auth/email-already-in-use":
                    setMessage(state => UtilHandlerMessage(state,name,t("SLangAppTranslationViewPanelPageAccountPersonalUpdateEmailAlreadyInUseMessage")));
                break;
                case "auth/requires-recent-login":
                    const setUniqKeyForRequest = v4();
                    sessionStorage["setItem"]("sindexauthentictoken",JSON["stringify"]({
                        continue: encodeURIComponent(location["pathname"]),
                        token: setUniqKeyForRequest
                    }));
                    navigator(`/do?mode=reauth&requestID=${setUniqKeyForRequest}`,{replace:true});
                break;
                default:
                    setMessage(state => UtilHandlerMessage(state,name,t("SLangAppTranslationViewPanelPageAccountPersonalUnknownUpdateAnyInformationError")));
                break;
            }setLoading(state => UtilHandlerLoader(state,name,false));
        }
    };
    const buttonLabelVerify = t("SLangAppTranslationViewPanelPageAccountPersonalVerifyEmailButton")["split"]("|");
    return (
        <Fragment>
            <h3>
                {t("SLangAppTranslationViewPanelPageAccountPersonalInfoTitle")}
            </h3>
            <Input error={message["osoxxo_input_account_name"]} callback={MutateHandler} loading={loading["osoxxo_input_account_name"]} state={values} checker={values["osoxxo_input_account_name"]["check"]} title={t("SLangAppTranslationViewPanelPageAccountPersonalInputNamesLabel")} message={user!["displayName"] ?? t("SLangAppTranslationViewPanelPageAccountPersonalInputNamesNotDefinedLabel")} option={{
                name: "osoxxo_input_account_name",
                type: "text",
                onChange: ChangedHandler
            }}/>
            {user!["emailVerified"] ? (
                <Input error={message["osoxxo_input_account_email"]} callback={MutateHandler} loading={loading["osoxxo_input_account_email"]} state={values} checker={values["osoxxo_input_account_email"]["check"]} title={t("SLangAppTranslationViewPanelPageAccountPersonalInputMailLabel")} message={user!["email"] as string} option={{
                    name: "osoxxo_input_account_email",
                    type: "email",
                    onChange: ChangedHandler
                }}/>
            ) : (
                <div className="infoDt">
                    <p>
                        {message["osoxxo_input_account_verify"] ?? t("SLangAppTranslationViewPanelPageAccountPersonalVerifyEmailMessage")}
                    </p>
                    <button onClick={event => MutateHandler("osoxxo_input_account_verify",event)} className="full" disabled={typeof message["osoxxo_input_account_verify"] == "string" || loading["osoxxo_input_account_verify"]}>
                        {loading["osoxxo_input_account_verify"] ? buttonLabelVerify[1] : (message["osoxxo_input_account_verify"]) ? buttonLabelVerify[2] : buttonLabelVerify[0]}
                    </button>
                </div>
            )}
            <Input error={message["osoxxo_input_account_password"]} callback={MutateHandler} loading={loading["osoxxo_input_account_password"]} state={values} checker={values["osoxxo_input_account_password"]["check"]} title={t("SLangAppTranslationViewPanelPageAccountPersonalInputPassLabel")} message="*********" option={{
                name: "osoxxo_input_account_password",
                type: "password",
                onChange: ChangedHandler
            }}/>
        </Fragment>
    );
};

/** Componente con la Información Acerca de la Foto de Perfil de un Usuario */
export const AccountPhoto = () => {
    const {t} = useTranslation();
    const {firebase} = useContext(Service);
    const {user,information} = useContext(Authentication);
    const [loading,setLoading] = useState<boolean>(false);
    const [message,setMessage] = useState<string | null>(null);
    const Handler = async(event:ChangeEvent<HTMLInputElement>): Promise<void> => {
        event["preventDefault"]();
        setMessage(null);
        const current = event["target"]["files"]!;
        if(current["length"] >= 1){
            const allowTypes = ["image/jpeg","image/jpg","image/webp","image/png"];
            if(allowTypes["includes"](current[0]["type"])){
                setLoading(true);
                const currentUser = firebase!["authentication"]["currentUser"]!;
                try{
                    const reference = ref(firebase!["storage"],`f/${user!["uid"]}/photo`);
                    (await uploadBytes(reference,current[0]));
                    const photoURL = (await getDownloadURL(reference));
                    (await updateProfile(currentUser,{photoURL}));
                    setLoading(false);
                    setTimeout(() => document["querySelector"]("#simage_photo_user")!["setAttribute"]("src",photoURL),1000);
                }catch(error){
                    setLoading(false);
                    switch((error as {})["code"]){
                        default:
                            setMessage(t("SLangAppTranslationViewPanelPageAccountPhotoUserUploadCodeErrorUnknown"));
                        break;
                    }
                }
            }else setMessage(t("SLangAppTranslationViewPanelPageAccountPhotoUserUploadCodeErrorMIME"));
        }else setMessage(t("SLangAppTranslationViewPanelPageAccountPhotoUserUploadCodeErrorEmpty"));
    };
    return (
        <Fragment>
            <h3>
                {t("SLangAppTranslationViewPanelPageAccountPersonalPhotoTitle")}
            </h3>
            <div className="ctn">
                <div className="imgChange">
                    {loading ? (
                        <Loader />
                    ) : (
                        <Fragment>
                            <img id="simage_photo_user" src={user!["photoURL"] ?? Domain("user/default.webp")}/>
                            <input type="file" onChange={Handler} accept="image/*"/>
                            <i className="uil uil-cloud-upload" id="uploadI"></i>
                        </Fragment>
                    )}
                </div>
                {message && (
                    <div className="errorMini">
                        <div className="IconMin animate__rubberBand">
                            <i className="uil uil-exclamation-triangle"></i>
                        </div>
                        <p>
                            {message}
                        </p>
                    </div>
                )}
                <p className="Rango designWeb">
                    {t(information!["title"]!)}
                </p>
            </div>
        </Fragment>
    );
};
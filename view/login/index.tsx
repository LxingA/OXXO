/*
@author LxingA
@project OXXO
@name Help Desk
@description Página Principal para la Vista de la Autenticación
@date 17/11/23 08:30
*/
import {Outlet,Navigate,useSearchParams,useLocation,Link} from 'react-router-dom';
import {useContext,useEffect} from 'react';
import {Context as Authentication} from '../../context/auth';
import {Context as Service} from '../../context/service';
import {useTranslation} from 'react-i18next';
import ComponentHeader from './component/header';
import ComponentSlider from './component/slider';

/** Vista Principal de la Autenticación */
const Index = () => {
    const [query] = useSearchParams();
    const {pathname,search} = useLocation();
    const {state} = useContext(Authentication);
    const {application,asset} = useContext(Service);
    const {t} = useTranslation();
    useEffect(() => {
        const name = `${application?.client} ${application?.name}`;
        switch(pathname["split"]("/")[2]){
            case "login":
                document["title"] = `${t("SLangAppTranslationViewLoginAuthTitle")} - ${name}`;
            break;
            case "recovery":
                document["title"] = `${t("SLangAppTranslationViewLoginRecoveryTitle")} - ${name}`;
            break;
            default:
                document["title"] = `${t("SLangAppTranslationViewLoginIndexTitle")} - ${name}`;
            break;
        }
    });
    const container = (pathname["split"]("/")["length"] > 2);
    if(!state) return (
        <div className={container ? "formContentMain" : "formContentMain HomeOxxo"}>
            <ComponentHeader />
            <div className="column1">
                {container ? (
                    <div className="formctn">
                        <div className="container">
                            <Outlet />
                        </div>
                    </div>
                ) : (
                    <div className="MyhomeOxxoHerramientas">
                        <div className="flexie">
                            <div className="ctnTitle" data-aos="fade-up" data-aos-duration="1000">
                                <h3>
                                    {application?.client}
                                    <br/>
                                    {application?.name}
                                </h3>
                                <p dangerouslySetInnerHTML={{__html:t("SLangAppTranslationViewLoginIndexDescription")}}></p>
                                <Link to={{pathname:"/auth/login",search}} className="full">
                                    <i className="uil uil-sign-in-alt"></i>
                                    <span>
                                        {t("SLangAppTranslationViewLoginRecoveryAuthenticAlt")}
                                    </span>
                                </Link>
                            </div>
                            <div className="ctnImg">
                                <img src={asset?.home["cover"]} className="img1" data-aos="fade-up" data-aos-duration="1000"/>
                                <img src={asset?.home["background"]} className="img2" data-aos="fade-left" data-aos-duration="1000"/>
                            </div>
                        </div>
                    </div>
                )}
            </div>
            <div className="column2">
                <ComponentSlider />
            </div>
        </div>
    );else{
        if(query["has"]("continue")) return <Navigate to={decodeURIComponent(query["get"]("continue") ?? "/")} replace/>;
        else return <Navigate to="/" replace/>;
    }
};

export default Index;
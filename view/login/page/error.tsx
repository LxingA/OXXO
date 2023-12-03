/*
@author LxingA
@project OXXO
@name Help Desk
@description Página Predeterminada para Mostrar los Errores Globales del Panel de Control
@date 20/11/23 16:30
*/
import {useEffect} from 'react';
import {useTranslation} from 'react-i18next';
import {Link} from 'react-router-dom';
import Domain from '../../../util/domain';
import $ from 'jquery';

/** Vista Predeterminada para los Errores Globales de la Aplicación */
const Error = () => {
    const {t} = useTranslation();
    useEffect(() => {
        $(".formContentMain")["addClass"]("ErrorGeneral");
        return () => {
            $(".formContentMain")["removeClass"]("ErrorGeneral");
        }
    },[]);
    return (
        <div className="flexie">
            <div className="ctnTitle" data-aos="fade-up" data-aos-duration="1000">
                <h3>
                    {t("SLangAppTranslationViewErrorPageGlobalTitle")}
                </h3>
                <p>
                    {t("SLangAppTranslationViewErrorPageGlobalMessage")}
                </p>
                <Link className="full" to="/">
                    <i className="uil uil-sign-in-alt"></i>
                    <span>
                        {t("SLangAppTranslationViewLoginAuthTitle")}
                    </span>
                </Link>
            </div>
            <div className="ctnImg">
                <img src={Domain("error/home.webp")} className="img1" data-aos="fade-up" data-aos-duration="1000"/>
            </div>
        </div>
    );
};

export default Error;
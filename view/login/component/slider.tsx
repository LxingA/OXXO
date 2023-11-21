/*
@author LxingA
@project OXXO
@name Help Desk
@description Componente con el Slider Preterminado de la Aplicación
@date 17/11/23 12:00
*/
import {useState} from 'react';
import {Control,Image} from '../addon/slider';
import {useTranslation} from 'react-i18next';
import Domain from '../../../util/domain';

/** Componente con el Slider Preterminado de la Aplicación */
const Slider = () => {
    const {t} = useTranslation();
    const [current,setCurrent] = useState<number>(0);
    const SliderTitle = t("SLangAppTranslationViewLoginSliderTitle")["split"]("|");
    const SliderMessage = t("SLangAppTranslationViewLoginSliderMessage")["split"]("|");
    return (
        <div className="slidermain">
            <Image image={Domain(`login/slider/${current}.webp`)} title={SliderTitle[current]} message={SliderMessage[current]}/>
            <Control callback={setCurrent} viewID={current}/>
        </div>
    );
};

export default Slider;
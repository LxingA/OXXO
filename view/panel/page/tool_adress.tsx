/*
@author LxingA
@project OXXO
@name Help Desk
@description Vista para la Visualización de las Tiendas con sus Direcciones para su Modificación
@date 03/01/24 13:40
*/
import {useEffect,useState,useContext} from 'react';
import {useTranslation} from 'react-i18next';
import {Context as Service} from '../../../context/service';
import {Footer,NavBar} from '../component/tool';
import {getDocs,query,collection} from 'firebase/firestore';
import type {QueryConstraint} from 'firebase/firestore';
import type {Address as AddressPrototype} from '../type/tool';
import Loader from '../../loader';
import Timer from 'moment';

/** Vista para las Direcciones de la Tienda */
const Address = () => {
    const {firebase} = useContext(Service);
    const {t} = useTranslation();
    const [item,setItem] = useState<AddressPrototype[][]>();
    const [page,setPage] = useState<number>(1);
    const [total,setTotal] = useState<number>(0);
    const [search,setSearch] = useState<string>();
    const __init__ = async() => {
        const _definedBucketItems_: AddressPrototype[] = [];
        const _definedQueryContraints_: QueryConstraint[] = []; 
        (await Promise["all"](
            (await getDocs(query(collection(firebase!["database"],"address"),..._definedQueryContraints_)))["docs"]["map"]($item => {
                if(!$item["exists"]()) return;
                else _definedBucketItems_["push"]($item["data"]() as AddressPrototype);
            })
        ));
        setTotal(_definedBucketItems_["length"]);
        const _definedPaginationOnItems_: AddressPrototype[][] = [];
        for(let $x = 0; $x < _definedBucketItems_["length"]; $x += 10) _definedPaginationOnItems_["push"](_definedBucketItems_["slice"]($x,($x + 10)));
        setItem(_definedPaginationOnItems_);
    };
    useEffect(() => {
        !item && __init__();
    },[]);
    return !item ? <Loader /> : (
        <div className="ctnTable Direcciones">
            <NavBar disabled={typeof item == "undefined"} loading={typeof item == "undefined"} searching={setSearch} button={false}/>
            <div className="overflowauto">
                <table>
                    <thead>
                        <tr>
                            <th>
                                {t("SLangAppTranslationViewPanelPageToolAddressLabelCR")}
                            </th>
                            <th>
                                {t("SLangAppTranslationViewPanelPageToolAddressLabelDate")}
                            </th>
                            <th>
                                {t("SLangAppTranslationViewPanelPageToolAddressLabelName")}
                            </th>
                            <th>
                                {t("SLangAppTranslationViewPanelPageToolAddressLabelCorX")}
                            </th>
                            <th>
                                {t("SLangAppTranslationViewPanelPageToolAddressLabelPostal")}
                            </th>
                            <th>
                                {t("SLangAppTranslationViewPanelPageToolAddressLabelStreet")}
                            </th>
                            <th>
                                {t("SLangAppTranslationViewPanelPageToolAddressLabelRef")}
                            </th>
                            <th>
                                {t("SLangAppTranslationViewPanelPageToolAddressLabelExt")}
                            </th>
                            <th>
                                {t("SLangAppTranslationViewPanelPageToolAddressLabelCly")}
                            </th>
                            <th>
                                {t("SLangAppTranslationViewPanelPageToolAddressLabelCty")}
                            </th>
                            <th>
                                {t("SLangAppTranslationViewPanelPageToolAddressLabelTwn")}
                            </th>
                            <th>
                                {t("SLangAppTranslationViewPanelPageToolAddressLabelState")}
                            </th>
                            <th>
                                {t("SLangAppTranslationViewPanelPageToolAddressLabelMessage")}
                            </th>
                            <th>
                                {t("SLangAppTranslationViewPanelPageToolAddressLabelGeo")}
                            </th>
                            <th>
                                {t("SLangAppTranslationViewPanelPageToolAddressLabelForm")}
                            </th>
                            <th>
                                {t("SLangAppTranslationViewPanelPageToolAddressLabelButtons")}
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {(item && item["length"] >= 1) && item[page - 1]["map"](({cr,date,name,position:{lat,lng},postal,street,ref,identified:{ext},state,town,city,message,uniqKey,colony,geo},index) => (
                            <tr key={index}>
                                <td>
                                    {cr}
                                </td>
                                <td title={("modified" in date) ? Timer(date["modified"]!["toDate"]()["toISOString"]())["format"]("DD/MM/YY H:mm:ss") : "Sin Modificación"}>
                                    {Timer(date["created"]["toDate"]()["toISOString"]())["format"]("DD/MM/YY H:mm:ss")}
                                </td>
                                <td>
                                    {name}
                                </td>
                                <td>
                                    <a href={`https://www.google.com/maps/place/${lat}+${lng}`} target="_blank">
                                        {lat} {lng}
                                    </a>
                                </td>
                                <td>
                                    <a href={`https://micodigopostal.org/buscarcp.php?buscar=${postal}`} target="_blank">
                                        {postal}
                                    </a>
                                </td>
                                <td>
                                    {street}
                                </td>
                                <td>
                                    {ref}
                                </td>
                                <td>
                                    {ext}
                                </td>
                                <td>
                                    {colony}
                                </td>
                                <td>
                                    {city}
                                </td>
                                <td>
                                    {town}
                                </td>
                                <td>
                                    {state}
                                </td>
                                <td>
                                    <strong className="status">
                                        {message ?? "Ninguna"}
                                    </strong>
                                </td>
                                <td>
                                    <input type="checkbox" defaultChecked={geo}/>
                                </td>
                                <td>
                                    <strong className="status">
                                        {uniqKey ?? "No Envíado"}
                                    </strong>
                                </td>
                                <td>
                                    <div className="accioneslist">
                                        <button className="complete">
                                            <i className="uil uil-message"></i>
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <Footer disabled={typeof item == "undefined"} total={total} currentPage={page} limitPerPage={10} orders={item} callback={setPage}/>
        </div>
    )
};

export default Address;
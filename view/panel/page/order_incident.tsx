/*
@author LxingA
@project OXXO
@name Help Desk
@description Página Predeterminada para las Incidencias de los Pedidos
@date 19/11/23 14:00
*/
import {useEffect,Fragment,useState,useContext} from 'react';
import {collection,where,query,onSnapshot,orderBy,doc,getDoc} from 'firebase/firestore';
import {Context as Authentication} from '../../../context/auth';
import {Context as Service} from '../../../context/service';
import {ComponentIncidentEmptyView,ComponentIncidentListView,ComponentIncidentListViewPagination} from '../component/incident';
import {useTranslation} from 'react-i18next';
import {Outlet,useLocation,useNavigate} from 'react-router-dom';
import type {QueryFieldFilterConstraint} from 'firebase/firestore';
import type {RoleGroup} from '../../../type/auth';
import type IncidentPrototype from '../type/incident';
import Domain from '../../../util/domain';
import Loader from "../../loader";
import $ from 'jquery';

/** Página Predeterminada para las Incidencias de los Pedidos */
const Incident = () => {
    const {t} = useTranslation();
    const {firebase} = useContext(Service);
    const {pathname} = useLocation();
    const {information,user} = useContext(Authentication);
    const [page,setPage] = useState<number>(1);
    const [total,setTotal] = useState<number>(0);
    const [data,setData] = useState<IncidentPrototype[][]>();
    const [error,setError] = useState<string>();
    const navigator = useNavigate();
    useEffect(() => {
        $(".ctnMainPatern")["addClass"]("Incidencias");
        const allowedList: QueryFieldFilterConstraint[] = [];
        if((["oxxo"] as RoleGroup)["includes"](information!["role"]!)) allowedList["push"](where("user","==",user!["uid"]));
        const $__live__ = onSnapshot(query(collection(firebase!["database"],"incident"),orderBy("date","desc"),...allowedList),async $request => {
            const $incidents: IncidentPrototype[] = [];
            (await Promise["all"](
                $request["docs"]["map"](async $object => {
                    if(!$object["exists"]()) return;
                    else{
                        let incident = ($object["data"]() as IncidentPrototype);
                        incident["docID"] = $object["id"];
                        const information = (await getDoc(doc(firebase!["database"],"user",incident["user"])))["data"]()!;
                        $incidents["push"]({...incident,information});
                    };
                })
            ));
            const $pagination: (IncidentPrototype | undefined)[][] = [];
            for(let $x = 0; $x < $incidents["length"]; $x += 4) $pagination["push"]($incidents["slice"]($x,($x+4)));
            setTotal($request["size"]);
            setData($pagination as IncidentPrototype[][]);
        });
        return () => {
            $(".ctnMainPatern")["removeClass"]("Incidencias");
            $__live__();
        };
    },[]);
    return error ? (
        <div className="Annoucement">
            <ComponentIncidentEmptyView title={t("SLangAppTranslationViewPanelPageIncidentErrorTitle")} message={error}/>
        </div>
    ) : (
        <Fragment>
            {((["oxxo","codeink"] as RoleGroup)["includes"](information!["role"]!) && pathname == "/order_incident") && (
                <div className="flexie right">
                    <button className="full" disabled={typeof data == "undefined"} onClick={_ => navigator("/order_incident/create")}>
                        <i className="uil uil-plus"></i>
                        {t("SLangAppTranslationViewPanelPageIncidentButtonCreateNewIncidentLabel")}
                    </button>
                </div>
            )}
            {data ? ((data["length"] === 0 && pathname == "/order_incident") ? (
                <div className="Annoucement">
                    <ComponentIncidentEmptyView title={t("SLangAppTranslationViewPanelPageIncidentEmptyTitle")} message={t("SLangAppTranslationViewPanelPageIncidentEmptyMessage")["split"]("|")[(((["oxxo"] as RoleGroup)["includes"](information!["role"]!))) ? 0 : 1]}/>
                </div>
            ) : (
                pathname == "/order_incident" ? (
                    <Fragment>
                        <div className="unlistIncidencias">
                            {data[page - 1]["map"](({title,id,status,message,date,information,order,user,docID},iterator) => (
                                <ComponentIncidentListView key={iterator} id={docID} order={order?.["split"](",")} user={{name:information["name"]??information["email"]!,role:t(information["title"]!),photo:information!["photo"]??Domain("user/default.webp"),id:user}} createdAt={date} description={message} title={title} uniqKey={id} statusID={status}/>
                            ))}
                        </div>
                        {(data["length"] >= 2) && (
                            <ComponentIncidentListViewPagination totalIncidents={total} currentPage={page} pagedHandler={setPage}/>
                        )}
                    </Fragment>
                ) : ((["oxxo","codeink"] as RoleGroup)["includes"](information!["role"]!)) ? (
                    <Outlet context={{handlers:{setError},currentPage:page}}/>
                ) : (
                    <div className="Annoucement">
                        <ComponentIncidentEmptyView title={t("SLangAppTranslationViewPanelPageIncidentRestrictViewTitle")} message={t("SLangAppTranslationViewPanelPageIncidentRestrictViewMessage")}/>
                    </div>
                )
            )) : (
                <div className="Annoucement">
                    <Loader />
                </div>
            )}
        </Fragment>
    );
};

export default Incident;
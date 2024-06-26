/*
@author LxingA
@project OXXO
@name Help Desk
@description Vista para la Visualización de los Registros de los Pedidos en Incidencia
@date 10/12/23 16:30
*/
import {useState,useEffect,useContext} from 'react';
import {NavBar,Table,Footer,CardBox} from '../component/tool';
import {onSnapshot,collection,query,orderBy} from 'firebase/firestore';
import {Context as Service} from '../../../context/service';
import {search as SearchingHandler} from '../../../util/extra';
import type {Order} from '../type/tool';
import Loader from '../../loader';

/** Página para Mostrar el Registro de los Pedidos en Incidencia */
const Order = () => {
    const {firebase} = useContext(Service);
    const [perPage] = useState<number>(10);
    const [page,setPage] = useState<number>(1);
    const [data,setData] = useState<Order[][]>();
    const [total,setTotal] = useState<number>(0);
    const [show,setShow] = useState<boolean>(false);
    const [search,setSearch] = useState<string>();
    useEffect(() => {
        const $__onEvented__ = onSnapshot(
            query(collection(firebase!["database"],"order"),orderBy("dateAtCreate","asc")),
            $instance => {
                const $__definedContainer__: Order[] = [];
                $instance["docs"]["forEach"]($container => {
                    if(!$container["exists"]()) return;
                    else{
                        let $__definedInstanceOrder__: Order = {...($container["data"]() as Order)};
                        $__definedInstanceOrder__["id"] = $container["id"];
                        $__definedContainer__["unshift"]($__definedInstanceOrder__);
                    };
                });
                const $__definedPaginator__: Order[][] = [];
                for(let $x = 0; $x < $__definedContainer__["length"]; $x += perPage) $__definedPaginator__["push"]($__definedContainer__["slice"]($x,($x + perPage)));
                setTotal($instance["size"]);
                setData($__definedPaginator__);
            }
        );
        return () => $__onEvented__();
    },[]);
    return (
        <div className="ctnTable">
            <NavBar button searching={setSearch} box={setShow} loading={typeof data == "undefined"} disabled={typeof data == "undefined" || data["length"] == 0}/>
            {data ? (
                <Table orders={data["length"] == 0 ? [] : (search ? (SearchingHandler({item:data,seachFor:"uniqKey",keyboard:search}) as Order[]) : data[page - 1])}/>
            ) : (
                <Loader />
            )}
            <Footer searching={search} callback={setPage} orders={data} disabled={typeof data == "undefined" || data!["length"] === 0} currentPage={page} total={total} limitPerPage={perPage}/>
            {show && (
                <CardBox callback={setShow}/>
            )}
        </div>
    );
};

export default Order;
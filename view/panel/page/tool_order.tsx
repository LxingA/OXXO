/*
@author LxingA
@project OXXO
@name Help Desk
@description Vista para la Visualización de los Registros de los Pedidos en Incidencia
@date 10/12/23 16:30
*/
import {useState} from 'react';
import {NavBar,Table,Footer} from '../component/tool';
import type {Order} from '../type/tool';
import Loader from '../../loader';

/** Página para Mostrar el Registro de los Pedidos en Incidencia */
const Order = () => {
    const [perPage,setPerPage] = useState<number>(25);
    const [page,setPage] = useState<number>(1);
    const [data,setData] = useState<Order[]>();
    return (
        <div className="ctnTable">
            <NavBar loading={typeof data == "undefined"} perPage={{callback:setPerPage,current:perPage}} disabled={typeof data == "undefined" || data!["length"] === 0}/>
            {data ? (
                <Table orders={data}/>
            ) : (
                <Loader />
            )}
            <Footer disabled={typeof data == "undefined" || data!["length"] === 0}/>
        </div>
    );
};

export default Order;
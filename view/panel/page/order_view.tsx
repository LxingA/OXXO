/*
@author LxingA
@project OXXO
@name Help Desk
@description Página Predeterminada para la Consulta de los Pedidos
@date 18/11/23 15:50
*/
import {useSearchParams} from 'react-router-dom';
import {TrackInput,TrackResult} from '../component/order';

/** Página Predeterminada para la Consulta de los Pedidos */
const View = () => {
    const [query] = useSearchParams();
    return query["has"]("o") ? (
        <TrackResult />
    ) : (
        <TrackInput />
    );
};

export default View;
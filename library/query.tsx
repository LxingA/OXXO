/*
@author LxingA
@project OXXO
@name Help Desk
@description Integración de React Query como Comunicador a las API's para la Aplicación
@date 15/11/23 15:00
*/
import {QueryClient} from 'react-query';

/** Referencía a la Instancia de React Query para la Aplicación */
const Query = (new QueryClient());

export default Query;
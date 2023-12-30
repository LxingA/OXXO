/*
@author LxingA
@project OXXO
@name Help Desk
@description Integración de React Query como Comunicador a las API's para la Aplicación
@date 15/11/23 15:00
*/
import {QueryClient} from 'react-query';
import fnCustomerFetcher from '../util/fetch';

/** Referencía a la Instancia de React Query para la Aplicación */
const Query = (new QueryClient({
    defaultOptions: {
        queries: {
            queryFn: async({queryKey,signal}) => (await fnCustomerFetcher(
                (queryKey[1] as number),
                (queryKey[2] as string),
                (queryKey[3] as {}),
                signal,
                (queryKey[4] as string),
                (queryKey[5] as {})
            ))
        }
    }
}));

export default Query;
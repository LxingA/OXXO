/*
@author LxingA
@project OXXO
@name Help Desk
@description Definición del Fetch Personalizado para la Integración con Query
@date 29/12/23 08:50
*/
const endpoints = (import.meta.env.SGlobAppParamDefinedEndPointAPI)["split"](",");

/** Definición del Prototipo para la respuesta del Fetch Personalizado */
export type FetcherResponse = {
    /** Indica si fue éxitoso la Petición */
    st: boolean,
    /** Contenedor con la Respuesta de la API */
    dt?: any,
    /** Mensaje Descriptivo Respecto a Cualquier Cosa */
    ms: string
};

/**
 * Fetch Personalizado para React Query
 * @param $id ID del Punto Final a Usar
 * @param $path Ruta Relativa a Consultar en la API
 * @param $object Contenedor con la Información a Enviar en la Petición
 * @param $signal Referencía al Objeto para el Evento de Señal para el Fetch
 * @param $method Método HTTP a Aplicar en la Petición
 * @param $headers Contenedor con las Cabeceras Esenciales para la Petición
 */
const Fetcher = async($id: number, $path: string, $object?: {}, $signal?: AbortSignal, $method: string = "POST", $headers: HeadersInit = {}): Promise<FetcherResponse> => {
    let $__options__: RequestInit = {};
    $__options__["mode"] = "cors";
    $__options__["cache"] = "force-cache";
    $__options__["signal"] = $signal;
    $__options__["headers"] = $headers;
    $__options__["method"] = $method;
    if($object) $__options__["body"] = JSON["stringify"]($object);
    const $__initial__ = (await fetch(`${endpoints[$id]}${$path}`,$__options__));
    if($__initial__["ok"] || $__initial__["status"] == 200) return {
        st: true,
        ms: "Se obtuvó con éxito la información de la API",
        dt: (await $__initial__["json"]())
    };else return {
        st: false,
        ms: "Hubo un error a obtener la información de la API. Intentelo de nuevo más tarde"
    };
};

export default Fetcher;
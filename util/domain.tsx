/*
@author LxingA
@project OXXO
@name Help Desk
@description Utilidad para la Definición del Dominio CDN para la Aplicación
@date 20/11/23 17:00
*/

/**
 * Definición del Dominio para el Acceso a los Recursos CDN de la Aplicación
 * @param $path Ruta Relativa al Recurso a Obtener
 * @param $key Clave única de 12 de Longitud para Establecerlo en Cache el Recurso
 */
const Domain = ($path:string,$key?:string): string => `${import.meta.env.SGlobAppParamCDNDomain}/${$path}?v=${$key ?? "jyenzghgmdjp"}`;

export default Domain;
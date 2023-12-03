/*
@author LxingA
@project OXXO
@name Help Desk
@description Complementos para el Componente de las Incidencias de la Aplicación
@date 28/11/23 22:20
*/

/** Complemento con los Botones de Acción de la Vista Listadora de las Incidencias */
export const AddonComponentIncidentButtonsListView = () => {
    return (
        <div className="boxing actions">
            <div className="accioneslist">
                <button>
                    <i className="uil uil-trash-alt"></i>
                </button>
                <button className="streng">
                    <i className="uil uil-file-search-alt"></i>
                </button>
            </div>
        </div>
    );
};

/** Complemento con las Incidencias de  */
export const AddonComponentIncidentEvidenceListView = ({name,type,uri}:{
    /** Nombre de la Evidencia */
    name: string,
    /** Tipo de MIME de la Evidencia */
    type: string,
    /** Ruta Absoluta HTTP de la Evidencia */
    uri: string
}) => {
    return (
        <div className="ImgDiv">
            <img itemType={type} src={uri}/>
        </div>
    );
};

/** Componente para Mostrar la Información del Usuario que Creó la Incidencia */
export const AddonComponentIncidentListViewUserInfoBox = ({name,role,photo}:{
    /** Nombre Completo del Usuario de la Incidencia */
    name: string,
    /** Rango del Usuario de la Incidencia */
    role: string,
    /** Ruta Absoluta HTTP de la Foto de Perfil del Usuario de la Incidencia */
    photo: string
}) => {
    return (
        <div className="incidenciaResponsable">
            <div className="iconUser">
                <img src={photo}/>
            </div>
            <div className="userdts">
                <strong>
                    {name}
                </strong>
                <p className="Rango designWeb">
                    {role["split"]("-")[0]}
                </p>
            </div>
        </div>
    );
};
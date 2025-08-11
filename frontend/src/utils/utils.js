export function formatearFecha(fechaIso) {
   if(!fechaIso) return;
   return fechaIso.split("T")[0];   
};

export function manejoError(error) {
    if (error.isAxiosError) {
        if (error.response) {
            console.error(`error del servidos ${error.response.status}: `, error.response.data);
        } else if (error.request){
            console.error('no se recivió respuesta');
        }else{
            console.error('error de peticion', error.message);
        };
    }else{
        console.error('error inesperado', error);
    };
};
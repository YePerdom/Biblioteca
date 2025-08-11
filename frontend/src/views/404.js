export function notFound(){
    return `
        <div class="d-flex justify-content-center align-items-center vh-100 w-100">
        <div class="alert alert-warning text-center w-100 h-100 d-flex flex-column justify-content-center" role="alert">
            <h1 class="display-1">404</h1>
            <h2 class="mb-3">Página No Encontrada</h2>
            <p>Lo sentimos, la página que buscas no existe.</p>
        </div>
        </div>   
    `;
};
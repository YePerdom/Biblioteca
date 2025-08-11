export function renderLogin(){
    return `
        <div class="d-flex justify-content-center align-items-center vh-100">
        <div class="card p-4" style="width: 24rem;">
            <form>
            <label for="usuario" class="form-label">Usuario</label>
            <input type="text" name="nombre_usuario" id="usuario" class="form-control mb-3" placeholder="Nombre de usuario">

            <label for="contraseña" class="form-label">Contraseña</label>
            <input type="password" name="contraseña" id="contraseña" class="form-control mb-4" placeholder="Contraseña">

            <button type="submit" class="btn btn-primary w-100">Iniciar sesión</button>
            </form>
        </div>
        </div>
    `;
};
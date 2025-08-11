export function renderRegister(){
    return `
        <div class="d-flex justify-content-center align-items-center vh-100">
        <div class="card p-4" style="width: 24rem;">
            <h1 class="text-center mb-4">Register</h1>
            <form>
            <label for="usuario" class="form-label">Nombre</label>
            <input type="text" name="nombre_usuario" id="usuario" class="form-control mb-3" required>

            <label for="contraseña" class="form-label">Contraseña</label>
            <input type="password" name="contraseña" id="contraseña" class="form-control mb-4" required>

            <button id="register-button" type="submit" class="btn btn-primary w-100">Entrar</button>
            </form>
        </div>
        </div>
    `;
};
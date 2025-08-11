export function renderRegister(){
    return `
        <h1>Register</h1>
        <form>
            <label for="nombre_usuario">Nombre</label>
            <input type="text" name="nombre_usuario" id="usuario" required>
            <label for="contraseña">Contraseña</label>
            <input type="password" name="contraseña" id="contraseña" required>
            <button id="register-button">Entrar</button>
        </form>
    `;
};
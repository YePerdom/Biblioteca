export function renderLogin(){
    return `
        <form>
            <label for="nombre_usuario"></label>
            <input type="text" name="nombre_usuario" id="usuario">
            <label for="contraseña"></label>
            <input type="text" name="contraseña" id="contraseña">
            <button type="submit">iniciar seccion</button>
        </form>
    `;
};
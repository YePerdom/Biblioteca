import { formatearFecha } from "../utils/utils.js";

export function renderPrestamos(prestamos) {
  const tbody = document.querySelector("#prestamos-table tbody");
  tbody.innerHTML = "";

  prestamos.forEach(prestamo => {
    const fila = document.createElement("tr");
    fila.innerHTML = `
        <td>${prestamo.id_prestamo}</td>
        <td>${prestamo.nombre_usuario}</td>
        <td>${prestamo.identificacion_usuario}</td>
        <td>${prestamo.titulo}</td>
        <td>${formatearFecha(prestamo.fecha_prestamo)}</td>
        <td>${formatearFecha(prestamo.fecha_devolucion)}</td>
        <td>${prestamo.estado}</td>
        <td>
        <div class="btn-group-vertical w-100" role="group" aria-label="Acciones">
        <button class="btn btn-warning btn-sm mb-2 editar" data-id=${prestamo.id_prestamo}>Editar</button>
        <button class="btn btn-sm btn-danger mb-2 eliminar" data-id=${prestamo.id_prestamo}>Eliminar</button>
        </div>
        </td>
        `;
    tbody.appendChild(fila);
  });
};

export function renderTableEditable(prestamos) {
  const tbody = document.querySelector("#prestamos-table tbody");
  tbody.innerHTML = "";

  prestamos.forEach(prestamo => {
    const fila = document.createElement("tr");
    fila.setAttribute("data-id", prestamo.is_prestamo);
    fila.innerHTML = `
            <td>${prestamo.id_prestamo}</td>
            <td>${prestamo.nombre_usuario}</td>
            <td>${prestamo.identificacion_usuario}</td>
            <td contenteditable="true">${prestamo.titulo}</td>
            <td>${formatearFecha(prestamo.fecha_prestamo)}</td>
            <td>
                <input type="date" name="fecha_prestamo" value="${formatearFecha(prestamo.fecha_devolucion)}">
            </td>
            <td>
                <select class="estado-select" name="estado">
                    <option value="activo" ${prestamo.estado === "activo" ? "selected" : ""}>activo</option>
                    <option value="entregado" ${prestamo.estado === "entregado" ? "selected" : ""}>entregado</option>
                    <option value="retrasado" ${prestamo.estado === "retrasado" ? "selected" : ""}>retrasado</option>
                </select>
            </td>
            <td>
              <div class="btn-group-vertical w-100" role="group" aria-label="Acciones">
                <button class="btn btn-sm btn-success mb-2 guardar" data-id=${prestamo.id_prestamo}>Guardar</button>
                <button class="btn btn-sm btn-secondary mb-2 cancelar" data-id=${prestamo.id_prestamo}>Cancelar</button>
              </div>
            </td>
        `;
    tbody.appendChild(fila);
  });
};

export function renderTable() {
  return `
        <table id="prestamos-table" class="table table-striped-columns table-hover">
          <thead class="table-dark">
            <tr>
              <th>ID</th>
              <th>USUARIO</th>
              <th>IDENTIFICACIÓN</th>
              <th>TITULO</th>
              <th>FECHA DE PRÉSTAMO</th>
              <th>FECHA DE DEVOLUCIÓN</th>
              <th>ESTADO</th>
              <th></th>
            </tr>
          </thead>
          <tbody></tbody>
        </table>
    `;
};

export function renderForm() {
  return `
        <div class="d-flex justify-content-center align-items-center">
          <form id="prestamos-form" class="row gy-2 gx-3 align-items-center mb-4">
            <div class="col-auto">
              <input class="form-control" type="text" name="nombre_usuario" id="usuario" placeholder="USUARIO">
            </div>
            <div class="col-auto">
              <input class="form-control" type="text" name="titulo" id="libro" placeholder="LIBRO">
            </div>
            <div class="col-auto">
              <label for="fecha_prestamo" class="col-auto">FECHA DE PRÉSTAMO: </label>
              <input class="form-control" type="date" name="fecha_prestamo" id="fecha_prestamo">
            </div>
            <div class="col-auto">
              <label for="fecha_devolucion" class="col-auto">FECHA DE DEVOLUCIÓN: </label>
              <input class="form-control" type="date" name="fecha_devolucion" id="fecha_devolucion">
            </div>
              <div class="col-auto">
              <label for="estado" class="col-auto">ESTADO: </label>
              <select id="estado" name="estado" class="form-select">
                <option value="" disabled selected>--estado--</option>
                <option value="activo">activo</option>
                <option value="entregado">entregado</option>
                <option value="retrasado">retrasado</option>
              </select>
            </div>
            <div class="col-auto">
              <button type="submit" class="btn btn-primary">CREAR PRÉSTAMO</button>
            </div>
          </form>
        </div>

        <div class="d-flex justify-content-center align-items-center">
          <form id="buscador-form" class="row gy-2 gx-3 align-items-center mb-4">
            <div class="col-auto">
              <input class="form-control" type="number" name="buscado" id="buscado" placeholder="BUSCAR">
            </div>
            <div class="col-auto">
              <button class="btn btn-outline-success" type="submit">BUSCAR</button>
            </div>
          </form>
        </div>
    `;
};
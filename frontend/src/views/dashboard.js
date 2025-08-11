import { renderForm, renderTable } from "../components/render.component.js";

export function renderDasboard() {
    return `
        <div class="text-center">
            <h1 class="display-1">GESTOR DE PRESTAMOS</h1>
        </div>
        <div class="border border-light">
            ${renderForm()}
        </div>
        ${renderTable()}
    `;
};
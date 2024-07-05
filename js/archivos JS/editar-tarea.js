import {
  validarSesion,
  obtenerValorInput,
  imprimir,
} from "../utils/helpers.js";
import { RequestsAPI } from "../RequestsAPI.js";

validarSesion();

const params = new URLSearchParams(window.location.search);
const idTarea = params.get("id");

const mostrarError = (error) => {
  imprimir("editar-tarea-error", error);
};

const popularCampos = (data) => {
  document.querySelector("#editar-nombre").value = data.nombre;
  document.querySelector("#editar-tipo").value = data.tipo;
/*   document.querySelector("#editar-icono").value = data.icono; */
};

RequestsAPI.getTarea(idTarea)
  .then(popularCampos)
  .catch((error) => {
    mostrarError(error);
  });

document
  .querySelector("#boton-actualizar-tarea")
  .addEventListener("click", () => {
    const nombre = obtenerValorInput("editar-nombre");
    const tipo = obtenerValorInput("editar-tipo");
/*     const icono = obtenerValorInput("editar-icono"); */

    if (!nombre || !tipo /* || !icono */) {
      imprimir("editar-icono-error", "Por favor complete todos los campos");
      return;
    }

    RequestsAPI.putTarea(idTarea, nombre, tipo, /* icono */)
      .then(() => {
        document.location.replace(`detalle-tarea.html?id=${idTarea}`);
      })
      .catch((error) => {
        imprimir("editar-tarea-error", error);
      });
  });

import {
  imprimir,
  obtenerValorInput,
  validarSesion,
} from "../utils/helpers.js";
import { RequestsAPI } from "../RequestsAPI.js";

validarSesion();

document.querySelector("#boton-nueva-tarea").addEventListener("click", () => {
  const nombre = obtenerValorInput("nuevo-nombre");
  const tipo = obtenerValorInput("nuevo-tipo");
  /*   const icono = obtenerValorInput("nuevo-icono"); */
  const icono = "";

  if (!nombre || !tipo /* || !icono */) {
    imprimir("nueva-tarea-error", "Por favor, complete todos los campos.");
    return;
  } else {
    console.log("Tarea creada con éxito");
  }

  const body = JSON.stringify({ nombre, tipo, icono });

  RequestsAPI.postTarea(body)
    .then(() => {
      document.location.replace("index.html");
    })
    .catch((error) => {
      imprimir("nueva-tarea-error", error);
    });
});

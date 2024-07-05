import Tarea from "../Models/Tarea.js";
import {
  imprimir,
  obtenerValorInput,
  validarSesion,
  eventoClickCerrarSesion,
} from "../utils/helpers.js";
import { RequestsAPI } from "../RequestsAPI.js";

validarSesion();
eventoClickCerrarSesion();

const cargarTareas = (data) => {
  const listadoTareasInicial = `<div class="item-tarea"><a href="nueva-tarea.html">+</a></div>`;
  imprimir("listado", `${listadoTareasInicial}`);
  
  console.log("Datos recibidos:", data);
  imprimir("lista-error", "");

  const listadoTareas = data
    .map((tarea) =>
      new Tarea(
        tarea.id,
        tarea.nombre,
        tarea.tipo,
        tarea.icono,
        console.log("tarea", tarea.tipo),
        console.log("icono", tarea.icono)
      ).mostrarTareasEnIndex()
    )
    .join("");

  imprimir("listado", `${listadoTareas}`);

  document.querySelectorAll(".item-tarea").forEach((itemListado) => {
    itemListado.addEventListener("click", () => {
      document.location.replace(`detalle-tarea.html?id=${itemListado.id}`);
    });
  });
};

const mostrarError = (error) => {
  imprimir("lista-error", error);
};

document.querySelector("#input-filtro-nombre").addEventListener("input", () => {
  const filtroNombre = obtenerValorInput("input-filtro-nombre");

  RequestsAPI.getTareas({ filtroNombre })
    .then(cargarTareas)
    .catch(mostrarError);
});

document.querySelector("#input-filtro-tipo").addEventListener("change", () => {
  const filtroTipo = obtenerValorInput("input-filtro-tipo");

  RequestsAPI.getTareas({ filtroTipo }).then(cargarTareas).catch(mostrarError);
});

/* document.querySelector("#boton-filtro").addEventListener("click", () => {
  const filtroNombre = obtenerValorInput("input-filtro-nombre");
  const filtroTipo = obtenerValorInput("input-filtro-tipo");

  RequestsAPI.getTareas({ filtroNombre, filtroTipo })
    .then(cargarTareas)
    .catch(mostrarError);
}); */

RequestsAPI.getTareas().then(cargarTareas).catch(mostrarError);

RequestsAPI.getUsuario()
  .then((usuario) => {
    const { nombre, apellido } = usuario;
    const usuarioLogueado = document.querySelector("#usuario-logueado");
    if (usuarioLogueado && nombre && apellido) {
      usuarioLogueado.textContent = `${nombre} ${apellido}`;
    }
  })
  .catch((error) => {
    console.error("Error al obtener la información del usuario:", error);
  });

import { RequestsAPI } from "../RequestsAPI.js";

// function para obtener el valor de un input. Recibe el id del input y retorna el valor del input.
export const obtenerValorInput = (idInput) => {
  const inputElement = document.getElementById(idInput);
  if (inputElement) {
    return inputElement.value;
  } else {
    console.error(`No se encontró ningún elemento con el ID: ${idInput}`);
  }
};

// function para imprimir contenido en un elemento del DOM. Recibe el id del elemento y el contenido a imprimir.
export const imprimir = (elemento, contenido) => {
  const ele = document.querySelector(`#${elemento}`);
  if (ele) {
    ele.innerHTML = contenido;
  } else {
    console.error(`No se encontró ningún elemento con el ID: ${elemento}`);
  }
};

// funcion para validar sesion de usuario
export const validarSesion = () => {
  // obtenemos el valor de la sesion del sessionStorage
  const usuarioLogueado = sessionStorage.getItem("session");
  // verificamos si estamos en la pagina de login o register
  const estaEnLogin = document.location.pathname.includes("login.html");
  const estaEnRegister = document.location.pathname.includes("register.html");
  const estaEnPaginaPublica = estaEnLogin || estaEnRegister;

  // si el usuario esta logueado y esta en una pagina publica, lo redirigimos al index
  if (usuarioLogueado) {
    if (estaEnPaginaPublica) {
      document.location.replace("index.html");
    }
  } else {
    // si no estas logueado,y esta en una pagina restringida, redirigimos al login
    if (!estaEnPaginaPublica) {
      document.location.replace("login.html");
    }
  }
};

// function para agregar evento click al boton de cerrar sesion
export const eventoClickCerrarSesion = () => {
  document.querySelector("#boton-logout").addEventListener("click", () => {
    sessionStorage.removeItem("session");
    RequestsAPI.logout().then(() => {
      document.location.replace("login.html");
    });
  });
};

import {
  validarSesion,
  obtenerValorInput,
  imprimir,
} from "../utils/helpers.js";
import { RequestsAPI } from "../RequestsAPI.js";

validarSesion();

document
  .querySelector("#boton-register-submit")
  .addEventListener("click", () => {
    const nombre = obtenerValorInput("form-register-nombre");
    console.log("nombre", nombre);
    const apellido = obtenerValorInput("form-register-apellido");
    console.log("apellido", apellido);
    const user = obtenerValorInput("form-register-user");
    console.log("user", user);
    const password = obtenerValorInput("form-register-password");
    console.log("password", password);

    if (!nombre || !apellido || !user || !password) {
      imprimir("form-register-error", "Por favor, complete todos los campos.");
      return;
    }

    const body = JSON.stringify({ nombre, apellido, user, password });

    RequestsAPI.register(body)
      .then(() => {
        document.location.replace("login.html");
      })
      .catch((error) => {
        imprimir("form-register-error", error);
      });
  });

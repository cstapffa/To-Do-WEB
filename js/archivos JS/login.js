import {
  obtenerValorInput,
  imprimir,
  validarSesion,
} from "../utils/helpers.js";
import { RequestsAPI } from "../RequestsAPI.js";

validarSesion();

const botonLogin = document.querySelector("#form-login-submit");

botonLogin.addEventListener("click", () => {
  const user = obtenerValorInput("form-login-user");
  const password = obtenerValorInput("form-login-password");

  RequestsAPI.login(user, password)
    .then((data) => {
      sessionStorage.setItem("session", data.session);
      sessionStorage.setItem("user", JSON.stringify(data.user));

      document.location.replace("index.html");
    })
    .catch((error) => {
      console.error(error);
      imprimir("form-login-error", "Usuario o contraseña incorrectos");
    });
});

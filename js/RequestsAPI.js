// obtener url es una función que recibe una ruta y retorna la url completa de la ruta que se le pase.
const obtenerUrl = (ruta) => `${RequestsAPI.urlBaseBackend}/${ruta}`;

// headers es un objeto que contiene las cabeceras que se enviarán en las peticiones fetch.
const headers = {
  Accept: "application/json",
  "Content-Type": "application/json",
};

// token es una constante que contiene el token de la sesión que se obtiene del sessionStorage.
const token = sessionStorage.getItem("session");

// Si token existe, se añade al objeto headers la cabecera authorization con el valor del token.
if (token) {
  headers.authorization = token;
}

// procesarRespuesta es una función que recibe una respuesta y retorna la respuesta en formato json. Si la respuesta contiene un error, se lanza una excepción con el mensaje de error.
const procesarRespuesta = (res) => {
  return res.json().then((data) => {
    if (data.error) {
      throw new Error(data?.error);
    }

    return data;
  });
};

// manejarErrores es una función que recibe un error y muestra un mensaje de error en la consola. Luego, lanza una excepción con el mensaje de error.
const manejarErrores = (error = new Error("Error desconocido")) => {
  console.error("Ha ocurrido un error:", error.message);
  throw error.message;
};

// RequestsAPI es una clase que contiene las funciones que se encargan de realizar las peticiones fetch al backend de manera ordenada y centralizada.
export class RequestsAPI {
  static urlBaseBackend = "http://localhost:8080";

  // post /login
  static login(user, password) {
    const body = JSON.stringify({ user, password });

    return fetch(obtenerUrl("login"), { method: "POST", body, headers })
      .then(procesarRespuesta)
      .catch(manejarErrores);
  }

  // post /logout
  static logout() {
    return fetch(obtenerUrl("logout"), { method: "POST", headers })
      .then(procesarRespuesta)
      .catch(manejarErrores);
  }

  // post /registrar
  static register(body) {
    return fetch(obtenerUrl("registrar"), { method: "POST", body, headers })
      .then(procesarRespuesta)
      .catch(manejarErrores);
  }

  // get /usuarios 
  static getUsuario() {
    return fetch(obtenerUrl("usuario"), { headers })
      .then(procesarRespuesta)
      .catch(manejarErrores);
  }
  
  // get /tareas
  static getTareas(opciones = {}) {
    const queryParams = new URLSearchParams({});

    if (opciones.filtroNombre) {
      queryParams.set("nombre", opciones.filtroNombre);
    }

    if (opciones.filtroTipo) {
      queryParams.set("tipo", opciones.filtroTipo);
    }

    return fetch(obtenerUrl("tareas?" + queryParams), { headers })
      .then(procesarRespuesta)
      .catch(manejarErrores);
  }

  // get /mascota/:idMascota
  static getTarea(idTarea) {
    return fetch(obtenerUrl(`tarea/${idTarea}`), { headers })
      .then(procesarRespuesta)
      .catch(manejarErrores);
  }

  static getTareasByType(tipoTarea) {
    return fetch(obtenerUrl(`tareas/${tipoTarea}`), { headers })
      .then(procesarRespuesta)
      .catch(manejarErrores);
  }

  // post /mascota
  static postTarea(body) {
    return fetch(obtenerUrl("tarea"), { method: "POST", headers, body })
      .then(procesarRespuesta)
      .catch(manejarErrores);
  }

  // put /mascota/:idMascota
  static putTarea(idTarea, nombre, tipo, icono) {
    // en este caso, recibo los datos (nombre, tipo y raza) como parametros y los convierto en un objeto body. Tambien podemos recibir un objeto body como parametro como en el caso de postMascota.
    const body = JSON.stringify({ nombre, tipo, icono });
    return fetch(obtenerUrl(`tarea/${idTarea}`), {
      method: "PUT",
      headers,
      body,
    })
      .then(procesarRespuesta)
      .catch(manejarErrores);
  }

  // delete /mascota/:idMascota
  static deleteTarea(idTarea) {
    return fetch(obtenerUrl(`tarea/${idTarea}`), {
      method: "DELETE",
      headers,
    })
      .then(procesarRespuesta)
      .catch(manejarErrores);
  }
}

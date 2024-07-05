export default class Tarea {
  id;
  nombre;
  tipo;
  icono;

  constructor(id = 0, nombre = "", tipo = "", icono = "") {
    this.id = id;
    this.nombre = nombre;
    this.tipo = tipo;
    this.icono = icono;
  }

  mostrarTareasEnIndex() {
    this.elegirIcono();
    return `
      <article id="${this.id}" class="item-tarea">
        <img src="${this.icono}" alt="${this.tipo}" title="${this.nombre}"/>
        <h3>${this.nombre}</h3>
      </article>
    `;
  }

  mostrarTareasPorTipo() {
    return `
      <article id="${this.tipo}">
        <img src="${this.icono}" alt="${this.tipo}" title="${this.nombre}"/>
        <h3>${this.nombre}</h3>
      </article>
    `;
  }

  mostrarDetalle() {
    return `
      <article id="${this.tipo}">
        <img src="${this.icono}" alt="${this.tipo}" title="${this.nombre}"/>
        <h3>${this.nombre}</h3>
      </article>
    `;
  }

  elegirIcono() {
    if (this.tipo === "fitness") {
      this.icono =
        "https://i.pinimg.com/736x/8f/17/2d/8f172d1be4d9dca237445841aed409d8.jpg";
    } else if (this.tipo === "educacion") {
      this.icono =
        "https://i.pinimg.com/736x/00/81/38/00813811aed891b481e9565f5d123960.jpg";
    } else if (this.tipo === "hogar") {
      this.icono =
        "https://i.pinimg.com/736x/35/4b/fc/354bfc96064702ec0010a0557f446b0a.jpg";
    } else if (this.tipo === "limpieza") {
      this.icono =
        "https://i.pinimg.com/736x/02/8f/44/028f4401135ccba5b9dc48618efeef95.jpg";
    } else if (this.tipo === "cuidado") {
      this.icono =
        "https://i.pinimg.com/736x/80/81/c0/8081c0bd44c588ebb3bb6e78f770b6bf.jpg";
    } else {
      this.icono =
        "https://i.pinimg.com/736x/11/cc/c7/11ccc734b716a203632be75a0a55331a.jpg";
    }
  }
}

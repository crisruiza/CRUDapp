console.log("hola sabina");
// ! Declaración de variables
let articulos = localStorage.getItem("articulo")
  ? JSON.parse(localStorage.getItem("articulo"))
  : [];
let articulo_previo = "";
let editando = false;
const articuloInput = document.getElementById("articuloInput");
const btnArticulo = document.getElementById("btnArticulo");
const lista = document.getElementById("lista");
const listaVacia = document.getElementById("listaVacia");

// ! Funciones
function agregarArticulo() {
  if (articuloInput.value) {
    if (editando) {
      // Itero el array nombres. Si el elemento del array es igual a articulo_previo (seteado en la función editar), entonces no hace nada, sino usa el lo que se acaba de escribir
      articulos = articulos.map((articuloIndividual) =>
        articuloIndividual === articulo_previo
          ? articuloInput.value
          : articuloIndividual
      );
      localStorage.setItem("articulos", JSON.stringify(articulos));
      // Reinicio el input
      articuloInput.value = "";
      btnArticulo.textContent = "✅ Agregar artículo";
      btnArticulo.classList.remove("btn-warning");
      btnArticulo.classList.add("btn-primary");
      // Vuelvo a la función lista para volver a iterar todos los elementos
      actualizarLista();
      // Termino la edición
      editando = false;
    } else {
      const articulo = articuloInput.value; // Creación de una variable con el valor del input del articulo
      articulos.push(articulo); // insertar artículo en array articulos
      localStorage.setItem("articulos", JSON.stringify(articulos));
      articuloInput.value = ""; // restablecer el input
      // console.log(articulos); // * referencia
      actualizarLista(); // Función para enseñar la lista
    }
  } else {
    alert(
      "No has ingresado ningún artículo. Porfavor ingreso uno para continuar."
    );
  }
}

function actualizarLista() {
  // Desaparecer el aviso de lista vacía
  listaVacia.classList.add("hidden");
  // Borra toda la lista que ya llevabamos y la vuelve a calcular. Esto es para que los valores no se repitan
  lista.innerHTML = "";
  articulos.forEach((articulo) => {
    // creación de li
    const li = document.createElement("li");
    // Establece la const articulo como el contenido del li que acabamos de crear
    li.textContent = articulo;
    // añade la clase de bootsrap para lista y margen
    li.classList.add("list-group-item");

    // Agrega a la lista (ul) el artículo
    lista.appendChild(li);
    // -------Botón de eliminar-------
    const btnEliminar = document.createElement("btnEliminar");
    //crea el contenedor del icono
    const iconoBasura = document.createElement("i");
    // añade clases de font-awesome
    iconoBasura.classList.add("fa-solid", "fa-trash");
    // Agrega el contenedor i al botón eliminar
    btnEliminar.appendChild(iconoBasura);
    // Agrega las clases de bootstrap
    btnEliminar.classList.add("btn", "btn-danger", "float-right");
    // Agrega el botón al elemento li
    li.appendChild(btnEliminar);
    // Funcionalidad del botón
    btnEliminar.addEventListener("click", () => eliminar(articulo));
    // -------Botón de editar-------
    const btnEditar = document.createElement("btnEditar");
    //crea el contenedor del icono
    const iconoEditar = document.createElement("i");
    // añade clases de font-awesome
    iconoEditar.classList.add("fa-solid", "fa-pen-to-square");
    // Agrega el contenedor i al botón eliminar
    btnEditar.appendChild(iconoEditar);
    // Agrega las clases de bootstrap
    btnEditar.classList.add("btn", "btn-warning", "float-right", "mr-2");
    // Agrega el botón al elemento li
    li.appendChild(btnEditar);
    // Funcionalidad del botón
    btnEditar.addEventListener("click", () => editar(articulo));
    // Agregar botón editar
    li.appendChild(btnEditar);
    // Agregar elemento con edición
    lista.appendChild(li);
  });
}

function eliminar(articulo) {
  // Busca el articulo que queremos eliminar
  articulos = articulos.filter((a) => a !== articulo);
  console.log(articulos.length);
  localStorage.setItem("articulos", JSON.stringify(articulos));
  actualizarLista();
  if (articulos.length === 0) {
    listaVacia.classList.remove("hidden");
  }
  btnArticulo.textContent = "✅ Agregar artículo";
  btnArticulo.classList.remove("btn-warning");
  btnArticulo.classList.add("btn-primary");
}

function editar(articulo) {
  // cambia la variable a true
  editando = true;
  // le da el valor del arta art previo
  articulo_previo = articulo;
  // pone el art en el input para modificarlo
  articuloInput.value = articulo;
  // Cambio en el texto del botón y sus estilos
  btnArticulo.textContent = "✍🏻 Editar";
  btnArticulo.classList.remove("btn-primary");
  btnArticulo.classList.add("btn-warning");
}

function limpiarStorage() {
  localStorage.clear();
  articulos = [];
  actualizarLista();
  listaVacia.classList.remove("hidden");
}

// ! Keypress

articuloInput.addEventListener("keypress", function (event) {
  // Verifica que la tecla que se apretó fue Enter
  if (event.key === "Enter") {
    // Si eso es verdad se ejecuta la función de agregar artículo
    agregarArticulo();
  }
});

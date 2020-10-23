// variables
const carrito = document.querySelector("#carrito");
const contenidoCarrito = document.querySelector("#lista-carrito tbody");
const vaciarCarritoBtn = document.querySelector("#vaciar-carrito");
const listaCursos = document.querySelector("#lista-cursos");
let articulosCarrito = [];

cargarEventListeners();
function cargarEventListeners() {
    // cuando agregas un curso presionando "ägregar al carrito"
    listaCursos.addEventListener("click", agregarCurso);

    // elimina cursos del carrito
}

//Funciones
function agregarCurso(e){
    e.preventDefault();

    if(e.target.classList.contains("agregar-carrito")){
        const cursoSeleccionado = e.target.parentElement.parentElement;  //  de esta manera accedemos a todo el card que hay detras del boton
        leerDatosCurso(cursoSeleccionado);
    }
}

function leerDatosCurso(curso){


    // objeto con el contenido del curso actual
    const infoCurso = {
        imagen: curso.querySelector("img").src,
        titulo: curso.querySelector("h4").textContent,
        precio: curso.querySelector(".precio span").textContent,
        id: curso.querySelector("a").getAttribute("data-id"),
        cantidad: 1
    }

    // revisa si un elemento ya existe en el carrito
    const existe = articulosCarrito.some( curso => curso.id === infoCurso.id);
    if(existe){
        const cursos =articulosCarrito.map( curso => {
            if(curso.id === infoCurso.id){
                curso.cantidad++;
                return curso;
            } else {
                return curso;
            }
        });
        articulosCarrito = [...cursos];
    } else {
         // agrego elementos al array del carrito
        articulosCarrito = [...articulosCarrito, infoCurso];
    }

   
    
    carritoHTML();
}

// mostrar las compras en el carrito HTML
function carritoHTML() {

    // limpiando el html
    limpiarHTML();

    articulosCarrito.forEach((curso) =>{
        const {imagen, titulo, precio, cantidad, id} = curso;
        const row = document.createElement("tr");
        row.innerHTML = `
            <td>
                <img src="${imagen}" width ="150">
            </td>
            <td>${titulo}</td>
            <td>${precio}</td>
            <td>${cantidad}</td>
            <td>
                <a href="#" class="borrar-curso" data-id"${id}"> x </a>
            </td>
        `
        // agregando el contenido del carrito en el tbody
        contenidoCarrito.appendChild(row);
    })
}

// elimina los cursos del tbody
function limpiarHTML() {
    while(contenidoCarrito.firstChild){
        contenidoCarrito.removeChild(contenidoCarrito.firstChild)
    }
}
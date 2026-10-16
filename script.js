const botonReserva = document.querySelector("#boton-reserva");

const mensajeReserva = document.querySelector("#mensaje-reserva");

botonReserva.addEventListener("click", function() {
    mensajeReserva.hidden = !mensajeReserva.hidden;
    botonReserva.setAttribute("aria-expanded", String(!mensajeReserva.hidden));

    if (!mensajeReserva.hidden) {
        mensajeReserva.scrollIntoView({
            behavior: "smooth",
            block: "start"
        });
    }
});

const formulario = document.querySelector("#formulario-reserva");
const resultado = document.querySelector("#resultado-reserva");


formulario.addEventListener("submit", function(evento) {
    evento.preventDefault();

    const nombre = document.querySelector("#nombre").value.trim();
    const fecha = document.querySelector("#fecha").value;
    const personas = Number(document.querySelector("#personas").value);
    const hora = document.querySelector("#hora").value;
    const hoy = new Date();
    const fechaActual = [
        hoy.getFullYear(),
        String(hoy.getMonth() + 1).padStart(2, "0"),
        String(hoy.getDate()).padStart(2, "0")
    ].join("-");
    if (fecha < fechaActual) {
        resultado.textContent = "No puedes seleccionar una fecha pasada.";
        return;
    }

    if (personas < 1 || personas > 12) {
        resultado.textContent = "Las reservas deben ser de 1 a 12 personas.";
        return;
    }
    resultado.textContent =
    `Consulta de demostración para ${nombre}: ` +
    `${personas} persona(s), el ${fecha} a las ${hora}. ` +
    `Esta consulta no se ha enviado al restaurante ni confirma una reserva.`});
    const horarios = [
    "13:00",
    "13:30",
    "14:00",
    "14:30",
    "20:00",
    "20:30",
    "21:00",
    "21:30",
    "22:00",
];

const selectorHora = document.querySelector("#hora");

horarios.forEach(function(hora) {
    const opcion = document.createElement("option");

    opcion.value = hora;
    opcion.textContent = hora;

    selectorHora.appendChild(opcion);
});



const listaPlatos = document.querySelector("#lista-platos");

let categoriaActual = "Todos";

function mostrarPlatos(categoria) {

categoriaActual = categoria;

    listaPlatos.innerHTML = "";

const textoBusqueda = document.querySelector("#buscar-plato").value.toLowerCase().trim();

const platosFiltrados = carta.filter(function(plato) {
    const coincideCategoria = categoria === "Todos" || plato.categoria === categoria;

    const coincideBusqueda = plato.nombre.toLowerCase().includes(textoBusqueda);

    return textoBusqueda ? coincideBusqueda : coincideCategoria;
});

if (platosFiltrados.length === 0) {
    listaPlatos.innerHTML = `
        <p class="sin-resultados">
            🔎 No encontramos platos con esa búsqueda.
            Prueba con otro nombre.
        </p>
    `;
    return;
}

    platosFiltrados.forEach(function(plato) {
        const tarjeta = document.createElement("article");

        tarjeta.classList.add("plato");

        tarjeta.innerHTML = `
            <img src="${plato.imagen}" alt="${plato.nombre}" loading="lazy" decoding="async" width="400" height="220">
            <h3>${plato.nombre}</h3>
            <p>${plato.descripcion}</p>
            
<span>${plato.precio.toLocaleString("es-ES", {
    style: "currency",
    currency: "EUR"
})}</span>

        `;

        listaPlatos.appendChild(tarjeta);
    });
}

mostrarPlatos("Todos");

const botonesFiltro = document.querySelectorAll(".filtros-carta button");
botonesFiltro[0].classList.add("activo");
botonesFiltro[0].setAttribute("aria-pressed", "true");

botonesFiltro.forEach(function(boton) {
    boton.addEventListener("click", function() {
        const categoriaElegida = boton.dataset.categoria;

        mostrarPlatos(categoriaElegida);

        botonesFiltro.forEach(function(otroBoton) {
            otroBoton.classList.remove("activo");
            otroBoton.setAttribute("aria-pressed", "false");
        });

        boton.classList.add("activo");
        boton.setAttribute("aria-pressed", "true");
    });
});

const buscadorPlatos = document.querySelector("#buscar-plato");

buscadorPlatos.addEventListener("input", function() {
    mostrarPlatos(categoriaActual);
});


const routinesContainer = document.getElementById(
    "routinesContainer"
);


const rutinas = [

    {
        id: 1,

        nombre: "Glúteos y piernas",

        categoria: "gluteos",

        categoriaNombre: "GLÚTEOS",

        imagen: "/assets/gluteos.png",

        descripcion:
            "Rutina enfocada en fortalecer y desarrollar glúteos y piernas.",

        nivel: "Intermedio",

        duracion: "45 min",

        ejercicios: [

            {
                nombre: "Hip Thrust",

                detalle: "4 series x 12 repeticiones"
            },

            {
                nombre: "Sentadilla Sumo",

                detalle: "4 series x 10 repeticiones"
            },

            {
                nombre: "Abducción",

                detalle: "3 series x 15 repeticiones"
            },

            {
                nombre: "Peso muerto rumano",

                detalle: "3 series x 12 repeticiones"
            }

        ]
    },


    {
        id: 2,

        nombre: "Piernas completas",

        categoria: "piernas",

        categoriaNombre: "PIERNAS",

        imagen: "/assets/piernas.png",

        descripcion:
            "Entrenamiento para trabajar los principales músculos del tren inferior.",

        nivel: "Intermedio",

        duracion: "50 min",

        ejercicios: [

            {
                nombre: "Prensa",

                detalle: "4 series x 12 repeticiones"
            },

            {
                nombre: "Hack Squat",

                detalle: "4 series x 10 repeticiones"
            },

            {
                nombre: "Femoral",

                detalle: "3 series x 12 repeticiones"
            },

            {
                nombre: "Extensión de piernas",

                detalle: "3 series x 15 repeticiones"
            }

        ]
    },


    {
        id: 3,

        nombre: "Tren superior",

        categoria: "superior",

        categoriaNombre: "TREN SUPERIOR",

        imagen: "/assets/trenSuperior.png",

        descripcion:
            "Rutina para trabajar pecho, espalda, hombros y brazos.",

        nivel: "Principiante",

        duracion: "40 min",

        ejercicios: [

            {
                nombre: "Press de pecho",

                detalle: "3 series x 12 repeticiones"
            },

            {
                nombre: "Remo",

                detalle: "3 series x 12 repeticiones"
            },

            {
                nombre: "Press de hombros",

                detalle: "3 series x 10 repeticiones"
            },

            {
                nombre: "Curl de bíceps",

                detalle: "3 series x 12 repeticiones"
            }

        ]
    },


    {
        id: 4,

        nombre: "Abdomen",

        categoria: "abdomen",

        categoriaNombre: "ABDOMEN",

        imagen: "/assets/abdomen.png",

        descripcion:
            "Rutina para fortalecer el abdomen y mejorar la estabilidad.",

        nivel: "Principiante",

        duracion: "25 min",

        ejercicios: [

            {
                nombre: "Crunch abdominal",

                detalle: "3 series x 15 repeticiones"
            },

            {
                nombre: "Elevación de piernas",

                detalle: "3 series x 12 repeticiones"
            },

            {
                nombre: "Plancha",

                detalle: "3 series x 30 segundos"
            }

        ]
    }

];



function mostrarRutinas(lista) {

    routinesContainer.innerHTML = "";


    if (lista.length === 0) {

        routinesContainer.innerHTML = `
            <p class="empty-message">
                No se encontraron rutinas.
            </p>
        `;

        return;
    }


    lista.forEach(function (rutina) {

        const card = document.createElement("article");

        card.classList.add("routine-card");


        card.innerHTML = `

            <div class="routine-image">

                <div
                    style="
                        height: 100%;
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        color: #DFFF2E;
                        font-size: 40px;
                    "
                >
                    <img 
                    src="${rutina.imagen}">
                </div>

            </div>


            <div class="routine-content">

                <span class="routine-category">
                    ${rutina.categoriaNombre}
                </span>


                <h2>
                    ${rutina.nombre}
                </h2>


                <p class="routine-description">
                    ${rutina.descripcion}
                </p>


                <div class="routine-details">

                    <span>
                        ${rutina.nivel}
                    </span>

                    <span>
                        ${rutina.duracion}
                    </span>

                    <span>
                        ${rutina.ejercicios.length} ejercicios
                    </span>

                </div>


                <button
                    type="button"
                    class="routine-button"
                    data-id="${rutina.id}"
                >
                    VER EJERCICIOS
                </button>

            </div>

        `;


        routinesContainer.appendChild(card);

    });


    agregarEventosRutinas();
}


function agregarEventosRutinas() {

    const buttons = document.querySelectorAll(
        ".routine-button"
    );


    buttons.forEach(function (button) {

        button.addEventListener("click", function () {

            const id = Number(
                button.dataset.id
            );


            const rutina = rutinas.find(
                function (item) {
                    return item.id === id;
                }
            );


            mostrarEjercicios(rutina);

        });

    });
}



function mostrarEjercicios(rutina) {

    const modal = document.createElement("div");

    modal.classList.add(
        "exercise-modal",
        "show"
    );


    let ejerciciosHTML = "";


    rutina.ejercicios.forEach(
        function (ejercicio, index) {

            ejerciciosHTML += `

                <div class="exercise-item">

                    <div class="exercise-info">

                        <h3>
                            ${index + 1}.
                            ${ejercicio.nombre}
                        </h3>

                        <p>
                            ${ejercicio.detalle}
                        </p>

                    </div>


                    <input
                        type="checkbox"
                        class="exercise-check"
                    >

                </div>

            `;

        }
    );


    modal.innerHTML = `

        <div class="modal-content">

            <div class="modal-header">

                <h2>
                    ${rutina.nombre}
                </h2>

                <button
                    type="button"
                    class="close-modal"
                >
                    ×
                </button>

            </div>


            <div class="exercise-list">

                ${ejerciciosHTML}

            </div>

        </div>

    `;


    document.body.appendChild(modal);


    const closeButton =
        modal.querySelector(".close-modal");


    closeButton.addEventListener(
        "click",
        function () {

            modal.remove();

        }
    );


    modal.addEventListener(
        "click",
        function (event) {

            if (event.target === modal) {

                modal.remove();

            }

        }
    );

}



const filterButtons =
    document.querySelectorAll(".filter-button");


filterButtons.forEach(function (button) {

    button.addEventListener(
        "click",
        function () {

            filterButtons.forEach(
                function (item) {

                    item.classList.remove(
                        "active"
                    );

                }
            );


            button.classList.add("active");


            const filtro =
                button.dataset.filter;


            if (filtro === "todas") {

                mostrarRutinas(rutinas);

                return;
            }


            const filtradas =
                rutinas.filter(
                    function (rutina) {

                        return (
                            rutina.categoria ===
                            filtro
                        );

                    }
                );


            mostrarRutinas(filtradas);

        }
    );

});


mostrarRutinas(rutinas);
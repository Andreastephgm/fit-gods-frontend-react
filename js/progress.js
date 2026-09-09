const progressForm =
    document.getElementById("progressForm");

const historyContainer =
    document.getElementById("historyContainer");

const currentWeight =
    document.getElementById("currentWeight");

const currentProgress =
    document.getElementById("currentProgress");

const recordCount =
    document.getElementById("recordCount");

const progressPercentage =
    document.getElementById("progressPercentage");

const progressFill =
    document.getElementById("progressFill");


let registros =
    JSON.parse(
        localStorage.getItem("fitGodsProgreso")
    ) || [];



const fechaInput =
    document.getElementById("fecha");

const fechaActual =
    new Date().toISOString().split("T")[0];

fechaInput.value = fechaActual;




function mostrarHistorial() {

    historyContainer.innerHTML = "";


    if (registros.length === 0) {

        historyContainer.innerHTML = `

            <div class="empty-history">

                Todavía no tienes registros
                de progreso.

            </div>

        `;

        recordCount.textContent = "0";

        return;
    }


    recordCount.textContent =
        registros.length;


    registros
        .slice()
        .reverse()
        .forEach(function (registro) {

            const item =
                document.createElement("article");

            item.classList.add(
                "history-item"
            );


            item.innerHTML = `

                <div class="history-date">

                    ${registro.fecha}

                </div>


                <div class="history-info">

                    <h3>
                        Avance registrado:
                        ${registro.avance}%
                    </h3>

                    <p>
                        ${
                            registro.observaciones ||
                            "Sin observaciones"
                        }
                    </p>

                </div>


                <div class="history-weight">

                    ${registro.peso} kg

                </div>

            `;


            historyContainer.appendChild(item);

        });
}




function actualizarResumen() {

    if (registros.length === 0) {

        return;
    }


    const ultimoRegistro =
        registros[registros.length - 1];


    currentWeight.textContent =
        `${ultimoRegistro.peso} kg`;


    currentProgress.textContent =
        `${ultimoRegistro.avance}%`;


    progressPercentage.textContent =
        `${ultimoRegistro.avance}%`;


    progressFill.style.width =
        `${ultimoRegistro.avance}%`;
}



progressForm.addEventListener(
    "submit",
    function (event) {

        event.preventDefault();


        const fecha =
            document.getElementById("fecha")
                .value;


        const peso =
            document.getElementById("peso")
                .value;


        const avance =
            document.getElementById("avance")
                .value;


        const observaciones =
            document.getElementById(
                "observaciones"
            ).value.trim();


        if (
            fecha === "" ||
            peso === "" ||
            avance === ""
        ) {

            alert(
                "Completa los campos obligatorios."
            );

            return;
        }


        if (
            Number(peso) <= 0 ||
            Number(avance) < 0 ||
            Number(avance) > 100
        ) {

            alert(
                "Ingresa valores válidos."
            );

            return;
        }


        const nuevoRegistro = {

            fecha: fecha,

            peso: Number(peso),

            avance: Number(avance),

            observaciones:
                observaciones

        };


        registros.push(
            nuevoRegistro
        );


        localStorage.setItem(
            "fitGodsProgreso",
            JSON.stringify(registros)
        );


        actualizarResumen();

        mostrarHistorial();


        progressForm.reset();

        fechaInput.value =
            new Date()
                .toISOString()
                .split("T")[0];


        alert(
            "Registro guardado correctamente."
        );

    }
);



mostrarHistorial();

actualizarResumen();
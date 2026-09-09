const profileForm =
    document.getElementById("profileForm");


const profileName =
    document.getElementById("profileName");


const profileEmail =
    document.getElementById("profileEmail");


const logoutButton =
    document.getElementById("logoutButton");



const datosIniciales = {

    nombre: "",

    apellido: "",

    correo: "correo@ejemplo.com",

    fechaNacimiento: "",

    peso: 55,

    estatura: 1.70,

    objetivo: "Ganar masa muscular"

};



let usuario =
    JSON.parse(
        localStorage.getItem("fitGodsUsuario")
    ) || datosIniciales;


function cargarPerfil() {

    document.getElementById("nombre").value =
        usuario.nombre || "";


    document.getElementById("apellido").value =
        usuario.apellido || "";


    document.getElementById("correo").value =
        usuario.correo || "";


    document.getElementById("fechaNacimiento").value =
        usuario.fechaNacimiento || "";


    document.getElementById("peso").value =
        usuario.peso || "";


    document.getElementById("estatura").value =
        usuario.estatura || "";


    document.getElementById("objetivo").value =
        usuario.objetivo || "";


    actualizarEncabezado();

}


function actualizarEncabezado() {

    const nombreCompleto =
        `${usuario.nombre || ""} ${usuario.apellido || ""}`.trim();


    profileName.textContent =
        nombreCompleto || "Usuario";


    profileEmail.textContent =
        usuario.correo || "Sin correo registrado";

}


profileForm.addEventListener(
    "submit",
    function (event) {

        event.preventDefault();


        const nuevoUsuario = {

            nombre:
                document.getElementById("nombre").value.trim(),

            apellido:
                document.getElementById("apellido").value.trim(),

            correo:
                document.getElementById("correo").value.trim(),

            fechaNacimiento:
                document.getElementById("fechaNacimiento").value,

            peso:
                document.getElementById("peso").value,

            estatura:
                document.getElementById("estatura").value,

            objetivo:
                document.getElementById("objetivo").value

        };


        if (
            nuevoUsuario.nombre === "" ||
            nuevoUsuario.apellido === "" ||
            nuevoUsuario.correo === ""
        ) {

            alert(
                "Completa los campos obligatorios."
            );

            return;
        }


        usuario = nuevoUsuario;


        localStorage.setItem(
            "fitGodsUsuario",
            JSON.stringify(usuario)
        );


        actualizarEncabezado();


        alert(
            "Los datos se actualizaron correctamente."
        );

    }
);


logoutButton.addEventListener(
    "click",
    function () {

        const confirmar =
            confirm(
                "¿Deseas cerrar sesión?"
            );


        if (!confirmar) {

            return;

        }

        window.location.href =
            "index.html";

    }
);


cargarPerfil();
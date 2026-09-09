const registerForm = document.getElementById("registerForm");

registerForm.addEventListener("submit", function (event) {

    event.preventDefault();

    const nombre = document.getElementById("nombre").value.trim();
    const apellido = document.getElementById("apellido").value.trim();
    const correo = document.getElementById("correo").value.trim().toLowerCase();
    const password = document.getElementById("password").value;
    const fechaNacimiento = document.getElementById("fechaNacimiento").value;
    const peso = document.getElementById("peso").value;
    const estatura = document.getElementById("estatura").value;
    const objetivo = document.getElementById("objetivo").value;

    const usuarios = JSON.parse(
        localStorage.getItem("fitGodsUsuarios")
    ) || [];


    const usuarioExistente = usuarios.find(
        usuario => usuario.correo === correo
    );


    if (usuarioExistente) {

        alert("Ya existe una cuenta registrada con este correo.");

        return;
    }


    const nuevoUsuario = {

        nombre: nombre,
        apellido: apellido,
        correo: correo,
        password: password,
        fechaNacimiento: fechaNacimiento,
        peso: peso,
        estatura: estatura,
        objetivo: objetivo

    };


    usuarios.push(nuevoUsuario);


    localStorage.setItem(
        "fitGodsUsuarios",
        JSON.stringify(usuarios)
    );


    alert("Cuenta creada correctamente.");


    window.location.href = "index.html";

});
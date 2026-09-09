const loginForm = document.getElementById("loginForm");

const togglePassword = document.getElementById("togglePassword");

const passwordInput = document.getElementById("password");


if (togglePassword) {

    togglePassword.addEventListener("click", function () {

        if (passwordInput.type === "password") {

            passwordInput.type = "text";

            togglePassword.textContent = "Ocultar";

        } else {

            passwordInput.type = "password";

            togglePassword.textContent = "Mostrar";

        }

    });

}


loginForm.addEventListener("submit", function (event) {

    event.preventDefault();


    const correo = document
        .getElementById("correo")
        .value
        .trim()
        .toLowerCase();


    const password = document
        .getElementById("password")
        .value;


    const usuarios = JSON.parse(
        localStorage.getItem("fitGodsUsuarios")
    ) || [];


    const usuario = usuarios.find(function (usuario) {

        return (
            usuario.correo === correo &&
            usuario.password === password
        );

    });


    if (!usuario) {

        alert(
            "El correo o la contraseña son incorrectos."
        );

        return;
    }



    localStorage.setItem(
        "fitGodsUsuarioActivo",
        JSON.stringify(usuario)
    );


    alert(
        "Bienvenido/a " + usuario.nombre + "."
    );


    window.location.href = "home.html";

});
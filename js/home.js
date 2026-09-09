const userName = document.getElementById("userName");

const progressValue = document.getElementById("progressValue");

const progressBar = document.getElementById("progressBar");

const logoutButton = document.getElementById("logoutButton");



const usuarioGuardado = localStorage.getItem("fitGodsUsuario");


if (usuarioGuardado) {

    const usuario = JSON.parse(usuarioGuardado);

    userName.textContent = `Hola, ${usuario.nombre}`;

} else {

    userName.textContent = "Hola";
}



const progreso = 65;

progressValue.textContent = `${progreso}%`;

progressBar.style.width = `${progreso}%`;



logoutButton.addEventListener("click", function () {

    const confirmar = confirm(
        "¿Quieres cerrar sesión?"
    );

    if (!confirmar) {
        return;
    }

    localStorage.removeItem("fitGodsUsuario");

    window.location.href = "index.html";
});
// JavaScript source code
document.addEventListener("DOMContentLoaded", () => {
    const avatar = document.getElementById("ava");
    const menu = document.getElementById("menu");

    avatar.addEventListener("click", (event) => {
        event.stopPropagation(); // previene que se cierre inmediatamente
        menu.classList.toggle("show");
    });

    // cierra si se toca fuera del menu 
    document.addEventListener("click", () => {
        menu.classList.remove("show");
    });
});


document.addEventListener("DOMContentLoaded", () => {
    const logout = document.getElementById("logout");

    logout.addEventListener("click", (event) => {
        event.preventDefault();
        sessionStorage.clear()

        window.location = "index.html";
    })
});


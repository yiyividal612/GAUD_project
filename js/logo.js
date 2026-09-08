// Da feedback visual (una pequeña animacion) al pasar el mouse sobre el logo,
// que ademas ahora es un enlace directo al Dashboard.
function activarFeedbackLogo() {
    const logo = document.getElementById("logo-dashboard");
    if (!logo) return;

    logo.addEventListener("mouseenter", () => {
        logo.style.transform = "scale(1.08)";
    });

    logo.addEventListener("mouseleave", () => {
        logo.style.transform = "scale(1)";
    });

    return logo;
}

document.addEventListener("DOMContentLoaded", activarFeedbackLogo);

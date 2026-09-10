// ============================================
// FOTO DE PERFIL CON FILEREADER
// ============================================

document.addEventListener("DOMContentLoaded", () => {

    const inputFotoPerfil = document.getElementById("inputFotoPerfil");
    const fotoPerfil = document.getElementById("fotoPerfil");
    const btnCambiarFoto = document.getElementById("btnCambiarFoto");

    // Valida que el archivo seleccionado sea una imagen
    function validarImagen(archivo) {
        if (!archivo) {
            return false;
        }

        return archivo.type.startsWith("image/");
    }

    // Lee la imagen y la muestra en el perfil
    function mostrarFotoPerfil(archivo) {

        if (!validarImagen(archivo)) {
            alert("Por favor selecciona una imagen válida.");
            return false;
        }

        const lector = new FileReader();

        lector.onload = function(evento) {
            fotoPerfil.src = evento.target.result;
        };

        lector.readAsDataURL(archivo);

        return true;
    }

    // Al pulsar el lápiz, abre el selector de archivos
    btnCambiarFoto.addEventListener("click", () => {
        inputFotoPerfil.click();
    });

    // Al seleccionar una imagen, la muestra en el perfil
    inputFotoPerfil.addEventListener("change", () => {
        const archivoSeleccionado = inputFotoPerfil.files[0];
        mostrarFotoPerfil(archivoSeleccionado);
    });

});

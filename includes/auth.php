<?php
session_start();

function requerir_login() {
    if (!isset($_SESSION['id_usuario'])) {
        header('Location: login.php');
        exit;
    }
}

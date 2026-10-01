<?php
require 'includes/auth.php';
requerir_login();
?>
<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <title>GAUD - Panel</title>
    <style>
        body { font-family: Arial, sans-serif; margin: 0; background: #f2f4f8; }
        header { background: #1a3a6b; color: #fff; padding: 14px 24px; display: flex; justify-content: space-between; align-items: center; }
        header a { color: #fff; margin-left: 16px; }
        main { padding: 24px; }
    </style>
</head>
<body>
    <header>
        <strong>GAUD</strong>
        <span>
            Sesión de: <?= htmlspecialchars($_SESSION['nombre']) ?>
            <a href="asignaturas.php">Asignaturas</a>
            <a href="logout.php">Cerrar sesión</a>
        </span>
    </header>
    <main>
        <h2>Bienvenido, <?= htmlspecialchars($_SESSION['nombre']) ?></h2>
        <p>Esta página solo es visible con una sesión iniciada.</p>
    </main>
</body>
</html>

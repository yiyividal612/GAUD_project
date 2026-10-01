<?php
session_start();
require 'config/conexion.php';

if (isset($_SESSION['id_usuario'])) {
    header('Location: dashboard.php');
    exit;
}

$error = '';

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $correo = trim($_POST['correo'] ?? '');
    $password = $_POST['password'] ?? '';

    $stmt = $conexion->prepare('SELECT id_usuario, nombre, password_hash FROM usuarios WHERE correo = ?');
    $stmt->bind_param('s', $correo);
    $stmt->execute();
    $usuario = $stmt->get_result()->fetch_assoc();

    if ($usuario && password_verify($password, $usuario['password_hash'])) {
        session_regenerate_id(true);
        $_SESSION['id_usuario'] = $usuario['id_usuario'];
        $_SESSION['nombre'] = $usuario['nombre'];
        header('Location: dashboard.php');
        exit;
    }
    $error = 'Correo o contraseña incorrectos.';
}
?>
<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>GAUD - Iniciar sesión</title>
    <style>
        body { font-family: Arial, sans-serif; background: #f2f4f8; display: flex; justify-content: center; align-items: center; height: 100vh; margin: 0; }
        .caja { background: #fff; padding: 32px; border-radius: 10px; width: 320px; box-shadow: 0 2px 10px rgba(0,0,0,.1); }
        h1 { margin-top: 0; font-size: 22px; text-align: center; }
        label { display: block; margin-top: 14px; font-size: 14px; }
        input { width: 100%; padding: 10px; margin-top: 6px; box-sizing: border-box; border: 1px solid #ccc; border-radius: 6px; }
        button { width: 100%; margin-top: 20px; padding: 11px; background: #1a3a6b; color: #fff; border: 0; border-radius: 6px; cursor: pointer; font-size: 15px; }
        .error { background: #fde8e8; color: #b00020; padding: 10px; border-radius: 6px; margin-top: 14px; font-size: 14px; }
    </style>
</head>
<body>
    <div class="caja">
        <h1>GAUD - Iniciar sesión</h1>
        <?php if ($error): ?>
            <div class="error"><?= htmlspecialchars($error) ?></div>
        <?php endif; ?>
        <form method="POST" action="login.php">
            <label for="correo">Correo</label>
            <input type="email" id="correo" name="correo" required>
            <label for="password">Contraseña</label>
            <input type="password" id="password" name="password" required>
            <button type="submit">Entrar</button>
        </form>
    </div>
</body>
</html>

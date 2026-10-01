<?php
require 'includes/auth.php';
require 'config/conexion.php';
requerir_login();

$id = (int)($_GET['id'] ?? $_POST['id'] ?? 0);
$error = '';

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $codigo = trim($_POST['codigo'] ?? '');
    $nombre = trim($_POST['nombre'] ?? '');
    $creditos = (int)($_POST['creditos'] ?? 0);
    $periodo = (int)($_POST['periodo'] ?? 0);

    if ($codigo === '' || $nombre === '' || $creditos < 1 || $periodo < 1) {
        $error = 'Completa todos los campos con valores válidos.';
    } else {
        $stmt = $conexion->prepare('UPDATE asignaturas SET codigo = ?, nombre = ?, creditos = ?, periodo = ? WHERE id_asignatura = ?');
        $stmt->bind_param('ssiii', $codigo, $nombre, $creditos, $periodo, $id);
        if ($stmt->execute()) {
            $_SESSION['flash_ok'] = 'Asignatura actualizada correctamente.';
            header('Location: asignaturas.php');
            exit;
        }
        $error = ($conexion->errno === 1062) ? 'Ya existe otra asignatura con ese código.' : 'No se pudo actualizar.';
    }
}

$stmt = $conexion->prepare('SELECT codigo, nombre, creditos, periodo FROM asignaturas WHERE id_asignatura = ?');
$stmt->bind_param('i', $id);
$stmt->execute();
$a = $stmt->get_result()->fetch_assoc();

if (!$a) {
    $_SESSION['flash_error'] = 'La asignatura no existe.';
    header('Location: asignaturas.php');
    exit;
}
?>
<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>GAUD - Editar asignatura</title>
    <style>
        body { font-family: Arial, sans-serif; background: #f2f4f8; display: flex; justify-content: center; padding-top: 50px; }
        .caja { background: #fff; padding: 28px; border-radius: 10px; width: 340px; box-shadow: 0 2px 10px rgba(0,0,0,.1); }
        label { display: block; margin-top: 12px; font-size: 14px; }
        input { width: 100%; padding: 9px; margin-top: 5px; box-sizing: border-box; border: 1px solid #ccc; border-radius: 6px; }
        button, a.btn { display: inline-block; margin-top: 18px; padding: 10px 14px; background: #1a3a6b; color: #fff; border: 0; border-radius: 6px; cursor: pointer; text-decoration: none; font-size: 14px; }
        .error { background: #fde8e8; color: #b00020; padding: 10px; border-radius: 6px; margin-top: 12px; font-size: 14px; }
    </style>
</head>
<body>
    <div class="caja">
        <h2>Editar asignatura</h2>
        <?php if ($error): ?><div class="error"><?= htmlspecialchars($error) ?></div><?php endif; ?>
        <form method="POST" action="editar_asignatura.php">
            <input type="hidden" name="id" value="<?= $id ?>">
            <label>Código</label>
            <input type="text" name="codigo" maxlength="20" value="<?= htmlspecialchars($a['codigo']) ?>" required>
            <label>Nombre</label>
            <input type="text" name="nombre" maxlength="150" value="<?= htmlspecialchars($a['nombre']) ?>" required>
            <label>Créditos</label>
            <input type="number" name="creditos" min="1" max="20" value="<?= (int)$a['creditos'] ?>" required>
            <label>Periodo</label>
            <input type="number" name="periodo" min="1" max="20" value="<?= (int)$a['periodo'] ?>" required>
            <button type="submit">Guardar cambios</button>
            <a class="btn" href="asignaturas.php">Cancelar</a>
        </form>
    </div>
</body>
</html>

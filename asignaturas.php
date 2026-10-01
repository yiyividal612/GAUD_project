<?php
require 'includes/auth.php';
require 'config/conexion.php';
requerir_login();

$ok = $_SESSION['flash_ok'] ?? '';
$error = $_SESSION['flash_error'] ?? '';
unset($_SESSION['flash_ok'], $_SESSION['flash_error']);

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $accion = $_POST['accion'] ?? '';

    if ($accion === 'crear') {
        $codigo = trim($_POST['codigo'] ?? '');
        $nombre = trim($_POST['nombre'] ?? '');
        $creditos = (int)($_POST['creditos'] ?? 0);
        $periodo = (int)($_POST['periodo'] ?? 0);

        if ($codigo === '' || $nombre === '' || $creditos < 1 || $periodo < 1) {
            $_SESSION['flash_error'] = 'Completa todos los campos con valores válidos.';
        } else {
            $stmt = $conexion->prepare('INSERT INTO asignaturas (codigo, nombre, creditos, periodo) VALUES (?, ?, ?, ?)');
            $stmt->bind_param('ssii', $codigo, $nombre, $creditos, $periodo);
            if ($stmt->execute()) {
                $_SESSION['flash_ok'] = 'Asignatura creada correctamente.';
            } else {
                $_SESSION['flash_error'] = ($conexion->errno === 1062)
                    ? 'Ya existe una asignatura con ese código.'
                    : 'No se pudo crear la asignatura.';
            }
        }
    }

    if ($accion === 'eliminar') {
        $id = (int)($_POST['id'] ?? 0);
        $stmt = $conexion->prepare('DELETE FROM asignaturas WHERE id_asignatura = ?');
        $stmt->bind_param('i', $id);
        if ($stmt->execute()) {
            $_SESSION['flash_ok'] = 'Asignatura eliminada.';
        } else {
            $_SESSION['flash_error'] = 'No se pudo eliminar: la asignatura está en uso.';
        }
    }

    header('Location: asignaturas.php');
    exit;
}

$asignaturas = $conexion->query('SELECT id_asignatura, codigo, nombre, creditos, periodo FROM asignaturas ORDER BY periodo, codigo');
?>
<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>GAUD - Asignaturas</title>
    <style>
        body { font-family: Arial, sans-serif; margin: 0; background: #f2f4f8; }
        header { background: #1a3a6b; color: #fff; padding: 14px 24px; display: flex; justify-content: space-between; align-items: center; }
        header a { color: #fff; margin-left: 16px; }
        main { padding: 24px; max-width: 900px; margin: auto; }
        .tarjeta { background: #fff; padding: 20px; border-radius: 10px; margin-bottom: 20px; box-shadow: 0 2px 8px rgba(0,0,0,.08); }
        .fila { display: flex; gap: 10px; flex-wrap: wrap; }
        input { padding: 9px; border: 1px solid #ccc; border-radius: 6px; }
        button, .btn { padding: 9px 14px; background: #1a3a6b; color: #fff; border: 0; border-radius: 6px; cursor: pointer; text-decoration: none; font-size: 14px; }
        .rojo { background: #b00020; }
        table { width: 100%; border-collapse: collapse; }
        th, td { padding: 10px; text-align: left; border-bottom: 1px solid #e3e6ec; }
        .ok { background: #e6f4ea; color: #1e6b34; padding: 10px; border-radius: 6px; margin-bottom: 16px; }
        .error { background: #fde8e8; color: #b00020; padding: 10px; border-radius: 6px; margin-bottom: 16px; }
        form.inline { display: inline; }
    </style>
</head>
<body>
    <header>
        <strong>GAUD</strong>
        <span>
            Sesión de: <?= htmlspecialchars($_SESSION['nombre']) ?>
            <a href="dashboard.php">Panel</a>
            <a href="logout.php">Cerrar sesión</a>
        </span>
    </header>
    <main>
        <?php if ($ok): ?><div class="ok"><?= htmlspecialchars($ok) ?></div><?php endif; ?>
        <?php if ($error): ?><div class="error"><?= htmlspecialchars($error) ?></div><?php endif; ?>

        <div class="tarjeta">
            <h3>Nueva asignatura</h3>
            <form method="POST" action="asignaturas.php" class="fila">
                <input type="hidden" name="accion" value="crear">
                <input type="text" name="codigo" placeholder="Código" maxlength="20" required>
                <input type="text" name="nombre" placeholder="Nombre" maxlength="150" required>
                <input type="number" name="creditos" placeholder="Créditos" min="1" max="20" required>
                <input type="number" name="periodo" placeholder="Periodo" min="1" max="20" required>
                <button type="submit">Guardar</button>
            </form>
        </div>

        <div class="tarjeta">
            <h3>Listado de asignaturas</h3>
            <table>
                <tr><th>Código</th><th>Nombre</th><th>Créditos</th><th>Periodo</th><th>Acciones</th></tr>
                <?php while ($a = $asignaturas->fetch_assoc()): ?>
                <tr>
                    <td><?= htmlspecialchars($a['codigo']) ?></td>
                    <td><?= htmlspecialchars($a['nombre']) ?></td>
                    <td><?= (int)$a['creditos'] ?></td>
                    <td><?= (int)$a['periodo'] ?></td>
                    <td>
                        <a class="btn" href="editar_asignatura.php?id=<?= (int)$a['id_asignatura'] ?>">Editar</a>
                        <form class="inline" method="POST" action="asignaturas.php"
                              onsubmit="return confirm('¿Seguro que deseas eliminar esta asignatura?');">
                            <input type="hidden" name="accion" value="eliminar">
                            <input type="hidden" name="id" value="<?= (int)$a['id_asignatura'] ?>">
                            <button type="submit" class="rojo">Eliminar</button>
                        </form>
                    </td>
                </tr>
                <?php endwhile; ?>
            </table>
        </div>
    </main>
</body>
</html>

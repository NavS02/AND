<?php

// ejecutar el script python
shell_exec("python3 metadata.py");

// archivo generado
$file = "hola.txt";

// headers para forzar descarga
header('Content-Type: text/plain');
header('Content-Disposition: attachment; filename="hola.txt"');
header('Content-Length: ' . filesize($file));

// enviar archivo
readfile($file);
exit;
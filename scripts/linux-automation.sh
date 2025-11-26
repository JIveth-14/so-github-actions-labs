set -euo pipefail

echo "=== Linux automation script ==="

echo "ENV MESSAGE: ${MESSAGE:-no-message}"
echo "ENV SECRET_EXAMPLE: ${SECRET_EXAMPLE:-not-set}"

echo "Creando archivo de salida..."
echo "Hola desde Linux script" > output-linux.txt

echo "Contenido de output-linux.txt:"
cat output-linux.txt

echo "Cambiando permisos de output-linux.txt a 600..."
chmod 600 output-linux.txt
ls -l output-linux.txt

echo "Lanzando un proceso en segundo plano..."
(sleep 10 && echo "Proceso en background finalizado" >> background-log.txt) &

echo "PID de proceso background: $!"

if [ "${FORCE_ERROR:-0}" -eq 1 ]; then
  echo "Se forzó un error" >&2
  exit 1
fi

echo "Script Linux completado correctamente."

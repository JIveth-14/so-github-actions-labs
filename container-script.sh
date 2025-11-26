
echo "=== Dentro del contenedor ==="
echo "Hostname del contenedor: $(hostname)"
echo "Fecha dentro del contenedor: $(date)"

echo "Mensaje recibido desde el host (ENV MESSAGE_FROM_HOST): ${MESSAGE_FROM_HOST:-no definido}"

echo "Realizando trabajo pesado simulado..."
dd if=/dev/zero of=/tmp/testfile bs=1M count=50 status=progress

echo "Trabajo finalizado."

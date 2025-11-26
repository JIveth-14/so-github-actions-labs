Param(
  [switch]$ForceError
)

Write-Host "=== Windows automation script ==="

Write-Host "ENV MESSAGE: $env:MESSAGE"
Write-Host "ENV SECRET_EXAMPLE: $env:SECRET_EXAMPLE"

"Hola desde PowerShell script" | Out-File -FilePath output-windows.txt -Encoding utf8
Write-Host "Contenido de output-windows.txt:"
Get-Content .\output-windows.txt

Write-Host "Asignando permisos a output-windows.txt (lectura/escritura para el usuario actual)"
$User = "$env:USERNAME"
icacls .\output-windows.txt /grant "$User:(R,W)" | Out-Null
icacls .\output-windows.txt

Write-Host "Lanzando proceso en segundo plano..."
$job = Start-Job -ScriptBlock {
  Start-Sleep -Seconds 10
  "Background job completado" | Out-File -FilePath background-log.txt -Encoding utf8
}
Write-Host "Job Id: $($job.Id)"

if ($ForceError) {
  Write-Error "Se forzó un error desde PowerShell"
  exit 1
}

Write-Host "Script Windows completado correctamente."
exit 0

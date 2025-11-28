Param(
  [switch]$ForceError
)

# No detengas el script por errores no críticos
$ErrorActionPreference = "Continue"

Write-Host "=== Windows automation script ==="

# Workspace del repo en el runner
$workspace = $env:GITHUB_WORKSPACE
if (-not $workspace) {
  $workspace = Split-Path -Parent $PSScriptRoot
}
Set-Location $workspace
Write-Host "Current directory: $(Get-Location)"

# 1. Variables de entorno
Write-Host "ENV MESSAGE: $env:MESSAGE"
Write-Host "ENV SECRET_EXAMPLE: $env:SECRET_EXAMPLE"

# 2. Leer / escribir archivos en la raíz del repo
"Hola desde PowerShell script" | Out-File -FilePath "output-windows.txt" -Encoding utf8

Write-Host "Contenido de output-windows.txt:"
Get-Content "output-windows.txt"

# 3. Permisos de archivos (icacls) - no romper si falla
Write-Host "Asignando permisos a output-windows.txt (lectura/escritura para el usuario actual)"
$User = "$env:USERNAME"
try {
  icacls "output-windows.txt" /grant "$User:(R,W)" | Out-Null
} catch {
  Write-Warning "icacls falló: $($_.Exception.Message)"
}
icacls "output-windows.txt"

# 4. Proceso en segundo plano que escribe en background-log.txt
Write-Host "Lanzando proceso en segundo plano..."
$job = Start-Job -ScriptBlock {
  param($filePath)
  Start-Sleep -Seconds 3
  "Background job completado" | Out-File -FilePath $filePath -Encoding utf8
} -ArgumentList "background-log.txt"

Wait-Job $job | Out-Null
Receive-Job $job | Out-Null
Remove-Job $job

Write-Host "Contenido de background-log.txt:"
Get-Content "background-log.txt"

# 5. Error controlado opcional
if ($ForceError) {
  Write-Error "Se forzó un error desde PowerShell"
  exit 1
}

Write-Host "Script Windows completado correctamente."
exit 0

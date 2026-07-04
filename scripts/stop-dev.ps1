param(
  [int]$Port = 4321
)

$ErrorActionPreference = "Stop"

$listeners = Get-NetTCPConnection -LocalPort $Port -State Listen -ErrorAction SilentlyContinue

if (-not $listeners) {
  Write-Host "No dev server is listening on port $Port."
  exit 0
}

foreach ($listener in $listeners) {
  $process = Get-Process -Id $listener.OwningProcess -ErrorAction SilentlyContinue

  if ($process) {
    Write-Host "Stopping process $($process.Id) ($($process.ProcessName)) on port $Port..."
    Stop-Process -Id $process.Id -Force
  }
}

Start-Sleep -Milliseconds 300

$remaining = Get-NetTCPConnection -LocalPort $Port -State Listen -ErrorAction SilentlyContinue

if ($remaining) {
  Write-Error "Port $Port is still in use."
  exit 1
}

Write-Host "Stopped dev server on port $Port."

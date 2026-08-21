# Start the local static SPA server from PowerShell.
$ErrorActionPreference = "Stop"
$projectRoot = Split-Path -Parent $MyInvocation.MyCommand.Path
Set-Location $projectRoot
Write-Host "Open http://127.0.0.1:8000/ in your browser (Ctrl+C to stop)."
python serve.py --port 8000

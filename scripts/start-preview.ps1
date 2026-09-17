$ErrorActionPreference = 'Stop'
$projectDirectory = Split-Path -Parent $PSScriptRoot
Set-Location -LiteralPath $projectDirectory
$env:ASTRO_TELEMETRY_DISABLED = '1'
$nodeCommand = Get-Command node -ErrorAction SilentlyContinue
if ($nodeCommand) {
    $nodeExecutable = $nodeCommand.Source
} else {
    $nodeExecutable = Join-Path $env:USERPROFILE '.cache/codex-runtimes/codex-primary-runtime/dependencies/node/bin/node.exe'
}
if (-not (Test-Path -LiteralPath $nodeExecutable)) {
    throw 'Node.js is required. Install Node.js, then run npm install and npm run dev.'
}
& $nodeExecutable node_modules/astro/bin/astro.mjs dev --host 127.0.0.1 --port 4321
exit $LASTEXITCODE

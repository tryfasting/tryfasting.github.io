# Run once after a deploy is live: main-prev <- main, then capture the new production site into main.
[CmdletBinding(SupportsShouldProcess)]
param([string]$BaseUrl = 'https://tryfasting.github.io')

$ErrorActionPreference = 'Stop'
$root = Split-Path -Parent $PSScriptRoot
$artifacts = Join-Path $root 'artifacts'
$main = Join-Path $artifacts 'main'
$prev = Join-Path $artifacts 'main-prev'
Add-Type -AssemblyName Microsoft.VisualBasic

if (Test-Path -LiteralPath $prev) {
    if ($PSCmdlet.ShouldProcess($prev, 'Send to Recycle Bin')) {
        [Microsoft.VisualBasic.FileIO.FileSystem]::DeleteDirectory($prev, 'OnlyErrorDialogs', 'SendToRecycleBin')
    }
}
if (Test-Path -LiteralPath $main) {
    if ($PSCmdlet.ShouldProcess($main, "Rename to $prev")) {
        Rename-Item -LiteralPath $main -NewName 'main-prev'
    }
}
if ($PSCmdlet.ShouldProcess($main, "Capture $BaseUrl")) {
    Push-Location $root
    try { node scripts/capture-site.cjs $BaseUrl artifacts/main; if ($LASTEXITCODE) { throw 'capture-site.cjs failed' } }
    finally { Pop-Location }
}

$ErrorActionPreference = 'Stop'
Push-Location $PSScriptRoot
try {
    $npmBin = Join-Path $PSScriptRoot '..\.tools\package\bin'
    $savedPath = $env:PATH
    if (Test-Path -LiteralPath $npmBin) { $env:PATH = "$npmBin;$env:PATH" }
    node sync-vault.mjs
    if ($LASTEXITCODE -ne 0) { throw 'Copying public notes failed.' }
    node quartz\bootstrap-cli.mjs plugin install
    if ($LASTEXITCODE -ne 0) { throw 'Plugin preparation failed.' }
    node quartz\bootstrap-cli.mjs build
    if ($LASTEXITCODE -ne 0) { throw 'Garden build failed.' }
    Write-Host 'Garden built. Review git diff before committing and pushing.'
} finally {
    $env:PATH = $savedPath
    Pop-Location
}

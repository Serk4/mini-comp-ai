param(
  [string]$Query,
  [string]$EnvFilePath = ".env"
)

$projectDir = Split-Path -Parent $PSScriptRoot
$resolvedEnvFile = if ([System.IO.Path]::IsPathRooted($EnvFilePath)) {
  $EnvFilePath
} else {
  Join-Path $projectDir $EnvFilePath
}

if (-not (Test-Path $resolvedEnvFile)) {
  throw "Env file not found: $resolvedEnvFile"
}

$line = Select-String -Path $resolvedEnvFile -Pattern '^\s*DATABASE_URL\s*=' | Select-Object -First 1 -ExpandProperty Line
if (-not $line) {
  throw "DATABASE_URL is missing in $resolvedEnvFile"
}

$dbUrl = $line -replace '^\s*DATABASE_URL\s*=\s*"?([^\"]*)"?\s*$', '$1'
if ([string]::IsNullOrWhiteSpace($dbUrl)) {
  throw "DATABASE_URL is empty in $resolvedEnvFile"
}

$psqlCandidates = @()
$psqlCmd = Get-Command psql -ErrorAction SilentlyContinue
if ($psqlCmd) {
  $psqlCandidates += $psqlCmd.Source
}

$psqlCandidates += @(
  'C:\Program Files\PostgreSQL\17\bin\psql.exe',
  'C:\Program Files\PostgreSQL\16\bin\psql.exe',
  'C:\Program Files\PostgreSQL\15\bin\psql.exe'
)

$psqlPath = $psqlCandidates | Where-Object { $_ -and (Test-Path $_) } | Select-Object -First 1
if (-not $psqlPath) {
  throw "psql was not found. Install PostgreSQL client tools or add psql to PATH."
}

if ($Query) {
  $Query | & $psqlPath $dbUrl
} else {
  & $psqlPath $dbUrl
}

exit $LASTEXITCODE

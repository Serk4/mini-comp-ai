$scriptDir = Split-Path -Parent $MyInvocation.MyCommand.Path
$runner = Join-Path $scriptDir 'run-psql.ps1'

& $runner -Query 'select current_database(), current_user, now();'
exit $LASTEXITCODE

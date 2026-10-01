@echo off
cd /d "%~dp0frontend"
echo Installing/checking frontend packages...
call npm install --legacy-peer-deps
if errorlevel 1 (
  echo npm install failed
  pause
  exit /b 1
)
echo Starting frontend on http://localhost:5173
call npm run dev
pause
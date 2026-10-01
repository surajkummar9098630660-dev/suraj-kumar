@echo off
cd /d "%~dp0backend"
echo Installing/checking backend packages...
call npm install --legacy-peer-deps
if errorlevel 1 (
  echo npm install failed - check internet
  pause
  exit /b 1
)
echo Seeding data (Compliance + Maintenance + Earning Per Trip)...
node src/seed-complete.js
if errorlevel 1 node src/seed.js
echo Starting backend on http://localhost:5000
echo Modules: Trip + Expense + Payment + Profit + AI + GPS + Maintenance + Compliance + Earning
call node src/server-FINAL.js
pause
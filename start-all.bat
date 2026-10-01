@echo off
title Fleet OS - Backend 5000 + Frontend 5173
cd /d "%~dp0"
echo Starting Fleet OS Premium...
echo Killing old ports 5000 and 5173...
for /f "tokens=5" %%a in ('netstat -ano ^| findstr :5000 ^| findstr LISTENING 2^>nul') do taskkill /F /PID %%a >nul 2>&1
for /f "tokens=5" %%a in ('netstat -ano ^| findstr :5173 ^| findstr LISTENING 2^>nul') do taskkill /F /PID %%a >nul 2>&1

echo [1] Backend 5000 - Installing + Seeding Compliance + Earning Data...
start "Fleet OS Backend 5000" cmd /k "cd /d %~dp0backend && npm install --legacy-peer-deps && node src/seed-complete.js && node src/server-FINAL.js"

timeout /t 5 /nobreak >nul

echo [2] Frontend 5173 - Installing + Starting...
start "Fleet OS Frontend 5173" cmd /k "cd /d %~dp0frontend && npm install --legacy-peer-deps && npm run dev"

echo.
echo Backend: http://localhost:5000/api/health
echo Frontend: http://localhost:5173
echo Login: admin@fleetos.com / 123456
pause
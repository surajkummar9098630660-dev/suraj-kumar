
@echo off
echo Fixing Rollup error - Application Control blocked...
echo 1. Deleting node_modules and package-lock
rmdir /s /q frontend\node_modules
del frontend\package-lock.json
echo 2. Setting npm config to bypass optional deps
npm config set ignore-optional true
echo 3. Install with legacy peer deps
cd frontend
npm install --no-optional --legacy-peer-deps
cd ..
echo Done! Now try npm run dev again, or just use frontend_no_npm/index.html (no npm needed)
pause

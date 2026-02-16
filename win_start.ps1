$root = $PSScriptRoot

# Backend
Start-Process powershell -ArgumentList "-NoExit", "-Command", "
cd '$root\twoframe-server';
.\venv\Scripts\Activate.ps1;
fastapi dev src/main.py
"

# Frontend
Start-Process powershell -ArgumentList "-NoExit", "-Command", "
cd '$root\twoframe-client';
npm run dev
"

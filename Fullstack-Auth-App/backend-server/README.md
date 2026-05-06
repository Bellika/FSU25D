# Backend Server - User Authentication API

En Express-baserad backend server med full CRUD-funktionalitet för användare och MySQL-databas.

## Projektstruktur

```
backend-server/
├── config/
│   └── database.js          # Databaskonfiguration med connection pool
├── controllers/
│   └── userController.js    # Business logic för användarhantering
├── models/
│   └── User.js             # Databasmodell för användare
├── routes/
│   └── userRoutes.js       # API routes
├── middleware/             # Middleware (kan utökas)
├── server.js              # Huvudfil för Express server
├── .env                   # Miljövariabler (git-ignorerad)
├── .env.example          # Mall för miljövariabler
└── package.json          # Dependencies och scripts
```

## Installation

1. Installera dependencies:
```bash
cd backend-server
npm install
```

2. Konfigurera miljövariabler:
```bash
cp .env.example .env
```

Redigera `.env` med dina databasinställningar:
```env
PORT=5000
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=ditt_lösenord
DB_NAME=user_auth_db
```

3. Se till att MySQL är installerat och igång på din maskin.

4. Skapa databasen (server skapar tabellen automatiskt):
```sql
CREATE DATABASE user_auth_db;
```

## Starta servern

Utvecklingsläge (med nodemon):
```bash
npm run dev
```

Produktionsläge:
```bash
npm start
```

Servern körs på `http://localhost:5000`

## API Endpoints

### Authentication
- **POST** `/api/users/login` - Logga in en användare
  ```json
  {
    "username": "admin",
    "password": "password123"
  }
  ```

### CRUD Operations
- **GET** `/api/users` - Hämta alla användare
- **GET** `/api/users/:id` - Hämta specifik användare
- **POST** `/api/users` - Skapa ny användare
  ```json
  {
    "username": "newuser",
    "password": "securepass"
  }
  ```
- **PUT** `/api/users/:id` - Uppdatera användare
  ```json
  {
    "username": "updateduser",
    "password": "newpassword"  // optional
  }
  ```
- **DELETE** `/api/users/:id` - Ta bort användare

### Health Check
- **GET** `/api/health` - Kontrollera serverstatus

## Säkerhet

- Lösenord hashas med bcrypt (10 salt rounds)
- CORS aktiverat för frontend-integration
- Validering av input data
- Prepared statements för SQL-queries (SQL injection skydd)

## Exempel: Skapa en användare med curl

```bash
curl -X POST http://localhost:5000/api/users \
  -H "Content-Type: application/json" \
  -d '{"username":"admin","password":"password123"}'
```

## Frontend Integration

Frontend (context-auth-app) är konfigurerad att prata med denna backend. Se till att:
1. Backend körs på port 5000
2. Frontend `.env` har `VITE_API_URL=http://localhost:5000/api`
3. Både frontend och backend körs samtidigt

## Teknologier

- **Express.js** - Web framework
- **MySQL2** - Databasdrivrutin med Promise-stöd
- **bcrypt** - Lösenordshashing
- **cors** - Cross-Origin Resource Sharing
- **dotenv** - Miljövariabler
- **nodemon** - Auto-restart vid utveckling

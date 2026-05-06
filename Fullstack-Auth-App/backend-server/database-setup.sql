-- Skapa databas
CREATE DATABASE IF NOT EXISTS user_auth_db;

-- Använd databasen
USE user_auth_db;

-- Tabellen skapas automatiskt av servern när den startar
-- Men här är SQL:en om du vill skapa den manuellt:

CREATE TABLE IF NOT EXISTS users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  username VARCHAR(50) UNIQUE NOT NULL,
  password VARCHAR(255) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- OBS: Använd API:et för att skapa användare istället för direkt SQL
-- eftersom lösenord måste hashas med bcrypt.
-- Exempel API call:
-- POST http://localhost:5000/api/users
-- Body: {"username": "admin", "password": "password123"}

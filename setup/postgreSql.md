PostgreSQL commands
PostgreSQL 18.4

Check PostgreSQL version
SELECT version();


Create a database
CREATE DATABASE memora;


List all databases

Connect to Memora
\c memora


Check current database
SELECT current_database();


Change PostgreSQL password
ALTER USER postgres WITH PASSWORD 'YourStrongPassword';


List tables in current database
\dt


Exit SQL Shell
\q
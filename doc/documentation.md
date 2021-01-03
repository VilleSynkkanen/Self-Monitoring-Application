# Documentation
 
## Database setup

CREATE TABLE users (
  id SERIAL PRIMARY KEY,          
  username VARCHAR(320) NOT NULL, 
  password CHAR(60) NOT NULL
);

// Note: username = email

CREATE TABLE reports (
  id SERIAL PRIMARY KEY,
  date DATE NOT NULL,
  type TEXT CHECK (type IN ('morning', 'evening')),
  generic_mood INTEGER NOT NULL,
  sleep_duration FLOAT,
  sleep_quality INTEGER,
  sports_duration FLOAT,
  studying_duration FLOAT,
  eating_regularity INTEGER,
  eating_quality INTEGER,
  user_id INTEGER REFERENCES users(id)
);

CREATE INDEX reports_by_user_id on reports (user_id);

## Config

Add database credentials to "/src/config/config.js" or pass them to the application via environmental variables. No other configurations are necessary.

## Running the application & tests

The application is not deployed online. The application and the tests can be run locally with the following commands from the "/src" folder (on Linux command line or Git Bash on Windows). Add your own database credentials to the commands if you didn't add them to the config file:

Application:
PGPORT="port" PGDATABASE="database" PGHOST="host" PGUSER="user" PGPASSWORD="password" deno run --allow-env --allow-net --allow-read --unstable app.js

Tests:
PGPORT="port" PGDATABASE="database" PGHOST="host" PGUSER="user" PGPASSWORD="password" deno test --allow-env --allow-net --allow-read --unstable app_test.js

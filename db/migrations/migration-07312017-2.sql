\c pokemon_fight

CREATE TABLE IF NOT EXISTS users(
    id SERIAL PRIMARY KEY,
    username VARCHAR(255) UNIQUE NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    password_digest TEXT NOT NULL,
    nickname VARCHAR(255),
    inventory INTEGER
);

ALTER TABLE pokemons
ADD COLUMN user_id INTEGER REFERENCES users(id);
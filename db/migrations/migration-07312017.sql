\c pokemon_fight

CREATE TABLE IF NOT EXISTS pokemons(
    id SERIAL PRIMARY KEY,
    name VARCHAR(255),
    type VARCHAR(255),
    attack INTEGER,
    defense INTEGER
);
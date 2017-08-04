const db=require('../db/config');

const Pokemon={};

Pokemon.findAll=()=>{
    return db.query('SELECT * FROM pokemons');
}

Pokemon.findById=(id)=>{
    return db.oneOrNone(`
    SELECT * FROM pokemons
    WHERE id = $1
    `,[id]);
}

Pokemon.create=(pokemon,userid)=>{
    return db.one(`
    INSERT INTO pokemons
    (name,type,attack,defense,user_id)
    VALUES($1,$2,$3,$4,$5)
    RETURNING *
    `,[pokemon.name,pokemon.type,pokemon.attack,pokemon.defense,userid])
}

Pokemon.destroy=(id)=>{
    return db.none(`
    DELETE FROM pokemons
    WHERE id=$1
    `,[id]);
}

module.exports=Pokemon;
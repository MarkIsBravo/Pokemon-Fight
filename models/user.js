const db=require('../db/config');

const User={};

User.findById=(id)=>{
    return db.oneOrNone(`
    SELECT * FROM users
    WHERE id=$1
    `,[id]);
}

User.findByUserName=userName=>{
    return db.oneOrNone(`
    SELECT * FROM users
    WHERE username=$1
    `,[userName]);
};

User.create=user=>{
    return db.one(`
    INSERT INTO users
    (username,email,password_digest,nickname,inventory)
    VALUES ($1,$2,$3,$4,10)
    RETURNING *
    `,[user.username,user.email,user.password_digest,user.nickname]);
};

User.findUserPokemons=id=>{
    return db.manyOrNone(`
    SELECT * FROM pokemons
    WHERE user_id=$1
    `,[id]);
};

User.findOthers=id=>{
    return db.query(`
    SELECT * FROM users
    WHERE id!=$1
    `,[id]);
};

User.pokemonCount=id=>{
    return db.query(`
    SELECT COUNT (user_id)
    FROM pokemons
    WHERE user_id!=$1
    GROUP BY user_id
    `,[id]);
};

User.pickRandom=id=>{
    return db.one(`
    SELECT * FROM pokemons
    WHERE user_id=$1
    ORDER BY RANDOM()
    LIMIT 1
    `,[id]);
};

User.update=(user,id)=>{
    return db.one(`
    UPDATE users SET
    username=$1,
    email=$2,
    nickname=$3
    WHERE id=$4
    RETURNING *
    `,[user.username,user.email,user.nickname,id])
}

module.exports=User;
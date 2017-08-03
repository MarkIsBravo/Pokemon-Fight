const db=require('../db/config');

const User={};

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
    VALUES ($1,$2,$3,$4,0)
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

module.exports=User;
const options={
    query:(e)=>{
        console.log(e.query);
    }
};

const pgp=require('pg-promise')();

// function setDatabase(){
//     if(process.env.NODE_ENV==='development'||!process.env.NODE_ENV){
//         return pgp({
//             database:'pokemon_fight',
//             port:5432,
//             host:'localhost',
//         });
//     }else if(process.env.NODE_ENV==='production'){
//         return pgp(process.env.DATABASE_URL);
//     }
// }

// const db=setDatabase();

let db;

if(process.env.NODE_ENV==='development'||!process.env.NODE_ENV){
    db=pgp({
        database:'pokemon_fight',
        port:5432,
        host:'localhost',
    });
}else if(process.env.NODE_ENV==='production'){
    db=pgp(process.env.DATABASE_URL);
}

module.exports=db;
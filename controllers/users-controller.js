const bcrypt=require('bcryptjs');
const User=require('../models/user.js');

const usersController={};

usersController.index=(req,res)=>{
    console.log('usersController');
    User.findUserPokemons(req.user.id)
    .then(pokemons=>{
        res.render('auth/userhome',{
            currentPage:'userhome',
            message:'ok',
            user:req.user,
            data:pokemons,
        });
    }).catch(err=>{
        console.log(err);
        res.status(500).json(err);
    });
}

usersController.create=(req,res)=>{
    const salt=bcrypt.genSaltSync();
    const hash=bcrypt.hashSync(req.body.password,salt);
    User.create({
        username:req.body.username,
        email:req.body.email,
        password_digest:hash,
        nickname:req.body.nickname,
    }).then(user=>{
        req.login(user,(err)=>{
            if(err)return next(err);
            res.redirect('/');
        });
    }).catch(err=>{
        console.log(err);
        res.status(500).json(err);
    });
}

usersController.list=(req,res)=>{
    User.findOthers(req.user.id)
    .then(users=>{
        res.render('pokemons/pokemon-fight',{
            currentPage:'list',
            message:'ok',
            user:req.user,
            data:users,
        });
    })
    .catch(err=>{
        console.log(err);
        res.status(500).json(err);
    })
}

usersController.show=(req,res)=>{
    User.findUserPokemons(req.params.id)
    .then(pokemons=>{
        res.render('pokemons/pokemon-ready',{
            currentPage:'ready',
            message:'ok',
            user:req.user,
            params:req.params,
            data:pokemons,
        });
    })
    .catch(err=>{
        console.log(err);
        res.status(500).json(err);
    })
}

usersController.pick=(req,res)=>{
    User.pickRandom(req.user.id)
    .then(firstPokemon => {
        return User.pickRandom(req.params.id)
                .then(secondPokemon => {
                    return { first: firstPokemon,
                             second: secondPokemon}
                })
    })
    .then(data => {
        res.render('pokemons/pokemon-start',{
            currentPage:'start',
            message:'ok',
            data:data,
        });
    })
    .catch(err=>{
        console.log(err);
        res.status(500).json(err);
    })
}

module.exports=usersController;
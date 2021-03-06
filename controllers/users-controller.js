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
        res.status(500).render('error',{
            currentPage:'whoops',
        });
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
        res.status(500).render('error',{
            currentPage:'whoops',
        });
    });
}

usersController.update=(req,res)=>{
    User.update({
        username:req.body.username,
        email:req.body.email,
        nickname:req.body.nickname,
    },req.user.id)
    .then(user=>{
        res.redirect('/user');
    })
    .catch(err=>{
        console.log(err);
        res.status(500).render('error',{
            currentPage:'whoops',
        });
    })
}

usersController.edit=(req,res)=>{
    User.findById(req.user.id)
    .then(user=>{
        res.render('auth/user-edit',{
            currentPage:'edit',
            data:user,
        });
    })
    .catch(err=>{
        console.log(err);
        res.status(500).render('error',{
            currentPage:'whoops',
        });
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
        res.status(500).render('error',{
            currentPage:'whoops',
        });
    })
}

usersController.list=(req,res)=>{
    User.findOthers(req.user.id)
    .then(data=>{
        res.render('pokemons/pokemon-fight',{
            currentPage:'list',
            message:'ok',
            data:data,
        });
        // res.json(data);
    })
    .catch(err=>{
        console.log(err);
        res.status(500).render('error',{
            currentPage:'whoops',
        });
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
            params:req.params,
            data:data,
        });
    })
    .catch(err=>{
        console.log(err);
        // res.status(500).json(err);
        res.status(500).render('pokemons/pokemon-error',{
            currentPage:'error',
        });
    })
}

module.exports=usersController;
const express=require('express');
const pokemonRoutes=express.Router();
const authHelpers=require('../services/auth/auth-helpers');

const pokemonsController=require('../controllers/pokemons-controller');
const usersController=require('../controllers/users-controller');

pokemonRoutes.get('/pokemon-index',authHelpers.loginRequired,pokemonsController.index);
pokemonRoutes.post('/',authHelpers.loginRequired,pokemonsController.create);

pokemonRoutes.get('/add',authHelpers.loginRequired,(req,res)=>{
    res.render('pokemons/pokemon-add',{
        currentPage:'add',
    });
});

pokemonRoutes.get('/:id',pokemonsController.show);

pokemonRoutes.delete('/:id',authHelpers.loginRequired,pokemonsController.delete);

module.exports=pokemonRoutes;
const Pokemon=require('../models/pokemon');
const pokemonsController={};

pokemonsController.index=(req,res)=>{
    Pokemon.findAll()
    .then(pokemon=>{
        res.render('pokemons/pokemon-index',{
            currentPage:'index',
            message:'ok',
            data:pokemon
        });
    })
    .catch(err=>{
        console.log(err)
        res.status(500).json(err);
    })
};

pokemonsController.create=(req,res)=>{
    Pokemon.create({
        name:req.body.name,
        type:req.body.type,
        attack:req.body.attack,
        defense:req.body.defense
    })
    .then(pokemon=>{
        res.send(pokemon)
    })
};

pokemonsController.show=(req,res)=>{
    Pokemon.findById(req.params.id)
    .then(pokemon=>{
        res.render('pokemons/pokemon-single',{
            currentPage:'show',
            message:'ok',
            data:pokemon
        })
    })
};

module.exports=pokemonsController;
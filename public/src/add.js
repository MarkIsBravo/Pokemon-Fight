$(()=>{
    $('button').click(()=>{
        console.log('get a random pokemon');
        const rand=Math.floor(Math.random()*721)+1;
        $.ajax({
            url:`http://pokeapi.co/api/v2/pokemon/${rand}`,
            method:'GET',
            success:(data)=>{
                const pokemon={
                    name:data.name,
                    type:data.types[0].type.name,
                    attack:data.stats[4].base_stat,
                    defense:data.stats[3].base_stat
                }
                sendToDB(pokemon);
            }
        })
    })

    const sendToDB=pokemon=>{
        $.ajax({
            url:'/pokemons',
            method:'POST',
            data:pokemon
        }).done(data=>{
            window.location=`http://localhost:3000/pokemons/${data.id}`
        })
    }
})
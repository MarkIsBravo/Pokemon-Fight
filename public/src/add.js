$(()=>{
    $('button').click(()=>{
        console.log('get a random pokemon');
        $('button').remove();
        $('.translateY').append($('.catchDiv'));
        $('.catchDiv').addClass('pokeballRotate');
        $('.translateY').addClass('pokeballTranslateY');
        let $searching=$('<div>',{'id':'searchingText','class':'message'}).text('Searching for Wild Pokémon...');
        $('.container').append($searching);
        const rand=Math.floor(Math.random()*721)+1;
        $.ajax({
            url:`https://pokeapi.co/api/v2/pokemon/${rand}`,
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
            setTimeout(()=>{
                window.location=`https://shrouded-garden-20738.herokuapp.com/pokemons/${data.id}`
            },4000)
        })
    }
})
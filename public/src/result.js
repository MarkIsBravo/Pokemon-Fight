$(()=>{
    $('button').click(()=>{
        console.log('get a winner');
        let attack1=$('.card1 .attack').text();
        let defense1=$('.card1 .defense').text();
        let attack2=$('.card2 .attack').text();
        let defense2=$('.card2 .defense').text();
        const compare=((attack1-defense2)+(defense1-attack2))/400;
        const rand=Math.random()*(2+compare)

        let lost
        if(rand>=1){
            lost=2;
        }else{
            lost=1;
        }

        $(`.card${lost}`).remove();

        $('.vs').remove();
        $('.bet').remove();
        $('button').remove();
        $('.banner').css('animation','rotate 1s linear');
        if($('.container .card1').length>0){
            $('.banner').text('You Won!');
        }else if($('.container .card2').length>0){
            $('.banner').text('Try again later!');
        }
        
        let $returnBtn=$("<input class='buttons againOrReturn' type='submit' value='Return' />");
        $('.return').append($returnBtn);
        let $againBtn=$("<input class='buttons againOrReturn' type='submit' value='Again!' />");
        $('.again').append($againBtn);
    })
})
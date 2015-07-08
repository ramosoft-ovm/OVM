document.addEventListener('DOMContentLoaded', function(){

	var userId = localStorage.getItem("userIdLocal");
	//var userId = 12;
	/*Devuelve los últimos inscritos del usuario que esperan por ser agregados a la RED*/
    queryData('USP_VBC_GET_WAITING_ROOM', ['integer', userId], getWaitingRoom);
    function getWaitingRoom(dataSet){
        var rec = dataSet[0];
        var cont = 0;

        for(var idx = 0; idx < dataSet.length; idx++){
            rec = dataSet[idx];
            cont = cont+1;
        }

        if(cont == 0){
        	$('table tbody tr:nth-child(4) td a').attr('href', '#');
        }

        console.log(cont);
        $('table tbody tr:nth-child(4) td a').prepend('<span>'+cont+'</span>');
        $('table tbody tr:nth-child(4) td a span').addClass('count'); 
    }

    /*Devuelve la cantidad de miembros que pertencen a la red del usuario */
    queryData('USP_VBC_GET_MATRIX_VIEWER', ['integer',userId,'integer','0','integer','0','integer','18','integer','1'], getMembersCount);
    function getMembersCount(dataSet){
    	var rec = dataSet[0];
    	var cont = 0;

    	for(var idx = 0; idx < dataSet.length; idx++){
            rec = dataSet[idx];
            cont = cont+1;
        }
        if(cont == 1){
            cont = cont-1;
            $('table tbody tr:nth-child(3) td a').attr('href', '#');
        }       

        $('table tbody tr:nth-child(3) td a').prepend('<span>'+cont+'</span>');
        $('table tbody tr:nth-child(3) td a span').addClass('count');

        $('#contenedor').fadeIn(300);
        counter();
        
        //oculta imagen ajax
        $('#mascaraAJAX').fadeOut(300);
        $('#mascaraAJAX').html('');
    }

});

//Contador para digitos del panel de control
function counter(){
	//Contador animado para números
    $('.count').each(function () {
        $(this).prop('Counter',0).animate({
            Counter: $(this).text()
        }, {
            duration: 2000,
            easing: 'swing',
            step: function (now) {
                $(this).text(Math.ceil(now));
            }
        });
    });
}
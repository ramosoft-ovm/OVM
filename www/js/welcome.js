document.addEventListener('DOMContentLoaded', function(){

	//var userId = localStorage.getItem("userIdLocal");
	var userId = 12;
	/*Devuelve los últimos inscritos del usuario que esperan por ser agregados a la RED*/
    queryData('USP_VBC_GET_WAITING_ROOM', ['integer', userId], getWaitingRoom);
    function getWaitingRoom(dataSet){
        var rec = dataSet[0];
        var cont = 0; //console.log(rec);         
        
        //==========VALIDAMOS EL OBJETO QUE NOS DEVUELVE EL QUERYDATA=================//

        if(typeof(rec) == 'undefined'){//Si el objeto viene como undefined, significa que no tiene sala de espera
            //console.log('1');
            cont = 0;
        	$('table tbody tr:nth-child(4) td a').attr('href', '#');
        }else if(rec['dataField0'] == 0){//Si el objeto viene con el item dataField0, significa que éste usuario aún no es agregado a la red del patrocinador
            //console.log('2');
            cont = 0;
            $('table tbody tr:nth-child(4) td a').attr('href', '#');
        }else{//Si el objeto viene cargado con los datos de nuevos RIR'S , significa que el usuario tiene una sala de espera de 'x' miembros
            //console.log('3');
            for(var idx = 0; idx < dataSet.length; idx++){
                rec = dataSet[idx];                
                cont = cont+1;                
            }
        }

        console.log(cont);//Imprimimos contador para pruebas
        $('table tbody tr:nth-child(4) td a').prepend('<span>'+cont+'</span>');
        $('table tbody tr:nth-child(4) td a span').addClass('count'); 
    }

    /*Devuelve la cantidad de miembros que pertencen a la red del usuario */
    queryData('USP_VBC_GET_MATRIX_VIEWER', ['integer',userId,'integer','0','integer','0','integer','18','integer','1'], getMembersCount);
    function getMembersCount(dataSet){
    	var rec = dataSet[0];
    	var cont = 0; console.log(rec);//imprimimos consulta para pruebas

        //================VALIDAMOS EL OBJETO QUE DEVUELVE EL QUERYDATA===============// 

        if(typeof(rec) == 'undefined'){
            $('table tbody tr:nth-child(3) td a').attr('href', '#');
        }else{
            for(var idx = 0; idx < dataSet.length; idx++){
                rec = dataSet[idx];
                cont = cont+1;
            }
            if(cont == 1){//Si el contador es = a 1, significa que el único registro que devuelve el objeto es del mismo usuario, por lo tanto el contador se iguala a 0
                cont = 0;
                $('table tbody tr:nth-child(3) td a').attr('href', '#');
            }
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
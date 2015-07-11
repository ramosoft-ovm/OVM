document.addEventListener('DOMContentLoaded', function() {
	//Variables globales;
	//var userId =  localStorage.getItem('userIdLocal');
    var userId = 12;
	var txtFechaInicial = document.getElementById('txt_fecha_inicial');
    var txtFechaFinal = document.getElementById('txt_fecha_final');
    var btnAnterior = document.getElementById('btn_anterior');
    var btnSiguiente = document.getElementById('btn_siguiente');
    var btnUltimo = document.getElementById('btn_ultimo');
    var btnPrimero = document.getElementById('btn_primero');
    var tipoOrden = document.getElementById('tipo_orden').value;
    var retardo = '';
	//Carga imagen ajax
    showWaitLoader('mascaraAJAX');
	$('#mascaraAJAX').fadeIn(300);

    /////////////////////////////////////////////////////////////
    /****** Cargar Compras Recientes por rango de Fechas *******/
    var rangoActual = new RangosDeFecha();
    rangoActual.getRangoActual();
    txtFechaInicial.value = rangoActual.rangoInicial;
    txtFechaFinal.value = rangoActual.rangoFinal;
    var arguments = [
    	'integer', userId, //ID del usuario
    	'date' , txtFechaInicial.value, //Fecha inicial
    	'date' , txtFechaFinal.value, // fecha final
        'integer' , 0, //PN_ERROR
    	'integer', tipoOrden //Tipo de Orden
    ];
    queryData('USP_VBC_GET_ORDER_LIST', arguments, orderList);

    //FUNCIÓN UTILIZADA PARA CARGAR LOS DATOS DE LAS COMPRAS DE TODOS LOS EVENTOS
    function orderList(dataSet) {
        var rec = dataSet[0];console.log(rec);
        var recT = dataSet.length;
        var text = '';

        var granTotal = 0.00;
        //Compras del Periodo Seleccionado
        if (typeof rec != 'undefined') {            
            for (var idx = 0; idx < recT; idx++){                
                var date = rec['orderDate']; 
                var orderDate = date.substring(0, 10);
            	rec = dataSet[idx];

                //Se calcula el monto total de todas las ordenes de ese periodo
                granTotal = granTotal + parseFloat(rec['orderTotal']);

            	text += '<tr>';
            	//Numero de orden
            	text += '<td>' + rec['orderId'] + '</td>';
            	//Fecha de la Orden
            	text += '<td>' + orderDate + '</td>';
            	//Puntos de la Orden
            	text += '<td>' + rec['pv'].toFixed(2) + '</td>';
                //Total de la Orden
                text += '<td>$ ' + rec['orderTotal'] + '</td>';
            	text += '</tr>';
            }
            text += '<tr class="balance">';
            text += '<td colspan="3" style="text-align:right !important;font-weight:bold">TOTAL DEL PERIODO: </td>';
            text += '<td colspan="1" style="text-align:right !important;font-weight:bold">$ ' + (granTotal).toFixed(2) + '</td>';
            text += '</tr>';
        }
        else {
            //En caso de no encontrar compras en ese periodo
            text += '<tr>';
            text += '<td colspan="4" align="center">No se encontraron compras en el Periodo comprendido del '+txtFechaInicial.value+' al '+txtFechaFinal.value+'</td>';
            text += '</tr>';
        }
        document.getElementById('compras').innerHTML = text;
        //Oculta imágen AJAX
        $('#mascaraAJAX').fadeOut(300);
        $('#mascaraAJAX').html('');
    }
    /******** Fin de carga de Compras *********/
    ////////////////////////////////////////////

    ///////////////////////////////////////////////
    /****** Inicio declaración de Eventos ********/
    btnAnterior.addEventListener('click', function(event) {
        event.preventDefault();
        //Carga imagen ajax para carrito compras catalogo
        showWaitLoader('mascaraAJAX');
        $('#mascaraAJAX').fadeIn(300);

        tipoOrden = document.getElementById('tipo_orden').value;

        var rangoAnterior = new RangosDeFecha(txtFechaInicial.value, txtFechaFinal.value);
        rangoAnterior.getRangoAnterior();
        txtFechaInicial.value = rangoAnterior.rangoInicial;
        txtFechaFinal.value = rangoAnterior.rangoFinal;
    	var arguments = [
    	'integer', userId, //ID del usuario
    	'date' , txtFechaInicial.value, //Fecha inicial
    	'date' , txtFechaFinal.value, // fecha final
        'integer' , 0, // PN_ERROR
    	'integer', tipoOrden //Tipo de Orden
	    ];
	    queryData('USP_VBC_GET_ORDER_LIST', arguments, orderList);
    }, false);
    btnSiguiente.addEventListener('click', function(event) {
        event.preventDefault();
        //Carga imagen ajax para carrito compras catalogo
        showWaitLoader('mascaraAJAX');
        $('#mascaraAJAX').fadeIn(300);

        tipoOrden = document.getElementById('tipo_orden').value;

        var rangoSiguiente = new RangosDeFecha(txtFechaInicial.value, txtFechaFinal.value);
        rangoSiguiente.getRangoSiguiente();
        txtFechaInicial.value = rangoSiguiente.rangoInicial;
        txtFechaFinal.value = rangoSiguiente.rangoFinal;
    	var arguments = [
    	'integer', userId, //ID del usuario
    	'date' , txtFechaInicial.value, //Fecha inicial
    	'date' , txtFechaFinal.value, // fecha final
        'integer' , 0, // PN_ERROR
    	'integer', tipoOrden //Tipo de Orden
	    ];
	    queryData('USP_VBC_GET_ORDER_LIST', arguments, orderList);
    }, false);
    btnUltimo.addEventListener('click', function(event) {
        event.preventDefault();
        //Carga imagen ajax para carrito compras catalogo
        showWaitLoader('mascaraAJAX');
        $('#mascaraAJAX').fadeIn(300);

        tipoOrden = document.getElementById('tipo_orden').value;

        var rangoUltimo = new RangosDeFecha('','','txt_fecha_inicial','txt_fecha_final');
        rangoUltimo.getRangoUltimoCompras();
        setTimeout(function(){queryData('USP_VBC_GET_ORDER_LIST', ['integer',userId,'date',txtFechaInicial.value,'date',txtFechaFinal.value,'integer', 0, 'integer',tipoOrden], orderList)},1500);
    }, false);
    btnPrimero.addEventListener('click', function(event) {
        event.preventDefault();
        //Carga imagen ajax para carrito compras catalogo
        showWaitLoader('mascaraAJAX');
        $('#mascaraAJAX').fadeIn(300);

        tipoOrden = document.getElementById('tipo_orden').value;

        var rangoPrimero = new RangosDeFecha('','','txt_fecha_inicial','txt_fecha_final');
        rangoPrimero.getRangoPrimeroCompras();
        setTimeout(function(){queryData('USP_VBC_GET_ORDER_LIST', ['integer',userId,'date',txtFechaInicial.value,'date',txtFechaFinal.value,'integer', 0, 'integer', tipoOrden], orderList)},1500);
    }, false);
    //Se actualiza con los cambios de oción del select Tipo de Orden
    document.getElementById('tipo_orden').addEventListener('change', function(event) {
        
        event.target.blur();
        //Carga imagen ajax para carrito compras catalogo
        showWaitLoader('mascaraAJAX');
        $('#mascaraAJAX').fadeIn(300);

        tipoOrden = document.getElementById('tipo_orden').value;

        var arguments = [
        'integer', userId, //ID del usuario
        'date' , txtFechaInicial.value, //Fecha inicial
        'date' , txtFechaFinal.value, // fecha final
        'integer' , 0, // PN_ERROR
        'integer', tipoOrden //Tipo de Orden
        ];
        queryData('USP_VBC_GET_ORDER_LIST', arguments, orderList);
    }, false);
    /******** Fin declaración de Eventos *********/
    ///////////////////////////////////////////////
});
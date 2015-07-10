document.addEventListener('DOMContentLoaded', function() {
	//Variables globales;
	//var userId =  localStorage.getItem('userIdLocal');
    var userId = 14;
	var txtFechaInicial = document.getElementById('txt_fecha_inicial');
    var txtFechaFinal = document.getElementById('txt_fecha_final');
    var btnAnterior = document.getElementById('btn_anterior');
    var btnSiguiente = document.getElementById('btn_siguiente');
    var btnUltimo = document.getElementById('btn_ultimo');
    var btnPrimero = document.getElementById('btn_primero')
	//Carga imagen ajax para carrito compras catalogo
    showWaitLoader('mascaraAJAX');
	$('#mascaraAJAX').fadeIn(300);

    ///////////////////////////////////////////////////
    /****** Cargar Balance por rango de fechas *******/
    var rangoActual = new RangosDeFecha();
    rangoActual.getRangoActual();
    txtFechaInicial.value = rangoActual.rangoInicial;
    txtFechaFinal.value = rangoActual.rangoFinal;
    var arguments = [
    	'integer', userId, //ID del usuario
    	'date' , txtFechaInicial.value, //Fecha inicial
    	'date' , txtFechaFinal.value, // fecha final
    	'integer', 0 //PN_ERROR
    ];
    queryData('USP_VBC_GET_BALANCE_HIST', arguments, balance);
    function balance(dataSet) {
        var rec = dataSet[0];
        var recT = dataSet.length;
        var balanceInicial = 0;
        var balanceFinal = 0;
        var balanceFI = '';
        var balanceFF = '';
        var text = '';
        for (var idx = 0; idx < recT; idx++){
        	rec = dataSet[idx];
        	text += '<tr>';
        	//Tipo de balance
        	text += '<td>' + rec['balanceType'] + '</td>';
        	//Número de órden
        	text += '<td>' + rec['reference'] + '</td>';
        	//Monto
        	text += '<td>$' + rec['amount'] + '</td>';
        	text += '</tr>';
            balanceInicial = rec['iniBalance'];
            balanceFinal = rec['endBalance'];
            balanceFI =  rec['iniDate'];
            balanceFF = rec['endDate'];
        }
        //Balance Inicial;
        text += '<tr class="balance">';
        text += '<td colspan="2">Balance Inicial en '+ balanceFI +'</td>';
        text += '<td>$'+balanceInicial+'</td>';
        text += '</tr>';
        //Balance Final;
        text += '<tr class="balance">';
        text += '<td colspan="2">Balance Final en '+ balanceFF +'</td>';
        text += '<td>$'+balanceFinal+'</td>';
        text += '</tr>';
        document.getElementById('balance').innerHTML = text;
        //Oculta imágen AJAX
        $('#mascaraAJAX').fadeOut(300);
        $('#mascaraAJAX').html('');
    }
    /******** Fin de carga de Balance *********/
    ////////////////////////////////////////////

    ///////////////////////////////////////////////
    /****** Inicio declaración de Eventos ********/
    btnAnterior.addEventListener('click', function(event) {
        event.preventDefault();
        //Carga imagen ajax para carrito compras catalogo
        showWaitLoader('mascaraAJAX');
        $('#mascaraAJAX').fadeIn(300);
        var rangoAnterior = new RangosDeFecha(txtFechaInicial.value, txtFechaFinal.value);
        rangoAnterior.getRangoAnterior();
        txtFechaInicial.value = rangoAnterior.rangoInicial;
        txtFechaFinal.value = rangoAnterior.rangoFinal;
    	var arguments = [
    	'integer', userId, //ID del usuario
    	'date' , txtFechaInicial.value, //Fecha inicial
    	'date' , txtFechaFinal.value, // fecha final
    	'integer', 0 //PN_ERROR
	    ];
	    queryData('USP_VBC_GET_BALANCE_HIST', arguments, balance);
    }, false);
    btnSiguiente.addEventListener('click', function(event) {
        event.preventDefault();
        //Carga imagen ajax para carrito compras catalogo
        showWaitLoader('mascaraAJAX');
        $('#mascaraAJAX').fadeIn(300);
        var rangoSiguiente = new RangosDeFecha(txtFechaInicial.value, txtFechaFinal.value);
        rangoSiguiente.getRangoSiguiente();
        txtFechaInicial.value = rangoSiguiente.rangoInicial;
        txtFechaFinal.value = rangoSiguiente.rangoFinal;
    	var arguments = [
    	'integer', userId, //ID del usuario
    	'date' , txtFechaInicial.value, //Fecha inicial
    	'date' , txtFechaFinal.value, // fecha final
    	'integer', 0 //PN_ERROR
	    ];
	    queryData('USP_VBC_GET_BALANCE_HIST', arguments, balance);
    }, false);
    btnUltimo.addEventListener('click', function(event) {
        event.preventDefault();
        //Carga imagen ajax para carrito compras catalogo
        showWaitLoader('mascaraAJAX');
        $('#mascaraAJAX').fadeIn(300);
        var rangoUltimo = new RangosDeFecha('','','txt_fecha_inicial','txt_fecha_final');
        rangoUltimo.getRangoUltimo();
        
        var arguments = [
        'integer', userId, //ID del usuario
        'date' , txtFechaInicial.value, //Fecha inicial
        'date' , txtFechaFinal.value, // fecha final
        'integer', 0 //PN_ERROR
        ];
        queryData('USP_VBC_GET_BALANCE_HIST', arguments, balance);
    }, false);
    btnPrimero.addEventListener('click', function(event) {
        event.preventDefault();
        //Carga imagen ajax para carrito compras catalogo
        showWaitLoader('mascaraAJAX');
        $('#mascaraAJAX').fadeIn(300);
        var rangoPrimero = new RangosDeFecha('','','txt_fecha_inicial','txt_fecha_final');
        rangoPrimero.getRangoPrimero();
        var arguments = [
        'integer', userId, //ID del usuario
        'date' , txtFechaInicial.value, //Fecha inicial
        'date' , txtFechaFinal.value, // fecha final
        'integer', 0 //PN_ERROR
        ];
        queryData('USP_VBC_GET_BALANCE_HIST', arguments, balance);
    }, false);
    /******** Fin declaración de Eventos *********/
    ///////////////////////////////////////////////
});
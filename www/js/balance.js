document.addEventListener('DOMContentLoaded', function() {
	//Variables globales;
	var userId =  localStorage.getItem('userIdLocal');
	var txtFechaInicial = document.getElementById('txt_fecha_inicial');
    var txtFechaFinal = document.getElementById('txt_fecha_final');
    var btnCalcular = document.getElementById('btn_calcular');
    var btnAnterior = document.getElementById('btn_calcular');
    var btnSiguiente = document.getElementById('btn_calcular');
    var btnUltimo = document.getElementById('btn_calcular');
	//Carga imagen ajax para carrito compras catalogo
    showWaitLoader('mascaraAJAX');
	$('#mascaraAJAX').fadeIn(300);

    //Extraer fecha actual
    var date = new Date();
    var mes = date.getMonth()+1;
    var anio = date.getFullYear();
    if (mes < 10){
    	mes = '0' + mes;
    }
    var fechaInicial = anio + '-' + mes + '-01';
    var fechaFinal = anio + '-' + mes + '-31';

    ///////////////////////////////////////////////////
    /****** Cargar Balance por rango de fechas *******/
    txtFechaInicial.value = fechaInicial;
    txtFechaFinal.value = fechaFinal;
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
        var text = '';
        for (var idx = 0; idx < recT; idx++){
        	rec = dataSet[idx];
        	text += '<tr>';
        	//Tipo de balance
        	text += '<td>' + rec['balanceType'] + '</td>';
        	//Número de órden
        	text += '<td>' + rec['reference'] + '</td>';
        	//Monto
        	text += '<td>' + rec['amount'] + '</td>';
        	text += '</tr>';
        }
        document.getElementById('balance').innerHTML = text;
        //Oculta imágen AJAX
        $('#mascaraAJAX').fadeOut(300);
        $('#mascaraAJAX').html('');
    }
    /******** Fin de carga de Balance *********/
    ////////////////////////////////////////////

    ///////////////////////////////////////////////
    /****** Inicio declaración de Eventos ********/
    btnAnterior.addEventListener('click', function() {
    	var arguments = [
    	'integer', userId, //ID del usuario
    	'date' , txtFechaInicial.value, //Fecha inicial
    	'date' , txtFechaFinal.value, // fecha final
    	'integer', 0 //PN_ERROR
	    ];
	    queryData('USP_VBC_GET_BALANCE_HIST', arguments, balance);
    }, false);
    btnSiguiente.addEventListener('click', function() {
    	var arguments = [
    	'integer', userId, //ID del usuario
    	'date' , txtFechaInicial.value, //Fecha inicial
    	'date' , txtFechaFinal.value, // fecha final
    	'integer', 0 //PN_ERROR
	    ];
	    queryData('USP_VBC_GET_BALANCE_HIST', arguments, balance);
    }, false);
    btnUltimo.addEventListener('click', function() {
    	var arguments = [
    	'integer', userId, //ID del usuario
    	'date' , txtFechaInicial.value, //Fecha inicial
    	'date' , txtFechaFinal.value, // fecha final
    	'integer', 0 //PN_ERROR
	    ];
	    queryData('USP_VBC_GET_BALANCE_HIST', arguments, balance);
    }, false);
    btnCalcular.addEventListener('click', function() {
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
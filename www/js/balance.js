document.addEventListener('DOMContentLoaded', function() {
	//Variables globales;
	var userId =  localStorage.getItem('userIdLocal');
    //var userId = 14;
	var txtFechaInicial = document.getElementById('txt_fecha_inicial');
    var txtFechaFinal = document.getElementById('txt_fecha_final');
    var btnAnterior = document.getElementById('btn_anterior');
    var btnSiguiente = document.getElementById('btn_siguiente');
    var btnUltimo = document.getElementById('btn_ultimo');
    var btnPrimero = document.getElementById('btn_primero');
	//Carga imagen ajax para carrito compras catalogo
    showWaitLoader('mascaraAJAX');
	$('#mascaraAJAX').fadeIn(300);
    //////////////////////////////////////////////
    /*********** Cargar Balance Final ***********/
    var arguments = [
        'integer',userId, //ID del usuario
        'integer',0 //ERROR_CODE
    ];
    queryData('USP_VBC_GET_LAST_BALANCE', arguments, lastBalance);
    function lastBalance(dataSet) {
        var rec = dataSet[0];
        
        var arguments = [
            'string' , rec['startDate'], //Fecha inicial
            'integer', userId, //ID del usuario
            'integer', 4, //PN_FLAG
            'integer', 0, //PN_RESULTSET
            'integer', 0 //PN_ERROR
        ];
        queryData('USP_VBC_GET_BALANCE_DATE_RANGE', arguments, balanceRango);
        function balanceRango(dataSet) {
            var rec = dataSet[0];
            txtFechaInicial.value = rec['iniDate'].substring(0,10);
            txtFechaFinal.value = rec['finDate'].substring(0,10);
        }
        arguments[7] = 1 // PN_RESULTSET;
        queryData('USP_VBC_GET_BALANCE_DATE_RANGE', arguments, balance);
        function balance(dataSet) {
            var rec = dataSet[0];
            var recT = dataSet.length;
            var balanceInicial = 0;
            var balanceFinal = 0;
            var balanceFI = '';
            var balanceFF = '';
            var text = '';
            //Balance Inicial;
            if (typeof rec != 'undefined') {
                text = '<tr class="balance" id="balanceIni">';
                text += '<td colspan="2">Balance Inicial en '+ rec['iniDate'] +'</td>';
                text += '<td>$'+rec['iniBalance']+'</td>';
                text += '</tr>';
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
                //Balance Final;
                text += '<tr class="balance">';
                text += '<td colspan="2">Balance Final en '+ balanceFF +'</td>';
                text += '<td>$'+balanceFinal+'</td>';
                text += '</tr>';
            }
            else {
                //Balance Final;
                text += '<tr class="balance">';
                text += '<td colspan="3" align="center">No hay balance entre '+txtFechaInicial.value+' y '+txtFechaFinal.value+'</td>';
                text += '</tr>';
            }
            document.getElementById('balance').innerHTML = text;
            //Oculta imágen AJAX
            $('#mascaraAJAX').fadeOut(300);
            $('#mascaraAJAX').html('');
        }
    }
    /******** Fin de carga de Balance Final *********/
    //////////////////////////////////////////////////

    ///////////////////////////////////////////////
    /****** Inicio declaración de Eventos ********/
/*---------------------------------------------------------------------*/
    btnAnterior.addEventListener('click', function(event) {
        event.preventDefault();
        //Carga imagen ajax para carrito compras catalogo
        showWaitLoader('mascaraAJAX');
        $('#mascaraAJAX').fadeIn(300);
        ///////////////////////////////////////////////////
        /****** Cargar Balance por rango de fechas *******/
        var arguments = [
            'string' , txtFechaInicial.value, //Fecha inicial
            'integer', userId, //ID del usuario
            'integer', 2, //PN_FLAG
            'integer', 0, //PN_RESULTSET
            'integer', 0 //PN_ERROR
        ];
        queryData('USP_VBC_GET_BALANCE_DATE_RANGE', arguments, balanceRango);
        function balanceRango(dataSet) {
            var rec = dataSet[0];
            txtFechaInicial.value = rec['iniDate'].substring(0,10);
            txtFechaFinal.value = rec['finDate'].substring(0,10);
        }
        arguments[7] = 1 // PN_RESULTSET;
        queryData('USP_VBC_GET_BALANCE_DATE_RANGE', arguments, balance);
        function balance(dataSet) {
            var rec = dataSet[0];
            var recT = dataSet.length;
            var balanceInicial = 0;
            var balanceFinal = 0;
            var balanceFI = '';
            var balanceFF = '';
            var text = '';
            //Balance Inicial;
            if (typeof rec != 'undefined') {
                text = '<tr class="balance" id="balanceIni">';
                text += '<td colspan="2">Balance Inicial en '+ rec['iniDate'] +'</td>';
                text += '<td>$'+rec['iniBalance']+'</td>';
                text += '</tr>';
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
                //Balance Final;
                text += '<tr class="balance">';
                text += '<td colspan="2">Balance Final en '+ balanceFF +'</td>';
                text += '<td>$'+balanceFinal+'</td>';
                text += '</tr>';
            }
            else {
                //Balance Final;
                text += '<tr class="balance">';
                text += '<td colspan="3" align="center">No hay balance entre '+txtFechaInicial.value+' y '+txtFechaFinal.value+'</td>';
                text += '</tr>';
            }
            document.getElementById('balance').innerHTML = text;
            //Oculta imágen AJAX
            $('#mascaraAJAX').fadeOut(300);
            $('#mascaraAJAX').html('');
        }
        /******** Fin de carga de Balance *********/
        ////////////////////////////////////////////
    }, false);
/*---------------------------------------------------------------------*/
    btnSiguiente.addEventListener('click', function(event) {
        event.preventDefault();
        //Carga imagen ajax para carrito compras catalogo
        showWaitLoader('mascaraAJAX');
        $('#mascaraAJAX').fadeIn(300);
        ///////////////////////////////////////////////////
        /****** Cargar Balance por rango de fechas *******/
        var arguments = [
            'string' , txtFechaInicial.value, //Fecha inicial
            'integer', userId, //ID del usuario
            'integer', 3, //PN_FLAG
            'integer', 0, //PN_RESULTSET
            'integer', 0 //PN_ERROR
        ];
        queryData('USP_VBC_GET_BALANCE_DATE_RANGE', arguments, balanceRango);
        function balanceRango(dataSet) {
            var rec = dataSet[0];
            txtFechaInicial.value = rec['iniDate'].substring(0,10);
            txtFechaFinal.value = rec['finDate'].substring(0,10);
        }
        arguments[7] = 1 // PN_RESULTSET;
        queryData('USP_VBC_GET_BALANCE_DATE_RANGE', arguments, balance);
        function balance(dataSet) {
            var rec = dataSet[0];
            var recT = dataSet.length;
            var balanceInicial = 0;
            var balanceFinal = 0;
            var balanceFI = '';
            var balanceFF = '';
            var text = '';
            //Balance Inicial;
            if (typeof rec != 'undefined') {
                text = '<tr class="balance" id="balanceIni">';
                text += '<td colspan="2">Balance Inicial en '+ rec['iniDate'] +'</td>';
                text += '<td>$'+rec['iniBalance']+'</td>';
                text += '</tr>';
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
                //Balance Final;
                text += '<tr class="balance">';
                text += '<td colspan="2">Balance Final en '+ balanceFF +'</td>';
                text += '<td>$'+balanceFinal+'</td>';
                text += '</tr>';
            }
            else {
                //Balance Final;
                text += '<tr class="balance">';
                text += '<td colspan="3" align="center">No hay balance entre '+txtFechaInicial.value+' y '+txtFechaFinal.value+'</td>';
                text += '</tr>';
            }
            document.getElementById('balance').innerHTML = text;
            //Oculta imágen AJAX
            $('#mascaraAJAX').fadeOut(300);
            $('#mascaraAJAX').html('');
        }
        /******** Fin de carga de Balance *********/
        ////////////////////////////////////////////
    }, false);
/*---------------------------------------------------------------------*/
    btnUltimo.addEventListener('click', function(event) {
        event.preventDefault();
        //Carga imagen ajax para carrito compras catalogo
        showWaitLoader('mascaraAJAX');
        $('#mascaraAJAX').fadeIn(300);
        ///////////////////////////////////////////////////
        /****** Cargar Balance por rango de fechas *******/
        var arguments = [
            'integer',localStorage.getItem('userIdLocal'), //ID del usuario
            'integer',0 //ERROR_CODE
        ];
        queryData('USP_VBC_GET_LAST_BALANCE', arguments, lastBalance);
    }, false);
    
    btnPrimero.addEventListener('click', function(event) {
        event.preventDefault();
        //Carga imagen ajax para carrito compras catalogo
        showWaitLoader('mascaraAJAX');
        $('#mascaraAJAX').fadeIn(300);
        ///////////////////////////////////////////////////
        /****** Cargar Balance por rango de fechas *******/
        var arguments = [
            'integer',localStorage.getItem('userIdLocal'), //ID del usuario
            'integer',0 //ERROR_CODE
        ];
        queryData('USP_VBC_GET_FIRST_BALANCE', arguments, lastBalance);
        function lastBalance(dataSet) {
            var rec = dataSet[0];
            
            var arguments = [
                'string' , rec['startDate'], //Fecha inicial
                'integer', userId, //ID del usuario
                'integer', 1, //PN_FLAG
                'integer', 0, //PN_RESULTSET
                'integer', 0 //PN_ERROR
            ];
            queryData('USP_VBC_GET_BALANCE_DATE_RANGE', arguments, balanceRango);
            function balanceRango(dataSet) {
                var rec = dataSet[0];
                txtFechaInicial.value = rec['iniDate'].substring(0,10);
                txtFechaFinal.value = rec['finDate'].substring(0,10);
            }
            arguments[7] = 1 // PN_RESULTSET;
            queryData('USP_VBC_GET_BALANCE_DATE_RANGE', arguments, balance);
            function balance(dataSet) {
                var rec = dataSet[0];
                var recT = dataSet.length;
                var balanceInicial = 0;
                var balanceFinal = 0;
                var balanceFI = '';
                var balanceFF = '';
                var text = '';
                //Balance Inicial;
                if (typeof rec != 'undefined') {
                    text = '<tr class="balance" id="balanceIni">';
                    text += '<td colspan="2">Balance Inicial en '+ rec['iniDate'] +'</td>';
                    text += '<td>$'+rec['iniBalance']+'</td>';
                    text += '</tr>';
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
                    //Balance Final;
                    text += '<tr class="balance">';
                    text += '<td colspan="2">Balance Final en '+ balanceFF +'</td>';
                    text += '<td>$'+balanceFinal+'</td>';
                    text += '</tr>';
                }
                else {
                    //Balance Final;
                    text += '<tr class="balance">';
                    text += '<td colspan="3" align="center">No hay balance entre '+txtFechaInicial.value+' y '+txtFechaFinal.value+'</td>';
                    text += '</tr>';
                }
                document.getElementById('balance').innerHTML = text;
                //Oculta imágen AJAX
                $('#mascaraAJAX').fadeOut(300);
                $('#mascaraAJAX').html('');
            }
        }
        /******** Fin de carga de Balance *********/
        ////////////////////////////////////////////
    }, false);
    /******** Fin declaración de Eventos *********/
    ///////////////////////////////////////////////
});
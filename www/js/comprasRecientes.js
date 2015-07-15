document.addEventListener('DOMContentLoaded', function() {
	//Variables globales;
	var userId =  localStorage.getItem('userIdLocal');
    //var userId = 12;
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
    var arguments = [
    	'integer', userId, //ID del usuario
    	'integer' , 0 //PN_ERROR
    ];
    queryData('USP_VBC_GET_LAST_ORDER', arguments, lastOrder);
    function lastOrder(dataSet) {
        var rec = dataSet[0];
        var arguments = [
            'string', rec['startDate'], //Fecha de la última orden
            'integer', tipoOrden, //Tipo de Orden que se mostrará
            'integer', userId, //Id de usuario
            'integer', 4, //@PN_FLAG
            'integer', 0, //@PN_RESULT_SET
            'integer', 0 //@PN_ERROR
        ];
        queryData('USP_VBC_GET_ORDER_LIST_DATE_RANGE', arguments, orderListRange);
        function orderListRange(dataSet) {
            var rec = dataSet[0];
            txtFechaInicial.value = rec['iniDate'].substring(0,10);
            txtFechaFinal.value = rec['finDate'].substring(0,10);
        }
        arguments[9] = 1;
        queryData('USP_VBC_GET_ORDER_LIST_DATE_RANGE', arguments, orderList);
        function orderList(dataSet){
            var rec = dataSet[0];
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

         ///////////////////////////////////////////////////
        /****** Cargar Compras Recientes por rango de fechas *******/
        var arguments = [
            'string', txtFechaInicial.value, //Fecha de la última orden
            'integer', tipoOrden, //Tipo de Orden que se mostrará
            'integer', userId, //Id de usuario
            'integer', 2, //@PN_FLAG
            'integer', 0, //@PN_RESULT_SET
            'integer', 0 //@PN_ERROR
        ];
        queryData('USP_VBC_GET_ORDER_LIST_DATE_RANGE', arguments, orderListRange);
        function orderListRange(dataSet) {
            var rec = dataSet[0];
            txtFechaInicial.value = rec['iniDate'].substring(0,10);
            txtFechaFinal.value = rec['finDate'].substring(0,10);
        }
        arguments[9] = 1 // PN_RESULTSET;
        queryData('USP_VBC_GET_ORDER_LIST_DATE_RANGE', arguments, orderList);
        function orderList(dataSet) {
            var rec = dataSet[0];
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
        /******** Fin de Compras Recientes de Balance *********/
        ////////////////////////////////////////////
    }, false);
    btnSiguiente.addEventListener('click', function(event) {
        event.preventDefault();
        //Carga imagen ajax para carrito compras catalogo
        showWaitLoader('mascaraAJAX');
        $('#mascaraAJAX').fadeIn(300);

        tipoOrden = document.getElementById('tipo_orden').value;

         ///////////////////////////////////////////////////
        /****** Cargar Balance por rango de fechas *******/
        var arguments = [
            'string', txtFechaInicial.value, //Fecha de la última orden
            'integer', tipoOrden, //Tipo de Orden que se mostrará
            'integer', userId, //Id de usuario
            'integer', 3, //@PN_FLAG
            'integer', 0, //@PN_RESULT_SET
            'integer', 0 //@PN_ERROR
        ];
        queryData('USP_VBC_GET_ORDER_LIST_DATE_RANGE', arguments, orderListRange);
        function orderListRange(dataSet) {
            var rec = dataSet[0];
            txtFechaInicial.value = rec['iniDate'].substring(0,10);
            txtFechaFinal.value = rec['finDate'].substring(0,10);
        }
        arguments[9] = 1 // PN_RESULTSET;
        queryData('USP_VBC_GET_ORDER_LIST_DATE_RANGE', arguments, orderList);
        function orderList(dataSet) {
            var rec = dataSet[0];
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
        /******** Fin de carga de Balance *********/
        ////////////////////////////////////////////
    }, false);
    btnUltimo.addEventListener('click', function(event) {
        event.preventDefault();
        //Carga imagen ajax para carrito compras catalogo
        showWaitLoader('mascaraAJAX');
        $('#mascaraAJAX').fadeIn(300);

        tipoOrden = document.getElementById('tipo_orden').value;

        /////////////////////////////////////////////////////////////
        /****** Cargar Compras Recientes por rango de Fechas *******/    
        var arguments = [
            'integer', userId, //ID del usuario
            'integer' , 0 //PN_ERROR
        ];
        queryData('USP_VBC_GET_LAST_ORDER', arguments, lastOrder);
    }, false);
    btnPrimero.addEventListener('click', function(event) {
        event.preventDefault();
        //Carga imagen ajax para carrito compras catalogo
        showWaitLoader('mascaraAJAX');
        $('#mascaraAJAX').fadeIn(300);

        /////////////////////////////////////////////////////////////
        /****** Cargar Compras Recientes por rango de Fechas *******/    
        var arguments = [
            'integer', userId, //ID del usuario
            'integer' , 0 //PN_ERROR
        ];
        queryData('USP_VBC_GET_FIRST_ORDER', arguments, firstOrder);
        function firstOrder(dataSet) {
            var rec = dataSet[0];
            var arguments = [
                'string', rec['startDate'], //Fecha de la última orden
                'integer', tipoOrden, //Tipo de Orden que se mostrará
                'integer', userId, //Id de usuario
                'integer', 1, //@PN_FLAG
                'integer', 0, //@PN_RESULT_SET
                'integer', 0 //@PN_ERROR
            ];
            queryData('USP_VBC_GET_ORDER_LIST_DATE_RANGE', arguments, orderListRange);
            function orderListRange(dataSet) {
                var rec = dataSet[0];
                txtFechaInicial.value = rec['iniDate'].substring(0,10);
                txtFechaFinal.value = rec['finDate'].substring(0,10);
            }
            arguments[9] = 1;
            queryData('USP_VBC_GET_ORDER_LIST_DATE_RANGE', arguments, orderList);
            function orderList(dataSet){
                var rec = dataSet[0];
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

        }
        /******** Fin de carga de Compras *********/
        ////////////////////////////////////////////
    }, false);
    //Se actualiza con los cambios de oción del select Tipo de Orden
    document.getElementById('tipo_orden').addEventListener('change', function(event) {
        
        event.target.blur();
        //Carga imagen ajax para carrito compras catalogo
        showWaitLoader('mascaraAJAX');
        $('#mascaraAJAX').fadeIn(300);

        tipoOrden = document.getElementById('tipo_orden').value;

        /////////////////////////////////////////////////////////////
        /****** Cargar Compras Recientes por rango de Fechas *******/ 
        var arguments = [
            'string', txtFechaInicial.value, //Fecha de la última orden
            'integer', tipoOrden, //Tipo de Orden que se mostrará
            'integer', userId, //Id de usuario
            'integer', 4, //@PN_FLAG
            'integer', 0, //@PN_RESULT_SET
            'integer', 0 //@PN_ERROR
        ];
        queryData('USP_VBC_GET_ORDER_LIST_DATE_RANGE', arguments, orderListRange);
        function orderListRange(dataSet) {
            var rec = dataSet[0];
            txtFechaInicial.value = rec['iniDate'].substring(0,10);
            txtFechaFinal.value = rec['finDate'].substring(0,10);
        }
        arguments[9] = 1;
        queryData('USP_VBC_GET_ORDER_LIST_DATE_RANGE', arguments, orderList);
        function orderList(dataSet){
            var rec = dataSet[0];
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
    }, false);
    /******** Fin declaración de Eventos *********/
    ///////////////////////////////////////////////
});
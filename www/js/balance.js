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






/*function RangosDeFecha(fechaIni, fechaFin) {
        //Declaración de variables
        var that = this;
        var date = new Date();
        that.rangoInicial = '';
        that.rangoFinal = '';

        //Verifica si existen parametros
        if (typeof fechaIni != 'undefined' && typeof fechaFin != 'undefined') {
            this.fechaIni = fechaIni.split('-');
            this.fechaFin = fechaFin.split('-');
            //Fecha inicial
            that.diaIni = this.fechaIni[2];
            that.mesIni = this.fechaIni[1];
            that.añoIni = this.fechaIni[0];
            //Fecha Final
            that.diaFin = this.fechaFin[2];
            that.mesFin = this.fechaFin[1];
            that.añoFin = this.fechaFin[0];
        }

        that.getRangoActual = function() {
            var mes = date.getMonth() + 1;
            var año = date.getFullYear();
            mes = that.corregir(mes);
            that.rangoInicial = año + '-' + mes + '-' + '01'
            that.rangoFinal = año + '-' + mes + '-' + '31';
        }
        that.getRangoAnterior = function() {
            if (that.mesIni <= 1) {
                that.mesIni = 12
                that.añoIni = parseInt(that.añoIni) - 1;
            }
            else {
                that.mesIni = parseInt(that.mesIni) - 1;
            }
            if (that.mesFin <= 1) {
                that.mesFin = 12
                that.añoFin = parseInt(that.añoFin) - 1;
            }
            else {
                that.mesFin = parseInt(that.mesFin) - 1;
            }
            that.mesIni = that.corregir(that.mesIni);
            that.rangoInicial = that.añoIni + '-' + that.mesIni + '-' + that.diaIni;
            that.mesFin = that.corregir(that.mesFin);
            that.rangoFinal = that.añoFin + '-' + that.mesFin + '-' + that.diaFin;
        }
        that.getRangoSiguiente = function() {
            if (that.mesIni > 11) {
                that.mesIni = 1;
                that.añoIni = that.añoIni + 1;
            }
            else {
                that.mesIni = parseInt(that.mesIni) + 1;
            }
            if (that.mesFin > 11) {
                that.mesFin = 1;
                that.añoFin = parseInt(that.añoFin) + 1;
            }
            else {
                that.mesFin = parseInt(that.mesFin) + 1;
            }
            that.mesIni = that.corregir(that.mesIni);
            that.rangoInicial = that.añoIni + '-' + that.mesIni + '-' + that.diaIni;
            that.mesFin = that.corregir(that.mesFin);
            that.rangoFinal = that.añoFin + '-' + that.mesFin + '-' + that.diaFin;
        }
        that.corregir = function(mes) {
            this.mes = parseInt(mes);
            if (this.mes < 10){
                this.mes = '0' + this.mes;
            }
            return this.mes;
        }
        that.añoBiciesto = function(año) {
            if ((((año%100)!=0)&&((año%4)==0))||((año%400)==0)){
                return true;
            }
            return false
        }
    }*/
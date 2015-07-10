//Calcula Fechas
function RangosDeFecha(fechaIni, fechaFin,txtAnterior,txtSiguiente) {
    //Declaración de variables
    var that = this;
    var date = new Date();
    that.rangoInicial = '';
    that.rangoFinal = '';
    that.txtFechaInicial = document.getElementById(txtAnterior);
    that.txtFechaFinal = document.getElementById(txtSiguiente);

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
        that.rangoFinal = año + '-' + mes + '-' + calcularDia(mes);
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
        that.rangoFinal = that.añoFin + '-' + that.mesFin + '-' + calcularDia(that.mesFin);
    }
    that.getRangoSiguiente = function() {
        if (that.mesIni > 11) {
            that.mesIni = 1;
            that.añoIni = parseInt(that.añoIni) + 1;
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
        that.rangoFinal = that.añoFin + '-' + that.mesFin + '-' + calcularDia(that.mesFin);
    }
    that.getRangoPrimero = function() {
        var arguments = [
            'integer',localStorage.getItem('userIdLocal'), //ID del usuario
            'integer',0 //ERROR_CODE
        ];
        queryData('USP_VBC_GET_FIRST_BALANCE', arguments, procedimiento);
    }
    that.getRangoUltimo = function() {
        var arguments = [
            'integer',localStorage.getItem('userIdLocal'), //ID del usuario
            'integer',0 //ERROR_CODE
        ];
        queryData('USP_VBC_GET_LAST_BALANCE', arguments, procedimiento);
    }
    that.corregir = function(mes) {
        this.mes = parseInt(mes);
        if (this.mes < 10){
            this.mes = '0' + this.mes;
        }
        return this.mes;
    }
    var añoBiciesto = function(año) {
        if ((((año%100)!=0)&&((año%4)==0))||((año%400)==0)){
            return true;
        }
        return false;
    }
    var calcularDia =  function(mes){
        var dias = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
        if (añoBiciesto(that.añoFin)) {
            dias[1] = 29;
        }
        return dias[parseInt(mes)-1]
    }
    var procedimiento = function(dataSet) {
        var rec = dataSet[0];
        var result = rec['startDate'];
        var fecha = rec['startDate'];
        var dia = '';
        var mes = '';
        var año = '';
        result = result.substring(0,3);
        result = parseInt(result);
        if (result > 31) {
            fecha = fecha.substring(0,10);
            Debug('if: ' + fecha);
        }
        else {
            fecha = fecha.split(' ');
            dia = fecha[0];
            mes = fecha[1];
            año = fecha[2];
            switch(mes){
                case 'Jan':
                    mes = '01';
                    break;
                case 'Feb':
                    mes = '02';
                    break;
                case 'Mar':
                    mes = '03';
                    break;
                case 'Apr':
                    mes = '04';
                    break;
                case 'May':
                    mes = '05';
                    break;
                case 'Jun':
                    mes = '06';
                    break;
                case 'Jul':
                    mes = '07';
                    break;
                case 'Aug':
                    mes = '08';
                    break;
                case 'Sep':
                    mes = '09';
                    break;
                case 'Oct':
                    mes = '10';
                    break;
                case 'Nov':
                    mes = '11';
                    break;
                case 'Dic':
                    mes = '12';
                    break;
            }
            fecha = año+'-'+mes+'-'+dia;
            Debug('case: ' + fecha);
        }
        fecha = fecha.split('-');
        año = fecha[0];
        mes = fecha[1];
        dia = calcularDia(mes);
        mes =  that.corregir(mes);
        that.rangoInicial = año + '-' + mes + '-01';
        that.rangoFinal = año + '-' + mes + '-' + dia;
        that.txtFechaInicial.value = that.rangoInicial;
        that.txtFechaFinal.value = that.rangoFinal;
    }
}
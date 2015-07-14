//Calcula Fechas
function RangosDeFecha(fechaIni) {
    //Declaración de variables
    var that = this;
    var fechaIni =  fechaIni;
    var date = new Date();
    that.rangoInicial = '';
    that.rangoFinal = '';


    that.getRangoActual = function() {
        var mes = date.getMonth() + 1;
        var año = date.getFullYear();
        mes = that.corregir(mes);
        that.rangoInicial = año + '-' + mes + '-' + '01'
        that.rangoFinal = año + '-' + mes + '-' + calcularDia(parseInt(mes), parseInt(año));
    }
    that.getRangoAnterior = function() {
        fechaIni = fechaIni.split('-');
        var año = parseInt(fechaIni.substring(0,4));
        var mes = parseInt(fechaIni.substring(5,7));
        var dia = parseInt(fechaIni.substring(8,10));

        switch(mes) {
            case 1:
                mes = 12;
                año = año-1;
                break;
            case 2:
                mes = 1;
                break;
            case 3:
                mes = 2;
                break;
            case 4:
                mes = 3;
                break;
            case 5:
                mes = 4;
                break;
            case 6:
                mes = 5;
                break;
            case 7:
                mes = 6;
                break;
            case 8:
                mes = 7;
                break;
            case 9:
                mes = 8;
                break;
            case 10:
                mes = 9;
                break;
            case 11:
                mes = 10;
                break;
            case 12:
                mes = 11;
                break;
        }

        dia = calcularDia(mes,año);

        that.rangoInicial = año + '-' + that.corregir(mes) + '-01';
        that.rangoFinal = año + '-' + that.corregir(mes) + '-' + dia;
    }
    that.getRangoSiguiente = function() {
        fechaIni
        var año = parseInt(fechaIni.substring(0,4));
        var mes = parseInt(fechaIni.substring(5,7));
        var dia = parseInt(fechaIni.substring(8,10));
        alert(año+','+mes+','+dia);
        switch(mes) {
            case 1:
                mes = 2;
                break;
            case 2:
                mes = 3;
                break;
            case 3:
                mes = 4;
                break;
            case 4:
                mes = 5;
                break;
            case 5:
                mes = 6;
                break;
            case 6:
                mes = 7;
                break;
            case 7:
                mes = 8;
                break;
            case 8:
                mes = 9;
                break;
            case 9:
                mes = 10;
                break;
            case 10:
                mes = 11;
                break;
            case 11:
                mes = 12;
                break;
            case 12:
                mes = 1;
                año = año + 1;
                break;
        }

        dia = calcularDia(mes,año);
        that.rangoInicial = año + '-' + that.corregir(mes) + '-01';
        that.rangoFinal = año + '-' + that.corregir(mes) + '-' + dia;
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
    that.getRangoPrimeroCompras = function() {
        var arguments = [
            'integer',localStorage.getItem('userIdLocal'), //ID del usuario
            'integer',0 //ERROR_CODE
        ];
        queryData('USP_VBC_GET_FIRST_ORDER', arguments, procedimiento);
    }
    that.getRangoUltimoCompras = function() {
        var arguments = [
            'integer',localStorage.getItem('userIdLocal'), //ID del usuario
            'integer',0 //ERROR_CODE
        ];
        queryData('USP_VBC_GET_LAST_ORDER', arguments, procedimiento);
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
    var calcularDia =  function(mes, año){
        var dias = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
        if (añoBiciesto(año)) {
            return 29;
        }
        else {
            return dias[mes-1];
        }
    }
    var procedimiento = function(dataSet) {
        var rec = dataSet[0];console.log(rec);
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
        año = parseInt(fecha[0]);
        mes = parseInt(fecha[1]);
        dia = calcularDia(parseInt(mes));
        mes =  that.corregir(parseInt(mes));
        that.rangoInicial = año + '-' + mes + '-01';
        that.rangoFinal = año + '-' + mes + '-' + dia;
    }
}



/*SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- =============================================
-- Author:      <DIEGO, ACOSTA>
-- Create date: <13 DE JULIO DE 2016>
-- Description: <CALCULA RANGO DE FECHAS SEGÚN EL MES Y EL AÑO>
-- =============================================
ALTER FUNCTION [dbo].[FN_ACOSTA_GET_DATE_RANGE](@PS_INI_DATE nvarchar(20))
RETURNS @INFO TABLE(
    INI_DATE datetime,
    FIN_DATE datetime,
    TOTAL_DAYS int
) 
AS
BEGIN
    --SE DECLARAN VARIABLES LOCALES A CALCULAR--
    DECLARE
        @LD_INI_DATE nvarchar(20),
        @LD_INI_DATE2 datetime,
        @LD_FIN_DATE datetime,
        @LN_DAYS int


    --SÍ LA CADENA CONTIENE ESPACIO SIGNIFICA QUE ES DEL TIPO '26 AUG 2015' Y HAY QUE CONVERTIRLA A '2015-08-26'--
    IF NOT SUBSTRING(@PS_INI_DATE,3,1) = ' '
        BEGIN
            --SE CALCULA FECHA INICIAL DEL MES--
            SET @LD_INI_DATE = SUBSTRING(@PS_INI_DATE,0,5) + SUBSTRING(@PS_INI_DATE,6,2) + '01'

            --CONVIERTE LA CADENA EN UN DATETIME--
            SET @LD_INI_DATE2 = CONVERT(datetime, @LD_INI_DATE)

            --SE ASIGNA 1 MES COMO DIFERENCIA --
            SET @LD_FIN_DATE = DATEADD(mm,1,@LD_INI_DATE2)

            --SE CALCULAN LOS DÍAS QUE TIENE EL MES SOLICITADO--
            SET @LN_DAYS = DATEDIFF(dd,@LD_INI_DATE2,@LD_FIN_DATE)

            --SE ASIGNA LA FECHA FINAL DEL RANGO TOMANDO EN CUENTA EL MES, EL AÑO Y LOS DÍAS QUE TIENE ESE MES--
            SET @LD_FIN_DATE = DATEADD(ss,-1,@LD_FIN_DATE);--ultimo dia


            INSERT INTO @INFO(INI_DATE, FIN_DATE, TOTAL_DAYS)
                    VALUES(@LD_INI_DATE2, @LD_FIN_DATE, @LN_DAYS)
        END
    ELSE
        BEGIN
            DECLARE
                @LS_DAY nvarchar(4),
                @LS_MONTH nvarchar(15),
                @LS_YEAR nvarchar(6)

            --SE ESTABLECE EL DÍA DE LA FECHA--
            SET @LS_DAY = '01'
            --SE ESTALEBE EL AÑO DE LA FECHA--
            SET @LS_YEAR = SUBSTRING(@PS_INI_DATE,8,4)          
            --SE ESTABLECE EL MES DE LA FECHA DEL TIPO 'AUG' Y SE CONVIERTE AL TIPO '08'--
            SET @LS_MONTH = (
                CASE 
                    WHEN SUBSTRING(@PS_INI_DATE,4,3) = 'Jan' THEN '01'
                    WHEN SUBSTRING(@PS_INI_DATE,4,3) = 'Feb' THEN '02'
                    WHEN SUBSTRING(@PS_INI_DATE,4,3) = 'Mar' THEN '03'
                    WHEN SUBSTRING(@PS_INI_DATE,4,3) = 'Apr' THEN '04'
                    WHEN SUBSTRING(@PS_INI_DATE,4,3) = 'May' THEN '05'
                    WHEN SUBSTRING(@PS_INI_DATE,4,3) = 'Jun' THEN '06'
                    WHEN SUBSTRING(@PS_INI_DATE,4,3) = 'Jul' THEN '07'
                    WHEN SUBSTRING(@PS_INI_DATE,4,3) = 'Aug' THEN '08'
                    WHEN SUBSTRING(@PS_INI_DATE,4,3) = 'Sep' THEN '09'
                    WHEN SUBSTRING(@PS_INI_DATE,4,3) = 'Oct' THEN '10'
                    WHEN SUBSTRING(@PS_INI_DATE,4,3) = 'Nov' THEN '11'
                    WHEN SUBSTRING(@PS_INI_DATE,4,3) = 'Dic' THEN '12'
                END         
            )

            --SE CALCULA FECHA INICIAL DEL MES--
            SET @LD_INI_DATE = @LS_YEAR + @LS_MONTH + @LS_DAY

            --CONVIERTE LA CADENA EN UN DATETIME--
            SET @LD_INI_DATE2 = CONVERT(datetime, @LD_INI_DATE)

            --SE ASIGNA 1 MES COMO DIFERENCIA --
            SET @LD_FIN_DATE = DATEADD(mm,1,@LD_INI_DATE2)

            --SE CALCULAN LOS DÍAS QUE TIENE EL MES SOLICITADO--
            SET @LN_DAYS = DATEDIFF(dd,@LD_INI_DATE2,@LD_FIN_DATE)

            --SE ASIGNA LA FECHA FINAL DEL RANGO TOMANDO EN CUENTA EL MES, EL AÑO Y LOS DÍAS QUE TIENE ESE MES--
            SET @LD_FIN_DATE = DATEADD(ss,-1,@LD_FIN_DATE);--ultimo dia


            INSERT INTO @INFO(INI_DATE, FIN_DATE, TOTAL_DAYS)
                    VALUES(@LD_INI_DATE2, @LD_FIN_DATE, @LN_DAYS)

        END
    

    RETURN
END*/

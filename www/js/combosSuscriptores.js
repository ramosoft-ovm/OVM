//Evento que se dispara cuando inicia la carga de la página
window.addEventListener('load', function(){

    //Carga imagen ajax
    showWaitLoader('mascaraAJAX');
    $('#mascaraAJAX').fadeIn(300);

    //Se quita el foco a todos los elementos SELECT
    $('select').change(function(event) {
        /* Act on the event */
        event.target.blur();
    });

    //Se almacena localmente valor del Combo Centro Aurorizado y se carga abre Cuadro de Dialogo Direciones
    $('#btnDireccion').click(function() {
        /* Act on the event */


        //Capturo el valor de los campos a través de su id
        var rfc = $('#txtRFC').val();
        var curp = $('#txtCURP').val();
        var nombre = $('#txtNombre').val();
        var apePat = $('#txtApePat').val();
        var apeMat = $('#txtApeMat').val();
        var dia = $('#dia').val();
        var mes = $('#mes').val();
        var ano = $('#ano').val();
        var lugarNacimiento = $('#txtLugarNacimiento').val();
        var sexo = $('#sexo').val();
        var telefono = $('#txtTelefono').val();
        var email = $('#txtEmail').val();
        var kit = $('#kit').val();
        var codigoAutorizacion = $('#txtCodigo').val();
        var metodoEnvio = $('#metodoEnvio').val();
        var centroAutorizado = $('#centroAutorizado').val();
        var paqueteria = $('#paqueteria').val();
        var metodoPago = $('#metodoPago').val();
        //Se crea una variable para almacenar cadena para el array
        var cadena = "";
        //Se guarda toda la cadena
        //Se agrega "," para utilizarlo de escape al convertirlo en array
        cadena += rfc + "\",";
        cadena += "\"" + curp + "\",";
        cadena += "\"" + nombre + "\",";
        cadena += "\"" + apePat + "\",";
        cadena += "\"" + apeMat + "\",";
        cadena += "\"" + dia + "\",";
        cadena += "\"" + mes + "\",";
        cadena += "\"" + ano + "\",";
        cadena += "\"" + lugarNacimiento + "\",";
        cadena += "\"" + sexo + "\",";
        cadena += "\"" + telefono + "\",";
        cadena += "\"" + email + "\",";
        cadena += "\"" + kit + "\",";
        if(kit == 'PAQ1000MX' || kit == 'PAQ1001MX' || kit == 'PAQ1002MX' || kit == 'PAQ1003MX' || kit == 'PAQ1004MX'){
            cadena += "\"" + codigoAutorizacion + "\",";
        }    
        cadena += "\"" + metodoEnvio + "\",";
        if(metodoEnvio == 1){
            cadena += "\"" + centroAutorizado + "\",";
        }else if(metodoEnvio == 2){ 
            cadena += "\"" + paqueteria + "\",";
        }       
        cadena += "\"" + metodoPago;
        
        //Si existe previamente ese variable local la elimina para cargarla de nuevo
        if(localStorage.getItem('susc2Local')){
            localStorage.removeItem('susc2Local');
        }
        //Se almacena localmente el valor del array en una variable local
        localStorage.setItem('susc2Local' ,cadena);


        /*var centroAutorizadoVal = $('#centroAutorizado').val();
       localStorage.setItem("centroAutorizadoValLocal", centroAutorizadoVal);*/
       
       window.location.href = "cuadroDialogoDireccion.html?idCentroAutorizado="+centroAutorizado;
    });  

    /*Devuelve conjunto de datos y carga SELECT de KITS con los datos obtenidos*/
    queryData('USP_VBC_GET_ITEMS_KITS', ['integer', '4'], fillKits);

    function fillKits(dataSet){
        var rec = dataSet[0];
        var text = '';

        for(var idx = 0; idx < dataSet.length; idx++){
            rec = dataSet[idx];
            text += '<option value="'+ rec["itemCode"] +'">'+ rec["description"] +'</option>';
        };

        $('#kit').html(text);

        var extraer = localStorage.getItem("susc2Local");
        var ResArray = extraer.split('","');

        $('#kit').val(ResArray[12]);
        if($('#kit').val() == 'PAQ1000MX' || $('#kit').val() == 'PAQ1001MX' || $('#kit').val() == 'PAQ1002MX' ||
         $('#kit').val() == 'PAQ1003MX' || $('#kit').val() == 'PAQ1004MX'){

            $('tr#codigoAutorizacion').show(200);

            $('#txtCodigo').val(ResArray[13]);                
                            
        }

    }   

    /*Devuelve conjunto de datos y carga SELECT de METODOS DE ENVÍO con los datos obtenidos*/
    queryData('USP_VBC_GET_SHIPMENT_METHODS', ['integer', '', 'integer', '4'], fillShipmentMethods);

    function fillShipmentMethods(dataSet){
        var rec = dataSet[0];
        var text = '';

        for(var idx = 0; idx < dataSet.length; idx++){
            rec = dataSet[idx];
            text += '<option value="'+ rec["shipMethodId"] +'">'+ rec["name"] +'</option>';
        };

        $('#metodoEnvio').append(text);

        var extraer = localStorage.getItem("susc2Local");
        var ResArray = extraer.split('","'); 

        if(ResArray.length == 17){
            $('#metodoEnvio').val(ResArray[14]);

            if($('#metodoEnvio').val() == 1){
                $('tr#centroAutorizadoTr').show(200);
            }else{
                $('tr#paqueteriaTr').show(200);
            }
        }else{
            $('#metodoEnvio').val(ResArray[13]);

            if($('#metodoEnvio').val() == 1){
                $('tr#centroAutorizadoTr').show(200);
            }else{
                $('tr#paqueteriaTr').show(200);
            }
        }
    }       

    /*Devuelve conjunto de datos y carga SELECT de METODOS DE ENVÍO con los datos obtenidos*/
    queryData('USP_VBC_GET_WAREHOUSE_BY_COUNTRY', ['integer', '4'], fillWarehouses);

    function fillWarehouses(dataSet){
        var rec = dataSet[0];
        var text = '';

        for(var idx = 0; idx < dataSet.length; idx++){
            rec = dataSet[idx];
            text += '<option value="'+ rec["warehouseId"] +'">'+ rec["description"] +'</option>';
        };

        //oculta imagen ajax
        $('#mascaraAJAX').fadeOut(300);
        $('#mascaraAJAX').html('');

        $('#centroAutorizado').append(text);    

        var extraer = localStorage.getItem("susc2Local");
        var ResArray = extraer.split('","');           

        if(ResArray.length == 17){
            $('#centroAutorizado').val(ResArray[15])
        }else{
            $('#centroAutorizado').val(ResArray[14])
        }        
    }

    /*Devuelve conjunto de datos y carga SELECT de PAQUETERÍAS con los datos obtenidos*/
    queryData('USP_VBC_GET_CARRIERS', ['integer', '4'], fillCarriers);

    function fillCarriers(dataSet){
        var rec = dataSet[0];
        var text = '';

        for(var idx = 0; idx < dataSet.length; idx++){
            rec = dataSet[idx];
            text += '<option value="'+ rec["carrierId"] +'">'+ rec["description"] +'</option>';
        };

        $('#paqueteria').html(text);
    }

    /*Devuelve conjunto de datos y carga SELECT de MÉTODO DE PAGO con los datos obtenidos*/
    queryData('USP_VBC_GET_PAY_METHOD', ['integer', '1', 'integer', '4'], fillPayMethod);

    function fillPayMethod(dataSet){
        var rec = dataSet[0];
        var text = '';                

        for(var idx = 0; idx < dataSet.length; idx++){
            rec = dataSet[idx];
            text += '<option value="'+ rec["payMethodId"] +'">'+ rec["description"] +'</option>';
        };    

        $('#metodoPago').html(text);

        var extraer = localStorage.getItem("susc2Local");
        var ResArray = extraer.split('","');  

        if(ResArray.length == 17){
            $('#metodoPago').val(ResArray[16])
        }else{
            $('#metodoPago').val(ResArray[15])
        }     
    }

});

function fillDay(){
    var text = "";
    for(var cont = 1; cont <= 31; cont++){
        if(cont < 10){
            text += '<option value="0'+ cont +'">0'+ cont +'</option>';
        }else{
            text += '<option value="'+ cont +'">'+ cont +'</option>';
        }
    }
    $('#dia').append(text);
}

function fillMonth(){
    var text = "";
    for(var cont = 1; cont <= 12; cont++){
        if(cont < 10){
            text += '<option value="0'+ cont +'">0'+ cont +'</option>';
        }else{
            text += '<option value="'+ cont +'">'+ cont +'</option>';
        }
    }
    $('#mes').append(text);
}

function fillYear(){
    var text = "";
    for(var cont = 1930; cont <= 2000; cont++){
        text += '<option value="'+ cont +'">'+ cont +'</option>';                    
    }
    $('#ano').append(text);
}


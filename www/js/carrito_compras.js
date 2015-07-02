document.addEventListener('DOMContentLoaded',function() {
    localStorage.setItem('userIdLocal','12');
    var userId =  localStorage.getItem('userIdLocal');
/*---------------------------------------------------------------------------------------------------------------------*/
    ///////////////////////////////////////////////
    /******** Cargar pedidos almacenados *********/
    if(menu.checkRelativeRoot() == "carrito_compras.html") {
        //Carga imagen ajax para carrito compras catalogo
        showWaitLoader('mascaraAJAX');
        $('#mascaraAJAX').fadeIn(300);
        //Verifica que no haya compras sin pagar
        queryData('USP_VBC_GET_ORDERS_BY_ONE_USER', ['integer',userId,'integer',0], ordersByUser);
        function ordersByUser(dataSet) {
            var rec = dataSet[0];
            if (typeof rec != "undefined") {
                app.showNotificactionVBC('Hay órdenes ingresadas que no están pagadas, favor de pagarlas o cancelarlas para poder ingresar nuevas órdenes. Si tienes dudas favor de contactar a su administrador.');
                location.href="welcome.html";
            }
        }
        //Dentro del carrito de compras, se verifica si existen pedidos almacenados
        var listo = 0, cont = 0;
        //variables de llenado de tabla
        var total_precio = 0, total_puntos = 0, total_vconsumible = 0, total_peso = 0;
        var llenarTabla  = "";
        var indicadorPromo = document.getElementById('indicadorPromo');
        var indicadorRegalos = document.getElementById('indicadorRegalos');
        var contPromo = 0;
        var contRegalos = 0;
        while(listo == 0) {
            //Se recorren las variables almacenadas desde el indice 0 hasta ya no encontrar
            //si no encuentra variables almacenadas, sale del ciclo
            if (window.localStorage.getItem('datosCarrito' + cont)) {
                //se extraen los datos locales
                var extraer = localStorage.getItem('datosCarrito' + cont);
                //se convierte la cadena en array y se asignan valores
                var resArray = extraer.split('","');
                var codigo      = resArray[0];
                var articulo    = resArray[1];
                var precio      = resArray[2];
                var puntos      = resArray[3];
                var vconsumible = resArray[4];
                var peso        = resArray[5];
                var cantidad    = resArray[6];
                var origen    = resArray[7];
                var total       = (precio.substring(1, precio.length))*cantidad;
                var tpuntos     = (puntos*cantidad);
                var tvconsumible= (vconsumible*cantidad);
                var tpeso       = (peso*cantidad);
                total_precio      += total;
                total_puntos      += tpuntos;
                total_vconsumible += tvconsumible;
                total_peso        += tpeso;
                //Se aplica color distintivo a promoción y regalos.
                var color = '';
                if (origen == 'promocion') {
                    color = '#1E6E2D';
                    indicadorPromo.innerHTML = '<span style="background: '+color+'; padding: 1px">promoción</span>';
                    //Cantidad de productos de promoción que se pasara como parametro a carrito_compras_regalos.html
                    contPromo += 1*cantidad;
                }
                else if (origen == 'regalos') {
                    color = '#32B51E';
                    indicadorRegalos.innerHTML = '<span style="background: '+color+'; padding: 1px">regalos</span>';
                    contRegalos += 1;
                }
                //se llena la tabla del carrito con los pedidos extraidos
                llenarTabla += "<tr style='background: "+color+"'>";
                llenarTabla +=      "<td>" + articulo + "</td>";
                llenarTabla +=      "<td>" + codigo + "</td>";
                llenarTabla +=      "<td>" + cantidad + "</td>";
                llenarTabla +=      "<td>" + precio + "</td>";
                llenarTabla +=      "<td>" + puntos + "</td>";
                llenarTabla +=      "<td>" + vconsumible + "</td>";
                llenarTabla +=      "<td>$" + Math.round(total*100)/100 + "</td>";//total precio
                llenarTabla +=      "<td>" + tpuntos + "</td>";//total puntos
                llenarTabla +=      "<td>" + tvconsumible + "</td>";//total valor consumible
                llenarTabla +=      "<td>" + Math.round(tpeso*100)/100 + "kg.</td>";
                llenarTabla += "</tr>";
            } else {
                listo = 1;
            }
            cont += 1;
        }
        llenarTabla += "<tr id='sumatoria'>";
        llenarTabla +=      "<td id='subtotal' colspan='6' align='right'><strong>Subtotal</string></td>";
        llenarTabla +=      "<td id='total_precio'>$" + Math.round(total_precio*100) / 100 + "</td>";
        llenarTabla +=      "<td id='total_puntos'>" + total_puntos + "</td>";
        llenarTabla +=      "<td id='total_vconsumible'>" + total_vconsumible + "</td>";
        llenarTabla +=      "<td id='total_peso'>" + Math.round(total_peso*100) / 100 + "kg. </td>";
        llenarTabla += "</tr>";
        document.getElementById('datos_carrito').innerHTML = llenarTabla;

        ////////////////////////////////////////////////////
        /******* Carga las promociones del usuario ********/
        var volumen_promotion = [
            'integer',userId,//ID de usuario
            'integer',total_vconsumible,//valor consumible total actual
            'integer',contPromo,//Promociones canjeadas actuales
            'integer',contRegalos,//Regalos canjeados actuales
            'integer','0',//Grupo del regalo canjeado
            'integer','4',//ID de pais
        ];
        queryData('USP_VBC_GET_VOLUMEN_PROMOTION', volumen_promotion, promociones);
        function promociones(dataSet) {
            var rec = dataSet[0];
            var productosPromo = document.getElementById('productosPromo');
            var productosRegalo = document.getElementById('productosRegalo');
            if (rec['totalItems4Promo'] > 0) {
                productosPromo.innerHTML = 'Usted puede <a href="carrito_compras_promocion.html?maxPromo='+rec['totalItems4Promo']+'">adquirir</a> '+rec['totalItems4Promo']+' productos de promoción';
                
            }
            if (rec['topGift'] >= 0) {
                productosRegalo.innerHTML = 'Usted tiene  <a id="regalos" href="carrito_compras_regalos.html?promo='+contPromo+'"> '+rec['topGift']+' productos de regalo</a>';
            }
            //Oculta imágen AJAX
            $('#mascaraAJAX').fadeOut(300);
            $('#mascaraAJAX').html('');
        }

    } // Termina Carrito_Compras.html
/*---------------------------------------------------------------------------------------------------------------------*/
    if(menu.checkRelativeRoot() == "carrito_compras_catalogo.html") {
        //Carga imagen ajax para carrito compras catalogo
        showWaitLoader('mascaraAJAX');
        $('#mascaraAJAX').fadeIn(300);
        /////////////////////////////////////////////////
        /******** Llena combobox de categorías *********/
        var cat = document.getElementById('categoria');
        //var egoria = getByURL()['categoria']==null ? getByURL()['categoria'] : 1;
        var egoria = 1;
        var get = getByURL()['categoria'];
        if (typeof get != "undefined" && get != '') {
            egoria = get;
        }else {
            egoria = 1
        }
        var argumentos = [
        'integer', '0',
        'integer', egoria,//categoria
        'integer','12',//Usuario
        'integer', '7',
        'string' ,  '',
        'integer',  '',
        'integer',  '',
        'integer', '4 ',//País
        'integer',  '',
        'integer',  '',
        'integer',  ''
        ];

        //Carga la tabla cuando se actualiza el combobox
        cat.addEventListener('change', function(event){
            event.target.blur();
        //Carga imagen ajax
        showWaitLoader('mascaraAJAX');
        $('#mascaraAJAX').fadeIn(300);
            var opcion = cat.value;
            argumentos[3] = opcion;
            queryData('USP_VBC_GET_ITEM_CATALOG', argumentos, listaArticulos, 2);
            egoria = opcion;
        });

        queryData('USP_VBC_GET_ITEM_CATALOG', argumentos, categorias);
        function categorias(dataSet) {
            var select_categoria = document.getElementById('categoria');
            var rec = dataSet[0];
            for(var idx = 0; idx < dataSet.length; idx++){
                rec = dataSet[idx];
                var options = document.createElement('option');
                options.text = rec['groupName'];
                options.value = rec['itemGroupId'];
                select_categoria.options.add(options);
            }
            document.getElementById('categoria').value = egoria;
        }
        ///////////////////////////////////////////////
        /******** Carga articulos a la tabla *********/
        queryData('USP_VBC_GET_ITEM_CATALOG', argumentos, listaArticulos, 2);
        function listaArticulos(dataSet) {
            var articulos = document.getElementById('articulos');
            showWaitLoader('articulos');
            var rec = dataSet[0];
            var text = "", code = '';
            for(var idx = 0; idx < dataSet.length; idx++){
                rec = dataSet[idx];
                code = rec['itemCode'];
                text += '<tr id="TR-' +code+ '">';
                text += '<td id="'    +code+ '"><a href="carrito_compras_detalles.html?categoria=' +egoria+ '&code=' +code+ '&price=' +
                    rec['price']+ '">' +
                    rec['itemCode'] + '</a></td><td id="DES-' +code+ '">' + 
                    rec['description'] + '</td><td id="PRE-'  +code+ '">$' + 
                    rec['price'] + '</td><td id="PUN='  +code+ '">' + 
                    rec['itemPvDistributor'] + '</td><td id="VCO-' +code+ '">' + 
                    rec['itemCvDistributor'] + '</td><td id="PSO-' +code+ '">' + 
                    rec['weight'] + '</td><td id="CAN-' +code+ '">' +
                    '<input type="number" id="TXT-'     +code+ '" placeholder="cantidad" size="7" />' +
                    '<input type="submit" class="comprar" value="Comprar" /></td>';
                text += '</tr>';
            }
            articulos.innerHTML = text;
            var comprar = document.querySelectorAll('input[type=submit]');
            for (var i = 0; i < comprar.length; i++) {
                comprar[i].addEventListener('click', compra, false);
            }
            //Oculta imágen AJAX
            $('#mascaraAJAX').fadeOut(300);
            $('#mascaraAJAX').html('');
        }

        //////////////////////////////////
        /****** Buscador interno ********/
        var search = document.getElementById('search');
        search.addEventListener('keyup', function(){
            var buscarTr = articulos.childNodes;
            for (var i = 0; i < buscarTr.length; i++) {
                var encontrado = articulos.childNodes[i].childNodes[1].innerHTML.toLowerCase().indexOf(search.value.toLowerCase());
                if(encontrado == -1) {
                    buscarTr[i].style.display = 'none';
                }
                else {
                    buscarTr[i].style.display = '';
                }
            }
        },false);

    }//Termina carrito_compras_catalogo.html

/*---------------------------------------------------------------------------------------------------------------------*/
    if(menu.checkRelativeRoot() == "carrito_compras_promocion.html") {
        //Carga imagen ajax para carrito compras catalogo
        showWaitLoader('mascaraAJAX');
        $('#mascaraAJAX').fadeIn(300);

        ///////////////////////////////////////////////
        /******** Carga articulos a la tabla *********/
        var argumentos = [
        'string',  '',
        'integer', '1',//Operador
        'integer',  userId,//Usuario
        'integer', '4',//Pais
        'integer' ,'5'//nivel de precio
        ];
        queryData('USP_VBC_GET_ITEM_INFO_GIFT', argumentos, listaPromo);
        function listaPromo(dataSet) {
            var articulos = document.getElementById('articulos');
            var rec = dataSet[0];
            var text = "", code = '';
            for(var idx = 0; idx < dataSet.length; idx++){
                rec = dataSet[idx];
                code = rec['itemCode'];
                text += '<tr id="TR-' +code+ '">';
                text += '<td id="'    +code+ '"><a href="carrito_compras_detalles.html?categoria=' +egoria+ '&code=' +code+ '&price=' +
                    rec['price']+ '">' +
                    rec['itemCode'] + '</a></td><td id="DES-' +code+ '">' + 
                    rec['description'] + '</td><td id="PRE-'  +code+ '">$' + 
                    rec['price'] + '</td><td id="PUN='  +code+ '">' + 
                    rec['itemPvDistributor'] + '</td><td id="VCO-' +code+ '">' + 
                    rec['itemCvDistributor'] + '</td><td id="PSO-' +code+ '">' + 
                    rec['weight'] + '</td><td id="CAN-' +code+ '">' +
                    '<input type="number" class="cantidad" id="TXT-'     +code+ '" placeholder="cantidad" size="7" />' +
                    '<input type="submit" class="comprar" value="Comprar" /></td>';
                text += '</tr>';
            }
            articulos.innerHTML = text;
            var comprar = document.querySelectorAll('input[type=submit]');
            for (var i = 0; i < comprar.length; i++) {
                comprar[i].addEventListener('click', compra, false);
            }
            //Oculta imágen AJAX
            $('#mascaraAJAX').fadeOut(300);
            $('#mascaraAJAX').html('');

            var cantidad = document.querySelectorAll('.cantidad');
            var cantidadT = cantidad.length;
            for (var i = 0; i < cantidadT; i++) {
                cantidad[i].addEventListener('click', compararPromo, false);
            }
        }

        //Supervisa que no se puedan adquirir mas productos de los permitidos
        var maxPromo = parseInt(getByURL()['maxPromo']) ;
        function compararPromo(event) {
            document.getElementById(event.target.id).addEventListener('keyup', function(event){
                var valorIngresado = event.target.value;
                if (valorIngresado > maxPromo) {
                    app.showNotificactionVBC('No puedes adquirir mas de ' + maxPromo + ' productos de promoción');
                    event.target.value = '';
                }
            },false);
        }

        //////////////////////////////////
        /****** Buscador interno ********/
        var search = document.getElementById('search');
        search.addEventListener('keyup', function(){
            var buscarTr = articulos.childNodes;
            var buscarTrT = buscarTr.length;
            for (var i = 0; i < buscarTrT; i++) {
                var encontrado = articulos.childNodes[i].childNodes[1].innerHTML.toLowerCase().indexOf(search.value.toLowerCase());
                if(encontrado == -1) {
                    buscarTr[i].style.display = 'none';
                }
                else {
                    buscarTr[i].style.display = '';
                }
            }
        },false);
    }//Termina carrito_compras_promocion.html

    /*---------------------------------------------------------------------------------------------------------------------*/
    if(menu.checkRelativeRoot() == "carrito_compras_regalos.html") {
        //Carga imagen ajax para carrito compras regalos
        showWaitLoader('mascaraAJAX');
        $('#mascaraAJAX').fadeIn(300);
        //Determina si tiene acceso a compras.
        var cantidadPromo = getByURL()['promo'];
        if (typeof cantidadPromo != "undefined") {
            if (cantidadPromo < 3) {
                app.showNotificactionVBC('Lo sentimos, no puede ingresar a los productos de regalo por insuficiencia de artículos de promoción seleccionados');
                location.href = 'carrito_compras.html';
            }
        }
        ///////////////////////////////////////////////
        /******** Carga articulos a la tabla *********/
        
        var argumentos = [
        'integer', '0',//Operador
        'integer', '1',//Group Id => 0 Muestra todos
        'integer',  userId,//Usuario
        'integer', '4',//Pais
        'integer', '0',
        'integer', cantidadPromo,//Número de P. de Promo =>3=1; 6=2; 9=4; 
        'integer', '0',
        'integer', '0'
        ];
        //////////////////////////////////
        /****** Lista de grupos ********/
        queryData('USP_VBC_GET_ITEM_GIFT_CATALOG', argumentos, listaGrupos);
        var grupos = document.getElementById('grupos');
        function listaGrupos(dataSet) {
            var rec = dataSet[0];
            var count = 0;
            
            text = '<tr><td colspan="7">Grupo 1</td></td>';
            for(var idx = 0; idx < dataSet.length; idx++){
                rec = dataSet[idx];
                //Llena combobox se grupos
                var options = document.createElement('option');
                options.value = rec['itemGroupId'];
                options.text = rec['groupName'];
                grupos.options.add(options);
            }
            Debug(rec);
        }

        grupos.addEventListener('change', function(event) {
            //Carga imagen ajax para carrito compras catalogo
            showWaitLoader('mascaraAJAX');
            $('#mascaraAJAX').fadeIn(300);
            argumentos[3] = grupos.value;
            event.target.blur();
            queryData('USP_VBC_GET_ITEM_GIFT_CATALOG', argumentos, listaRegalos,2);
        });

        ///////////////////////////////////////////////
        /****** Lista de productos de regalos ********/
        queryData('USP_VBC_GET_ITEM_GIFT_CATALOG', argumentos, listaRegalos,2);
        function listaRegalos(dataSet) {
            var articulos = document.getElementById('articulos');
            var rec = dataSet[0];
            var code = '', text = "";
            for(var idy = 0; idy < dataSet.length; idy++){
                rec = dataSet[idy];
                code = rec['itemCode'];
                text += '<tr id="TR-' +code+ '">';
                text += '<td id="'    +code+ '"><a href="carrito_compras_detalles.html?categoria=' +egoria+ '&code=' +code+ '&price=' +
                    rec['price']+ '">' +
                    rec['itemCode'] + '</a></td><td id="DES-' +code+ '">' + 
                    rec['description'] + '</td><td id="PRE-'  +code+ '">$' + 
                    rec['price'] + '</td><td id="PUN='  +code+ '">' + 
                    rec['itemPvDistributor'] + '</td><td id="VCO-' +code+ '">' + 
                    rec['itemCvDistributor'] + '</td><td id="PSO-' +code+ '">' + 
                    rec['weight'] + '</td><td id="CAN-' +code+ '">' +
                    '<input type="number" id="TXT-'     +code+ '" placeholder="cantidad" size="7" />' +
                    '<input type="submit" class="comprar" value="Comprar" /></td>';
                text += '</tr>';
            }
            articulos.innerHTML = text;
            var comprar = document.querySelectorAll('input[type=submit]');
            for (var i = 0; i < comprar.length; i++) {
                comprar[i].addEventListener('click', compra, false);
            }
            //Oculta imágen AJAX
            $('#mascaraAJAX').fadeOut(300);
            $('#mascaraAJAX').html('');
        }

        //////////////////////////////////
        /****** Buscador interno ********/
        var search = document.getElementById('search');
        search.addEventListener('keyup', function(){
            var buscarTr = articulos.childNodes;
            for (var i = 0; i < buscarTr.length; i++) {
                var encontrado = articulos.childNodes[i].childNodes[1].innerHTML.toLowerCase().indexOf(search.value.toLowerCase());
                if(encontrado == -1) {
                    buscarTr[i].style.display = 'none';
                }
                else {
                    buscarTr[i].style.display = '';
                }
            }
        },false);
    }//Termina carrito_compras_regalos.html

/*---------------------------------------------------------------------------------------------------------------------*/
    if(menu.checkRelativeRoot() == "carrito_compras_levantar.html") {
        //Muestra imagen AJAX
        showWaitLoader('mascaraAJAX');
        $('#mascaraAJAX').fadeIn(300);
        /////////////////////////////////////////////////////
        /****** Llena combobox de Centro Autorizado ********/
        queryData('USP_VBC_GET_WAREHOUSE_BY_COUNTRY', ['integer','4'], centroAutorizado);
        function centroAutorizado(dataSet) {
            var rec = dataSet[0];
            var sucursal = document.getElementById('sucursal');
            for(var idx = 0; idx < dataSet.length; idx++){
                var options = document.createElement('option');
                rec = dataSet[idx];
                options.text = rec['description'];
                options.value = rec['warehouseId'];
                sucursal.options.add(options);
            }
            ocultar();
        }
        //////////////////////////////////////////////
        /****** Llena combobox de Mensajería ********/
        queryData('USP_VBC_GET_CARRIERS', ['integer','4'], mensajeria);
        function mensajeria(dataSet) {
            var rec = dataSet[0];
            var paqueteria = document.getElementById('paqueteria');
            for(var idx = 0; idx < dataSet.length; idx++){
                var options = document.createElement('option');
                rec = dataSet[idx];
                options.text = rec['description'];
                options.value = rec['carrierId'];
                paqueteria.options.add(options);
            }
        }
        //////////////////////////////////////////////////
        /****** Llena combobox de formas de pago ********/
        queryData('USP_VBC_GET_PAY_METHOD', ['integer','1','integer','4'], formaPago);
        function formaPago(dataSet) {
            var rec = dataSet[0];
            var forma_pago = document.getElementById('forma-pago');
            for(var idx = 0; idx < dataSet.length; idx++){
                var options = document.createElement('option');
                rec = dataSet[idx];
                options.text = rec['description'];
                options.value = rec['payMethodId'];
                forma_pago.options.add(options);
            }
        }
        ///////////////////////////////////////////////////
        /******* Llena combobox de metodo de envío *******/
        queryData('USP_VBC_GET_SHIPMENT_METHODS', ['integer','','integer','4'], metodoEnvio);
        function metodoEnvio(dataSet) {
            var rec = dataSet[0];
            var metodo_envio = document.getElementById('metodo-envio');
            for(var idx = 0; idx < dataSet.length; idx++){
                var options = document.createElement('option');
                rec = dataSet[idx];
                options.text = rec['name'];
                options.value = rec['shipMethodId'];
                metodo_envio.options.add(options);
            }
            //Muestra si hay datos guardados
            if (window.localStorage.getItem('carrito_levantar')) {
                //extrae datos almacenados y los convierte en array
                var extraer = localStorage.getItem('carrito_levantar');
                var resArray = extraer.split('","');
                document.getElementById('metodo-envio').value = resArray[0];
                if (resArray[0] == 2) {
                    document.getElementById('paqueteria').value = resArray[1];
                }
                else {
                    document.getElementById('sucursal').value = resArray[1];
                }
                document.getElementById('forma-pago').value = resArray[2];
            }
            ocultar();
            //Oculta imágen AJAX
            $('#mascaraAJAX').fadeOut(300);
            $('#mascaraAJAX').html('');
        }//Termina función
        function ocultar() {
            //Muestra u oculta centro autorizado o mensajería según sea el caso
            var option = document.getElementById('metodo-envio').value;
            //var option = $('#metodo-envio').val();
            if (option == 2) {
                $('#trSucursal').hide(0);
                $('#trPaqueteria').show(300);
            }
            else if (option == 1){
                $('#trPaqueteria').hide(0);
                $('#trSucursal').show(300);
            }
        }
        //Responde al evento metodo de envío
        document.getElementById('metodo-envio').addEventListener('change', function(event) {
            var option = document.getElementById(event.target.id).value;
            event.target.blur();
            if (option == 2) {
                $('#trSucursal').hide(0);
                $('#trPaqueteria').show(300);
            }
            else if (option == 1){
                $('#trPaqueteria').hide(0);
                $('#trSucursal').show(300);
            }
        });
        //Quita foco al metodo de envío
        document.getElementById('paqueteria').addEventListener('change', function(event) {
            event.target.blur();
        });
        //Quita foco al evento paqueteria
        document.getElementById('sucursal').addEventListener('change', function(event) {
            event.target.blur();
        });
        //Quita foco al evento metodo de envío
        document.getElementById('forma-pago').addEventListener('change', function(event) {
            event.target.blur();
        });

        document.querySelector('.levantar-siguiente').addEventListener('click', function() {
            var formaPago = document.getElementById('forma-pago').value;
            var metodoEnvio = document.getElementById('metodo-envio').value;
            var sucursal = document.getElementById('sucursal').value;
            if (formaPago == "0") {
                app.showNotificactionVBC("Seleccione una forma de pago y oprima siguiente");
            }
            //En caso de elegir envío ocurre, valida que elija un centro autorizado
            else if (metodoEnvio == 1 && sucursal == 0) {
                app.showNotificactionVBC("Seleccione un centro autorizado");
            }
            else {
                //Guardar datos
                var datos = "";
                var paqueteria = document.getElementById('paqueteria').value;
                datos = metodoEnvio + "\",\"";
                if (metodoEnvio == 2) {
                    datos += paqueteria + "\",\"";
                }
                else {
                    datos += sucursal + "\",\"";
                }
                datos += formaPago;
            
                localStorage.setItem('carrito_levantar', datos);
                location.href='carrito_compras_generar.html';
            }
        });

    }//Termina carrito_compras_levantar.html

/*---------------------------------------------------------------------------------------------------------------------*/
    if(menu.checkRelativeRoot() == "carrito_compras_generar.html") {
        //Constantes
        const IVA = 0.16;
        //Carga imagen ajax
        showWaitLoader('mascaraAJAX');
        $('#mascaraAJAX').fadeIn(300);
        /////////////////////////////////////////////////////
        /************* Calcula Costo de envío **************/
        
        //Datos de carrito_compras.html
        var cadena = localStorage.getItem('carrito_subtotales');
        var resArray = cadena.split('","');
        var total_precio =      resArray[0];
        var total_puntos =      resArray[1];
        var total_vconsumible = resArray[2];
        var total_peso = resArray[3];
        //Datos de carrito_compras_levantar.html
        var cadenaLevantar = localStorage.getItem('carrito_levantar');
        cadenaLevantar = cadenaLevantar.split('","');
        var metodo_envio = cadenaLevantar[0];
        var enviar_a = cadenaLevantar[1];
        var forma_pago = cadenaLevantar[2];
        var carrier = 3;
        if (metodo_envio == 2) {
            carrier = enviar_a;
        }

        var xml = '<PAGE><CART GRAN_TOTAL_ITEM_WEIGHT="'+total_peso+'" COUNTRY_ID="4"/><SHIPPING_ADDRES SHIPPING_METHOD="'+metodo_envio+'" CARRIER="'+carrier+'"/></PAGE>';
        queryData('USP_VBC_GET_SHIPPING_COST', ['string',depurarXML(xml)], calculaEnvio);
        var costoXenvio = 0;
        function calculaEnvio(dataSet) {
            var rec = dataSet[0];
            var cargo_manejo = document.getElementById('cargo_manejo');
            if (rec['shippingCharge'] == null) {
                cargo_manejo.innerHTML = 0;
            } else {
                cargo_manejo.innerHTML = '$' +rec['shippingCharge'];
                costoXenvio = rec['shippingCharge'];
            }

            //Despues de obtenido el costo por envío, carga los subtotales
            if (window.localStorage.getItem('carrito_subtotales')) {
                
                var cadenaSubtotal = '<div style="padding:3px; border: 1px solid silver; float: left">T. Puntos: ' + total_puntos + '</div>';
                cadenaSubtotal += '<div style="padding:3px; border: 1px solid silver; float: left">T. V. Consumible: ' + total_vconsumible + '</div>';
                cadenaSubtotal += '<div style="padding:3px; float: right">Total: $' + total_precio + '</div>';
                document.getElementById('subtotales').innerHTML = (cadenaSubtotal);
                var cadenaInpuesto = total_precio * IVA;
                var inpuesto = Math.round(cadenaInpuesto*100)/100;
                cadenaInpuesto = '<div style="text-align: right">$' + inpuesto + '</div>';
                document.getElementById('impuesto').innerHTML = (cadenaInpuesto);
                var granTotal = parseFloat(total_precio) + parseFloat(costoXenvio) + parseFloat(inpuesto);
                document.getElementById('gran_total').innerHTML = '$' +Math.round(granTotal*100)/100;
            }
            else {
                app.showNotificactionVBC('Algo salio mal al cargar los datos');
            }
        }
        ////////////////////////////////////////////////////
        /******* Llena tabla de Dirección de envío ********/
        queryData('USP_VBC_GET_USER_PROFILE_DATA', ['integer',userId], profileData);
        function profileData(dataSet) {
            var rec = dataSet[0];
            var tabla = '<table>';
            rec = dataSet[i];
            tabla += '<tr>';
            tabla += '<td class="titulos">Nombre:</td><td id="shipName">' + rec['shipName'] + '</td>';
            tabla += '</tr>';
            if (metodo_envio == 1) {
                queryData('USP_VBC_GET_WAREHOUSE_DETAIL', ['integer',enviar_a], profileCentro);
                function profileCentro(dataSet2) {
                    var rec2 = dataSet2[0];
                    tabla += '<tr>';
                    tabla += '<td class="titulos">País:</td><td><address>' + rec2['countryCode'] + '</address></td>';
                    tabla += '</tr>';
                    tabla += '<tr>';
                    tabla += '<td class="titulos">Calle/ Número:</td><td><address>' + rec2['address1'] + '</address></td>';
                    tabla += '</tr>';
                    tabla += '<tr>';
                    tabla += '<td class="titulos">Ciudad/ Municipio:</td><td><address>' + rec2['address2'] + '</address></td>';
                    tabla += '</tr>';
                    tabla += '<tr>';
                    tabla += '<td class="titulos">Ciudad:</td><td><address>' + rec2['description'] + '</address></td>';
                    tabla += '</tr>';
                    tabla += '<tr>';
                    tabla += '<td class="titulos">Estado / C.P.:</td><td><address>' +   rec2['stateCode'] + '/ ' + 
                                                                                        rec2['postalCode'] + '</address></td>';
                    tabla += '</tr>';
                    tabla += '<tr>';
                    tabla += '<td class="titulos">Instrucciones Especiales</td><td><input type="text" id="instrucciones" data-mini="true" /></td>';
                    tabla += '</tr>';
                    tabla += '</table>';
                    //Campos ocultos
                    tabla += '<div style="top:-100px; position: absolute"><span id="phoneHome">';
                    tabla += '</span><span id="numInt">'+
                             '</span><span id="numExt">'+
                             '</span></div>';

                    document.getElementById('dataSet').innerHTML = tabla;
                }
            } else {
                tabla += '<tr>';
                tabla += '<td class="titulos">País:</td><td><address>' + rec['mailingCountry'] + '</address></td>';
                tabla += '</tr>';
                tabla += '<tr>';
                tabla += '<td class="titulos">Calle/ Número:</td><td><address>' + rec['mailingAddressLine1'] + '</address></td>';
                tabla += '</tr>';
                tabla += '<tr>';
                tabla += '<td class="titulos">Ciudad/ Municipio:</td><td><address>' + rec['mailingAddressLine2'] + '</address></td>';
                tabla += '</tr>';
                tabla += '<tr>';
                tabla += '<td class="titulos">Ciudad:</td><td><address>' + rec['mailingCity'] + '</address></td>';
                tabla += '</tr>';
                tabla += '<tr>';
                tabla += '<td class="titulos">Estado / C.P.:</td><td><address>' +   rec['mailingState'] + '/' + 
                                                                                    rec['mailingPostalCode'] + '</address></td>';
                tabla += '</tr>';
                tabla += '<tr>';
                tabla += '<td class="titulos">Instrucciones Especiales</td><td><input type="text" id="instrucciones" data-mini="true" /></td>';
                tabla += '</tr>';
                tabla += '</table>';
                //Campos ocultos
                tabla += '<div style="top:-100px; position: absolute"><span id="phoneHome">';
                tabla += rec['shippingPhone']+ '</span><span id="numInt">'+
                         rec['shippingAddressNumInt']+'</span><span id="numExt">'+
                         rec['shippingAddressNumExt']+'</span></div>';
                document.getElementById('dataSet').innerHTML = tabla;
            }
            /**** Termina llenado de tabla de Dirección de envío ****/
            //////////////////////////////////////////////////////////

            ///////////////////////////////////////////////////////
            /*************** Extrae Periodo Actual ***************/
            queryData('USP_VBC_GET_PERIODS', ['integer','6','integer','0'], periodoActual);
            function periodoActual(dataSet) {
                var rec = dataSet[0];
                periodId = document.getElementById('dataSet').innerHTML;
                periodId += '<div style="top:-110px; position: absolute" id="periodo">'+ rec['periodId'] +'</div>';
                document.getElementById('dataSet').innerHTML = periodId;
            }

            /////////////////////////////////////////////////////////
            /*************** Inserta XML de la orden ***************/
            document.getElementById('generar-orden').addEventListener('click', function() {
                //Datos de formulario Levantar pedido
                var cadenaLevantar = localStorage.getItem('carrito_levantar');
                var cadenaSetXML = cadenaLevantar.split('","');
                if (cadenaSetXML[0] == 1) {
                    var warehouse = cadenaSetXML[1];
                    var carrier = 0;
                } else {
                    var warehouse = 0;
                    var carrier = cadenaSetXML[1];
                }
                //Subtotales de carrito compras
                var cadena = localStorage.getItem('carrito_subtotales');
                var resArray = cadena.split('","');
                var cargoXmanejo = document.getElementById('cargo_manejo').innerHTML;
                var granTotal = document.getElementById('gran_total').innerHTML;

                //Datos de tabla dirección:
                var address = document.getElementsByTagName('address');
                var shipName = document.getElementById('shipName').innerHTML;
                var address1 = address[1].innerHTML;
                var address2 = address[2].innerHTML;
                var city = address[3].innerHTML;
                var instructions = document.getElementById('instrucciones').value;
                var stateAndPC = address[4].innerHTML;
                    stateAndPC = stateAndPC.split('/');
                var state = stateAndPC[0];
                var PostalCode = stateAndPC[1];
                var phoneHome = document.getElementById('phoneHome').innerHTML;
                var numInt = document.getElementById('numInt').innerHTML;
                var numExt = document.getElementById('numExt').innerHTML;
                var period = document.getElementById('periodo').innerHTML;
                var shippingMethod = cadenaSetXML[0];
                var paymentMethod = cadenaSetXML[2];
                
                //Obtenemos los items seleccionados
                var listo = 0, cont = 0;
                var items = '';
                var itemsSerial = '';
                while(listo == 0) {
                    //Se recorren las variables almacenadas desde el indice 0 hasta ya no encontrar
                    //si no encuentra variables almacenadas, sale del ciclo
                    if (window.localStorage.getItem('datosCarrito' + cont)) {
                        //se extraen los datos locales
                        var extraer = localStorage.getItem('datosCarrito' + cont);
                        //se convierte la cadena en array y se asignan valores
                        var resArr = extraer.split('","');
                        var codigo      = resArr[0];
                        var articulo    = resArr[1];
                        var precio      = resArr[2];
                        var puntos      = resArr[3];
                        var vconsumible = resArr[4];
                        var peso        = resArr[5];
                        var cantidad    = resArr[6];
                        var total       = (precio.substring(1, precio.length))*cantidad;
                        var tpuntos     = (puntos*cantidad);
                        var tvconsumible= (vconsumible*cantidad);
                        var tpeso       = (peso*cantidad);
                        total_precio      += total;
                        total_puntos      += tpuntos;
                        total_vconsumible += tvconsumible;
                        total_peso        += tpeso;
                        //se llena la tabla del carrito con los pedidos extraidos
                        items += '<ITEM ITEM_CODE="'+codigo+'" QUANTITY="'+cantidad+'" RETAIL="'+precio+'" ITEM_PRICE="'+precio+'" TOTAL_ITEM_PRICE="'+total+'" TOTAL_ITEM_PV="'+tpuntos+'" TOTAL_ITEM_CV="'+tvconsumible+'" TAX_AMOUNT="'+precio*IVA+'" VOLUME_TYPE_ID="1" IS_KIT="" PRICE_LEVEL_ID="7" ITEM_SUBGROUP_ID="1" />'+"\n";
                        itemsSerial += '<SERIAL_ITEM ITEM_CODE="'+codigo+'" QUANTITY="'+cantidad+'" ITEM_PRICE="'+precio+'" ITEM_NAME="'+articulo+'" SERIAL_NUMBER="" />'+"\n";
                    } else {
                        listo = 1;
                    }
                    cont += 1;
                }

                ///////////////////////////////////////////////////////
                /************* Obtiene el ID de la Orden *************/
                queryData('USP_VBC_GET_ORDER_ID', [], getOrderID);
                function getOrderID(dataSet) {
                    var rec = dataSet[0];
                    var numOrden = rec['orderId'];
                    //Prepara XML
                    var  setXML = '<PAGE USER_ID="'+userId+'" PRICE_LEVEL_ID="7" NEW_ORDER_ID="'+numOrden+'">'+"\n"+
                                '<ORDER_INFO PAYMENT_METHOD="'+paymentMethod+'" SPECIAL_INSTRUCTIONS="'+instructions+'" />'+"\n"+
                                '<PAYMENTS><PAYMENT AMOUNT="" TYPE="'+paymentMethod+'"/></PAYMENTS>  '+"\n"+
                                '<MULTI_TAXS_INFO>'+"\n"+
                                  '<MULTI_TAX_INFO TAX_TYPE="1" TAX_PERCENTAGE="16" BASE_TAXABLE="'+resArray[0]+'" AMMOUNT="'+resArray[0]*IVA+'" />'+"\n"+
                                '</MULTI_TAXS_INFO>'+"\n"+
                                '<CART GRAN_TOTAL_ITEM_PV="'+resArray[1]+'" GRAN_TOTAL_ITEM_CV="'+resArray[2]+'" GRAN_TOTAL_NETO="'+granTotal.substring(1,granTotal.length)+'" HANDLING_AMOUNT="0" SHIPPING_AMOUNT="'+cargoXmanejo.substring(1,cargoXmanejo.length)+'" TAXES="'+resArray[0]*IVA+'" OPERATOR="" SOURCE_ID="1" REGISTER_PAYMENT="0" REFERENCE="" PAYMENT_AMOUNT="'+granTotal.substring(1,granTotal.length)+'" AMOUNT_TPV="0">'+"\n"+
                                  items+
                                '</CART>'+"\n"+
                                '<SERIAL_ITEMS>'+"\n"+
                                  itemsSerial+
                                '</SERIAL_ITEMS>'+"\n"+
                                '<PERSONAL_INFO WAREHOUSE_ID="'+warehouse+'" />'+"\n"+
                                '<SHIPPING_ADDRES SHIPPING_NAME="'+shipName+'" SHIPPING_COUNTRY_ID="4" HOME_PHONE="'+phoneHome+'" SHIPPING_ADDRESS_LINE_1="'+address1+'" SHIPPING_ADDRESS_NUM_EXT="'+numExt+'" SHIPPING_ADDRESS_NUM_INT="'+numInt+'" SHIPPING_ADDRESS_LINE_2="'+address2+'" SHIPPING_CITY="'+city+'" SHIPPING_STATE="'+state+'" SHIPPING_POSTAL_CODE="'+PostalCode+'" PERIOD_ID="'+period+'" SHIPPING_METHOD="'+shippingMethod+'" CARRIER="'+carrier+'" PAYMENT_METHOD="'+paymentMethod+'" />'+"\n"+
                              '</PAGE>';
                    setXML = depurarXML(setXML);
                    //////////////////////////////////////////////////////
                    /*************** Inserta Serializable ***************/
                    queryData('USP_VBC_SET_SERIAL_NUMBER_XML', ['string',setXML], guardarSeriales);
                    var numerosSeries = '';
                    function guardarSeriales(dataSet2) {
                        rec2 = dataSet2[0];
                        var itemCode = '';
                        var itemName = '';
                        var serialNumber = '';
                        for(var idx = 0; idx < dataSet2.length; idx++){
                            rec2 = dataSet2[idx];
                            if (rec2['serialNumber'] != null) {
                                itemCode += rec2['itemCode'] + "-:-";
                                itemName += rec2['itemName'] + "-:-";
                                serialNumber += rec2['serialNumber'] + "-:-";
                            }
                        }
                        numerosSeries = '&itemCode='+itemCode+'&itemName='+itemName+'&serialNumber='+serialNumber;
                        Debug(numerosSeries);
                        Debug(rec2);
                    }
                    
                    ///////////////////////////////////////////////////////
                    /*************** Guarda la orden ***************/
                    queryData('USP_VBC_SET_ORDER_XML', ['string',setXML], guardarPedido);
                    function guardarPedido(dataSet) {
                        var rec = dataSet[0];
                        if (paymentMethod == 7) {
                            location.href="carrito_compras_ficha.html?granTotal="+granTotal+"&refBancomer="+rec['refBancomer']+"&reference="+rec['reference']+"&numOrden="+numOrden+"&nombre="+shipName+numerosSeries;
                        }
                    }
                }
            }, false);
            /*************** Termina Inserción XML ***************/
            ///////////////////////////////////////////////////////

            //Oculta imágen AJAX
            $('#mascaraAJAX').fadeOut(300);
            $('#mascaraAJAX').html('');
        } // Termina función prifileData para llenar tabla de direcció envío

    } // termina Carrito_Compras_Generar.html
/*---------------------------------------------------------------------------------------------------------------------*/
    /******** Llama a función cancelar *********/
    var cancel = document.querySelectorAll('.cancelar');
    for (var i = 0; i < cancel.length; i++)
        cancel[i].addEventListener('click', cancelar, false);
    /******** Llama a función cancelar *********/
    var cerrar_pedido = document.querySelectorAll('.cerrar_pedido');
    for (var i = 0; i < cerrar_pedido.length; i++)
        cerrar_pedido[i].addEventListener('click', cerrarPedido, false);
});

/*---------------------------------------------------------------------------------------------------------------------*/
/*---------------------------------------------------------------------------------------------------------------------*/
////////////////////////////////////////////
/******** Cancela y vacía carrito *********/
function cancelar(event) {
    var listo = 0, cont = 0;
    while(listo == 0) {
        if (window.localStorage.getItem('datosCarrito' + cont)) {
            localStorage.removeItem('datosCarrito' + cont);
        }
        else {
            //Ya que se eliminaron todos los pedidos
            //se procede a salir del ciclo.
            listo = 1;
        }
        cont += 1;
    }
    localStorage.removeItem('carrito_levantar');
    localStorage.removeItem('carrito_subtotales');
    if(menu.checkRelativeRoot() == "carrito_compras.html") {
        $('#datos_carrito').html("<tr><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td></tr>");
    } else {
        location.href="carrito_compras.html";
    }
}
/////////////////////////////////////////////
/******** Cerrar pedido de carrito *********/
function cerrarPedido() {
    if (!window.localStorage.getItem('datosCarrito0')) {
        app.showNotificactionVBC('No tienes pedidos que prcesar');
    }
    else {
        var subtotal = $('#total_precio').text();
            subtotal = subtotal.substring(1, subtotal.length);
        var puntos = $('#total_puntos').text();
        var vconsumible = $('#total_vconsumible').text();
        var total_peso = document.getElementById('total_peso').innerHTML;
            total_peso = total_peso.substring(0, total_peso.length-4);
        var cadena = subtotal + "\",\"" + puntos + "\",\"" + vconsumible + "\",\"" + total_peso;
        //Guarda los totales
        localStorage.setItem('carrito_subtotales', cadena);
        location.href='carrito_compras_levantar.html';
    }
}

//////////////////////////////////////////////////
/******** procesa artículo seleccionado *********/
document.addEventListener('keypress',function(e) {
    if (e.which == 13) {
        compra(e);
    }
});

//Evento de botón comprar
function compra(event) {
    //Obtiene Id del tag padre del botón cliqueado
    var idTd = document.getElementById(event.target.parentNode.id);
    //Selecciona todas las celdas de la fila
    var celdas = idTd.parentNode.cells;
    var cadenaAGuardar = '';
    for (var i = 0; i < celdas.length; i++) {
        //Extrae el ID de cada celda
        var idCell = celdas[i].id;
        var text = '', cadena = '';
        //Extrae contenido de cada celda
        text = document.getElementById(idCell).innerHTML;
        //Si en el contenido hay algun tag, puede ser un enlace o un input.
        if (text[0] == '<' && text[text.length-1] == '>') {
            if (text[1] == 'a') {
                //si es un enlace, extrae su contendio
                text = document.getElementById(idCell).childNodes[0].innerHTML;
            }
            else {
                //si es input, extrae su valor.
                text = document.getElementById(idCell).childNodes[0].value;
                //Guarda el valor en botón, para posteriormente comparar si esta vacío.
                var boton = text;
            }
        }
        //Concatena todos los valores
        cadenaAGuardar += "\"" +text+ "\",";
        //Si el input text esta vacío, iguala la cadena a nada para evitar ser guardada.
        if (boton == '') {
            cadenaAGuardar = '';
        }
        //De lo contrario verifica que si esta dentro de promociones, no compre mas de lo  permitido
        else {
            if (menu.checkRelativeRoot() == "carrito_compras_promocion.html") {
                if (boton > parseInt(getByURL()['maxPromo'])) {
                    cadenaAGuardar = '';
                }
            }
        }
    }

    //Agrega un identificador para saber la prodecencia de los productos
    if (cadenaAGuardar != '') {
        if (menu.checkRelativeRoot() == "carrito_compras_catalogo.html") {
                cadenaAGuardar += "\"catalogo\",";
        }
        else if (menu.checkRelativeRoot() == "carrito_compras_promocion.html") {
            cadenaAGuardar += "\"promocion\",";
        }
        else if (menu.checkRelativeRoot() == "carrito_compras_regalos.html") {
            cadenaAGuardar += "\"regalos\",";
        }
    }
    //Elimina el primer y último caracter
    cadenaAGuardar = cadenaAGuardar.substring(1, cadenaAGuardar.length-2);
    var listo = 0, cont = 0;
    while(listo == 0) {
        //Si no existe una compra previa, se procede a guardar en local con el índice 0
        //de lo contrario, el ciclo sigue y se guarda con el índice 1, 2, 3, ...
        if (!window.localStorage.getItem('datosCarrito' + cont)) {
            localStorage.setItem('datosCarrito' + cont ,cadenaAGuardar);
            //Ya que se guardaron los datos en el índice correspondiente
            //se procede a salir del ciclo.
            listo = 1;
            if (cadenaAGuardar == "") {
                listo = 2;
            }
        }
        cont += 1;
    }
    caddenaAGuardar = '';
    //Si todo salio bien se prodece a redireccionar al carrito
    if (listo == 1) {
        location.href = 'carrito_compras.html';
    }
    else if (listo==2) {
        //De lo contrario el campo estaba vacío y se solicita llenarlo.
        app.showNotificactionVBC("Captura la cantidad correcta y vuelve a intentalo.");
    }
}
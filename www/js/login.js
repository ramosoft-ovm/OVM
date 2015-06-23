$(function(){
    //Pulsación de tecla enter
    //
    $(document).keypress(function(e) {
        if (e.which == 13) {
            if (usernameFocus==1) {
                $('#password').focus();
                $('#password').trigger('click');
                cordova.plugins.Keyboard.show();
            }
            else if (passwordFocus==1) {
                $('#saveSettings').focus();
                $('#saveSettings').trigger('click');
            }
        }
    });

    //Comprueba si hay variables locales definidas
    //
    if (window.localStorage.getItem("isCBCheckedLocal")) {
        //Si existen los datos de usuario almacenados localmente redirecciona a la página de inicio 
        window.setTimeout(function(){ location.href ="welcome.html";},1750);
    }else{
        localStorage.removeItem("usernameLocal");
        localStorage.removeItem("regIdLocal");
        localStorage.removeItem("userIdLocal");
        //localStorage.removeItem("sessionStatusLocal");
        localStorage.removeItem("nameLocal");
        localStorage.removeItem("sessionIdLocal");
    }

    //Proceso de logueo remoto
    //
    $("#saveSettings").click(function(){
        //Valida que el SESSION_CODE esté cargado y por lo tanto el registro a GCM sea exitoso
        if (document.getElementById('regId').value != "") {
            //Valida que los campos Usuario y Contraseña no estén vacíos
            if (document.getElementById('username').value != "" && document.getElementById('password').value != "") {
                //Variables extraídas del Formulario
                var username = document.getElementById('username').value;
                var password = document.getElementById('password').value;
                var regId = document.getElementById('regId').value;
                //Número aleatorio para establecer el SESSION_ID
                var min = 100000000;
                var max = 999999999; 
                var sessionId = aleatorio(min,max);
                //Almacenamos en una variable temporal el estado del checkBox
                var isCBChecked = false;
                if(document.getElementById('save').checked){
                    isCBChecked = true;
                }else{
                    isCBChecked = false;
                }
                 //variables extraidas del servidor
                var userIdRemoto;
                var usernameRemoto;
                var sessionStatusRemoto;
                var nameRemoto;
                //variables otras                
                var acceso = false;

                /*Si coincide con los datos enviados,  permite el inicio de sesión */
                queryData('USP_VBC_VALIDATE_PASSWORD', ['string', username, 'string', password, 'string', sessionId], validateUser);
                //Valida el STATUS de acceso 
                function validateUser(dataSet){
                    var rec = dataSet[0];
                    console.log(rec['status']);
                    //Si el status es igual a 0 significa que el usuario y el passsword son correctos y continúa con la validación
                    if(rec['status'] == 0){
                        userIdRemoto = rec['custid'];
                        usernameRemoto = rec['nickname'];
                        //sessionStatusRemoto = rec['status'];
                        nameRemoto = rec['customerName'];

                        acceso = true;

                        //Una vez que el acceso es verdadero se procede a guardar el SESSION_CODE del usuario para Notificaciones
                        if(acceso){
                            //Almacena el SESSION_CODE al usuario correspondiente
                            queryData('USP_VBC_SET_MOBILE_SESSION', ['string', regId, 'integer', userIdRemoto], validateRegister);
                            function validateRegister(dataSet){
                                var rec = dataSet[0];
                                //Sí el status es igual a 0 la inserción fue exitosa y si es igual a 1 el SESSION_CODE ya existía
                                if(rec['status'] == 0 || rec['status'] == 1){
                                    //Sí el checkbox esta seleccionado se almacena su estado para redirección automática
                                    if(document.getElementById('save').checked){
                                        localStorage.setItem("isCBCheckedLocal", isCBChecked);
                                    }
                                    localStorage.setItem("nameLocal", nameRemoto);
                                    localStorage.setItem("usernameLocal", usernameRemoto);
                                    localStorage.setItem("regIdLocal", regId);
                                    localStorage.setItem("userIdLocal", userIdRemoto);
                                    localStorage.setItem("sessionIdLocal", sessionId);
                                    //localStorage.setItem("sessionStatusLocal", sessionStatusRemoto);

                                    location.href = "welcome.html";
                                }else{
                                    app.showNotificactionVBC('Error en el inicio de sesión, intente de nuevo');
                                }
                            }
                        }
                    }else if(rec['status'] == 1){
                        app.showNotificactionVBC('Usuario Inexistente');
                    }else if(rec['status'] == 2){
                        app.showNotificactionVBC('El password es Incorrecto');
                    }else if(rec['status'] == 3){
                        app.showNotificactionVBC('El Usuario aún no es activado');
                    }else if(rec['status'] == 4){
                        app.showNotificactionVBC('Ésta cuenta ya está en uso');
                    }else if(rec['status'] == 5){
                        app.showNotificactionVBC('Su Oficina Virtual está bloqueda');
                    }
                }                
            } else {
                app.showNotificactionVBC('Los campos Usuario y Contraseña no pueden estar vacíos');
                //alert('Debes llenar los campos Usuario y Contraseña');
            }
        } else {
            app.showNotificactionVBC('Esperando SESSION_CODE de su dispositivo para que pueda recibir Notificaciones a su Oficina Virtual Móvil')
            //alert('Esperando regId');
        }
    });
});

//Genera número aleatorio para el SESSION_ID
function aleatorio(inferior,superior){ 
    var numPosibilidades = superior - inferior 
    var aleat = Math.random() * numPosibilidades 
    aleat = Math.round(aleat) 
    return parseInt(inferior) + aleat 
}
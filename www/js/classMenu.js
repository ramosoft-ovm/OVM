var menu = { 
    cargarMenu:function(){
        $('#menu').load("includeMenu.html");
    },
    welcome:function(){      
        $('#showMenu').trigger('click');
        window.location = "welcome.html";
    },
    profile: function(){
        $('#showMenu').trigger('click');
        window.location = "profile.html";
    },
    carrito:function(){
        window.location = "carrito_compras.html";
    },
    suscriptores:function(){
        $('#showMenu').trigger('click');
        window.location = "suscriptores.html";
    },
    volumen_movil:function(){
        $('#showMenu').trigger('click');
        window.location = "volumen_movil.html";
    },
    balance:function(){
        $('#showMenu').trigger('click');
        window.location = "balance.html";
    },
    ver_compras:function(){
        $('#showMenu').trigger('click');
        window.location = "ver_compras.html";
    },
    checkRelativeRoot: function(){
        var rutaAbsoluta = self.location.href;
        var posicionUltimaBarra = rutaAbsoluta.lastIndexOf("/");
        var rutaRelativa = rutaAbsoluta.substring( posicionUltimaBarra + "/".length , rutaAbsoluta.length );

        if(rutaRelativa.indexOf("?") > 1){
            var posicionInterrogacion = rutaRelativa.lastIndexOf("?");
            rutaRelativa = rutaRelativa.substring(0, posicionInterrogacion);
        }       

        return rutaRelativa;       
    },
    compararRuta:function(){
        switch(menu.checkRelativeRoot()){
            case "welcome.html":
                $('#active-welcome a').addClass('active');
                break;
            case "profile.html":
                $('#active-profile a').addClass('active');
                break;
            case "carrito_compras_catalogo.html":
                $('#active-carrito a').addClass('active');
                break;
            case "carrito_compras_detalles.html":
                $('#active-carrito a').addClass('active');
                break;
            case "carrito_compras.html":
                $('#active-carrito a').addClass('active');
                break;
            case "suscriptores.html":
                $('#active-suscriptores a').addClass('active');
                break;
            case "suscriptores2.html":
                $('#active-suscriptores a').addClass('active');
                break;
            case "suscriptores3.html":
                $('#active-suscriptores a').addClass('active');
                break;
            case "suscriptores4.html":
                $('#active-suscriptores a').addClass('active');
                break;
            case "suscriptores5.html":
                $('#active-suscriptores a').addClass('active');
                break;
            case "suscriptores6.html":
                $('#active-suscriptores a').addClass('active');
                break;
            case "volumen_movil.html":
                $('#active-volumen-movil a').addClass('active');
                break;
            case "volumen_movil_detalles.html":
                $('#active-volumen-movil a').addClass('active');
                break;
            case "balance.html":
                $('#active-balance a').addClass('active');
                break;
            case "ver_compras.html":
                $('#active-compras a').addClass('active');
                break;
        }
    }, cargarUsuario: function(){
        var usuario = localStorage.getItem('usernameLocal');
        $('span#loadUsernameLocal').append(" " + usuario);
    }
};
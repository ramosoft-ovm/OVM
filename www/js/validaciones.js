function ValidaRfc(rfcStr) {
	var strCorrecta;
	strCorrecta = rfcStr;

	var valid = /^([A-Z,Ñ,&]{3,4}([0-9]{2})(0[1-9]|1[0-2])(0[1-9]|1[0-9]|2[0-9]|3[0-1])[A-Z|\d]{3})$/;

	var validRfc=new RegExp(valid);
	var matchArray=strCorrecta.match(validRfc);
	if (matchArray==null) {
		return false;
	}
	else
	{
		return true;
	}
	
}

function ValidaCurp(curpStr) {
	var strCorrecta;
	strCorrecta = curpStr;	
	
	var valid = '[A-Z]{1}[AEIOU]{1}[A-Z]{2}[0-9]{2}(0[1-9]|1[0-2])(0[1-9]|1[0-9]|2[0-9]|3[0-1])[HM]{1}(AS|BC|BS|CC|CS|CH|CL|CM|DF|DG|GT|GR|HG|JC|MC|MN|MS|NT|NL|OC|PL|QT|QR|SP|SL|SR|TC|TS|TL|VZ|YN|ZS|NE)[B-DF-HJ-NP-TV-Z]{3}[0-9A-Z]{1}[0-9]{1}$';
	
	var validCurp=new RegExp(valid);
	var matchArray=strCorrecta.match(validCurp);
	if (matchArray==null) {		
		return false;
	}
	else
	{
		return true;
	}
	
}

function ValidaTelefono(telefonoStr){
	var strCorrecta;
	strCorrecta = telefonoStr;

	var valid = /^\d{10}$/;

	var validTelefono = new RegExp(valid);
	var matchArray = strCorrecta.match(validTelefono);
	if(matchArray == null){
		return false;
	}else{
		return true;
	}
}

function ValidaEmail(emailStr) {
	var strCorrecta;
	strCorrecta = emailStr;	
	
	var valid = "^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$";
	var validEmail=new RegExp(valid);
	var matchArray=strCorrecta.match(validEmail);
	if (matchArray==null) {
		return false;
	}
	else
	{
		return true;
	}
	
}

function ValidaEmails(email2){
	var emailUno = $('#txtEmail').val();

	if(email2 != emailUno){
		return false;
	}else{
		return true;
	}
}

function ValidaCP(cpStr){
	var strCorrecta;
	strCorrecta = cpStr;

	var valid = /^\d{5}$/;

	var validCP = new RegExp(valid);
	var matchArray = strCorrecta.match(validCP);
	if(matchArray == null){
		return false;
	}else{
		return true;
	}
}

function ValidaAlias(aliasStr){
	var strCorrecta;
	strCorrecta = aliasStr;

	var valid = "^[A-Za-z0-9]{0,10}$";
	var validAlias = new RegExp(valid);
	var matchArray = strCorrecta.match(validAlias);
	if(matchArray == null){
		return false;
	}else{
		return true;
	}
}

function ValidaContraseña(passwordStr){
	var strCorrecta;
	strCorrecta = passwordStr;

	var valid = "^[A-Za-z0-9]{8,12}$";
	var validPassword = new RegExp(valid);
	var matchArray = strCorrecta.match(validPassword);
	if(matchArray == null){
		return false;
	}else{
		return true;
	}
}

function ValidaContraseña2(password2){
	var passwordUno = $('#txtPassword').val();

	if(password2 != passwordUno){
		return false;
	}else{
		return true;
	}
}

function ValidaCamposVacios(){
	var rfc = $('#txtRFC').val();
	var curp = $('#txtCURP').val();
	var nombre = $('#txtNombre').val();
	var apePat = $('#txtApePat').val();
	var apeMat = $('#txtApeMat').val();
	var dia = $('#dia').val();
	var mes = $('#mes').val();
	var ano = $('#ano').val();
	var lugarNacimiento = $('#txtLugarNacimiento').val();
	var telefono = $('#txtTelefono').val();
	var email = $('#txtEmail').val();
	var emailConfirm = $('#txtConfirmEmail').val();
	var codigo = $('#txtCodigo').val();
	var metodoEnvio = $('#metodoEnvio').val();
	var centroAutorizado = $('#centroAutorizado').val();
	var kit = $('#kit').val();

	if(nombre == "" || apePat == "" || apeMat == "" || dia == "dia" || mes == "mes" || ano == "ano" || 
		lugarNacimiento == "" || telefono == "" || metodoEnvio == "" || rfc == "" || curp == "" || email == "" || 
		emailConfirm == ""){
		//alert("Campos Vacíos");
		app.showNotificactionVBC("Campos Vacíos");
		//app.showNotificactionVBC('Campos Vacíos');
	}else if(!ValidaEmails(emailConfirm)){
		app.showNotificactionVBC("* CONFIRMACIÓN EMAIL INVÁLIDO: El correo electrónico no coincide con la confirmación");
	}else if(!ValidaEmail(email)){
		app.showNotificactionVBC("* EMAIL INVÁLIDO: El correo Electrónico debe contener un @ y un punto");
	}else if(!ValidaTelefono(telefono)){
		app.showNotificactionVBC("* TELÉFONO INVÁLIDO: El Número de Teléfono debe contener 10 dígitos");
	}else if(!ValidaCurp(curp)){
		app.showNotificactionVBC("* CURP INVÁLIDO: El CURP debe contener 18 caracteres");
	}else if(!ValidaRfc(rfc)){
		app.showNotificactionVBC("* RFC INVÁLIDO: El RFC debe contener 13 caracteres");
	}else{
		window.location.href = "suscriptores3.html";
	}
}

function ValidaCamposVacios2(){
	var calle = $('#txtCalle').val();
	var num = $('#txtNum').val();
	var colonia = $('#txtColonia').val();
	var estado = $('#estado').val();
	var ciudad = $('#txtCiudad').val();
	var cp = $('#txtCP').val();

	if(calle == "" || num == "" || colonia == "" || estado == "estado" || ciudad == "" || cp == ""){
		//alert("Campos Vacíos");
		app.showNotificactionVBC('Campos Vacíos');
	}else if(!ValidaCP(cp)){
		app.showNotificactionVBC("* CÓDIGO POSTAL INVÁLIDO: El código Postal debe contener 5 dígitos");
	}
	else{
		window.location.href = "suscriptores4.html";
	}
}



function ValidaCamposVacios3(){
	var alias = $('#txtAlias').val();
	var password = $('#txtPassword').val();
	var passwordConfirm = $('#txtPasswordConfirm').val();

	if(alias == "" || password == "" || passwordConfirm == ""){
		app.showNotificactionVBC('Campos Vacíos');
		return false;
	}else if(!ValidaContraseña2(passwordConfirm)){
		app.showNotificactionVBC('* CONFIRMACIÓN DE CONTRASEÑA INVÁLIDA: La contraseña no coincide con la confirmación');
		return false;
	}else if(!ValidaContraseña(password)){
		app.showNotificactionVBC('* CONTRASEÑA INVÁLIDA: La contraseña solo puede contener números y letras y no debe ser menor que 8 ni mayor que 12 caracteres');
		return false;
	}else if(!ValidaAlias(alias)){
		app.showNotificactionVBC('* CONFIRMACIÓN DE CONTRASEÑA INVÁLIDA: El Alias es muy largo o contiene caracteres no válidos');
		return false;
	}else{
		return true;
	}

}
///////////////////////////////////////////////////////
/*************** Extrae variables GET ****************/
function getByURL() {
    var url = location.search.replace("?", "");
        var encontrada = 0;
        while(encontrada == 0) {
            if (url.indexOf("%20") >= 0) {
                url = url.replace("%20"," ");
            } else {
                encontrada = 1;
            }
        }
    var arrUrl = url.split("&");
    var urlObject = {};
    for (var i = 0; i<arrUrl.length; i++) {
        var x= arrUrl[i].split("=");
        urlObject[x[0]]=x[1];
    }
    return urlObject;
}
///////////////////////////////////////////////////////
/************* Elimina >< de un string ***************/
function depurarXML(xml) {
    var encontrada = 0;
    while(encontrada == 0) {
        if (xml.indexOf("<") >= 0 || xml.indexOf(">") >= 0) {
            xml = xml.replace("<","&lt;");
            xml = xml.replace(">","&gt;");
        } else {
            encontrada = 1;
        }
    }
    return xml;
}
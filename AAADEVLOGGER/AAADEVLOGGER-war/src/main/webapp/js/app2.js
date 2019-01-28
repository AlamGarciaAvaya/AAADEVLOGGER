/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

//Absolute Path 14/01/2019
var absolutepath = getAbsolutePath();
console.log(absolutepath);
function getAbsolutePath() {
    var loc = window.location;
    var pathName = loc.pathname.substring(0, loc.pathname.lastIndexOf('/') + 1);
    return loc.href.substring(0, loc.href.length - ((loc.pathname + loc.search + loc.hash).length - pathName.length));
}


validarSession();

function validarSession() {
    var session = sessionStorage.getItem('usuarioActivo');
    console.log(session);
    var section = document.getElementById('section');
    section.className += 'activeLink';
    if (session === "true") {
        obtenerDesdeBreeze();
    } else {
        window.location.href = "index.html";
    }

}
/*
 * 
 * Función para obtener la hora
 */
function mueveReloj() {

    var today = new Date();
    var todayThreeMinutesLess = new Date();
    today = todayThreeMinutesLess.toLocaleString('en-US', {timeZone: 'America/Denver', hour12: false}).replace(', ', ' ');

    horaImprimible = "Time Denver " + today;

    document.form_reloj.reloj.value = horaImprimible;
    setTimeout("mueveReloj()", 1000);
}


function cerrarSesion() {
    sessionStorage.clear();
}


var acc = document.getElementsByClassName("accordion");
var tableNumber = 0;
var sortColum = 0;
var tbodyNumber = 0;
function obtenerDesdeBreeze() {

    var data = null;
    var xhr = new XMLHttpRequest();
    xhr.withCredentials = false;

    xhr.addEventListener("readystatechange", function () {
        if (this.readyState === 4) {
            console.log(this.responseText);

            let archivosTexto = JSON.parse(this.responseText);

            for (let archivo = 0; archivo <= Object.keys(archivosTexto).length - 1; archivo++) {
                let nuevoButton = document.createElement('BUTTON');
                let nombreTexto = document.createTextNode(archivosTexto["Index " + archivo + ""]);
                nuevoButton.appendChild(nombreTexto);
                nuevoButton.setAttribute("class", "accordion " + archivosTexto["Index " + archivo + ""]);
                let nuevoDiv = document.createElement('DIV');
                nuevoDiv.setAttribute("class", "panel");

                /*
                 * 
                 * Botones
                 */
                let divBotones = document.createElement('DIV');
                divBotones.setAttribute("class", "btn-group btn-group-lg");
                //BOTON RELOAD    
                let botonReload = document.createElement('BUTTON');
                botonReload.setAttribute("type", "button");
                botonReload.setAttribute("class", "btn btn-primary");
                botonReload.setAttribute("onclick", "validar()");
                let textoBotonReload = document.createTextNode("Reload");
                botonReload.appendChild(textoBotonReload);
                //BOTON BORRAR    
                let botonBorrar = document.createElement('BUTTON');
                botonBorrar.setAttribute("type", "button");
                botonBorrar.setAttribute("class", "btn btn-danger");
                botonBorrar.setAttribute("id", archivosTexto["Index " + archivo + ""] + "borrar");
                let textoBotonBorrar = document.createTextNode("Delete");
                botonBorrar.appendChild(textoBotonBorrar);

//                //BOTON DESCARGAR TXT
//                let botonDescargartxt = document.createElement('BUTTON');
//                botonDescargartxt.setAttribute("type", "button");
//                botonDescargartxt.setAttribute("class", "btn btn-default txt");
//                botonDescargartxt.setAttribute("tableexport-id", "6d0b00a3-txt");
//                let textoBotonDescargar = document.createTextNode("Download .txt");
//                botonDescargartxt.appendChild(textoBotonDescargar);
//
//                //BOTON DESCARGAR XLX
//                let botonDescargarxlx = document.createElement('BUTTON');
//                botonDescargarxlx.setAttribute("type", "button");
//                botonDescargarxlx.setAttribute("class", "btn btn-default xls");
//                botonDescargarxlx.setAttribute("tableexport-id", "6cd81ad4-xls");
//                let textoBotonDescargarxlx = document.createTextNode("Download .xlx");
//                botonDescargarxlx.appendChild(textoBotonDescargarxlx);


                divBotones.appendChild(botonReload);
                divBotones.appendChild(botonBorrar);
//                divBotones.appendChild(botonDescargartxt);
//                divBotones.appendChild(botonDescargarxlx);

                /*
                 * 
                 * Creación de la tabla
                 */
                let table = document.createElement('TABLE');
                table.setAttribute("class", "table table-striped table-sm");
                table.setAttribute("id", "TableNumber" + tableNumber + "");
                tableNumber = tableNumber + 1;
                table.setAttribute("style", "text-align:center;");
                /*
                 * 
                 * Creación del Thead
                 */
                let thead = document.createElement('THEAD');
                let tr = document.createElement('TR');


                //TH-FECHA
                let thFecha = document.createElement('TH');
                thFecha.setAttribute("id", "Fecha");
                let iFecha = document.createElement('i');
                iFecha.setAttribute("class", "fa fa-sort float-right");
                iFecha.setAttribute("id", "sortColumn" + sortColum + "");
                sortColum = sortColum + 1;
                iFecha.setAttribute("onClick", "sort(this.id)");
                iFecha.setAttribute("aria-hidden", "true");
                let thFechaTexto = document.createTextNode("Date");
                thFecha.appendChild(iFecha);
                thFecha.appendChild(thFechaTexto);


                //TH-HORA
                let thHora = document.createElement('TH');
                thHora.setAttribute("id", "Hora");
                let iHora = document.createElement('i');
                iHora.setAttribute("class", "fa fa-sort float-right");
                iHora.setAttribute("id", "sortColumn" + sortColum + "");
                sortColum = sortColum + 1;
                iHora.setAttribute("onClick", "sort(this.id)");
                iHora.setAttribute("aria-hidden", "true");
                let thHoraTexto = document.createTextNode("Time");
                thHora.appendChild(iHora);
                thHora.appendChild(thHoraTexto);


                //TH-NOMBRE
                let thNombre = document.createElement('TH');
                thNombre.setAttribute("id", "Nombre");
                let iNombre = document.createElement('i');
                iNombre.setAttribute("class", "fa fa-sort float-right icon");
                iNombre.setAttribute("id", "sortColumn" + sortColum + "");
                sortColum = sortColum + 1;
                iNombre.setAttribute("onClick", "sort(this.id)");
                iNombre.setAttribute("aria-hidden", "true");
                let thNombreTexto = document.createTextNode("Work Flow Name");
                thNombre.appendChild(iNombre);
                thNombre.appendChild(thNombreTexto);


                //TH-VERSION
                let thVersion = document.createElement('TH');
                let thVersionTexto = document.createTextNode("Version");
                thVersion.appendChild(thVersionTexto);


                //TH-Numero-Instancia
                let thNumInstancia = document.createElement('TH');
                thNumInstancia.setAttribute("id", "Instancia");
                let iNumInstancia = document.createElement('i');
                iNumInstancia.setAttribute("class", "fa fa-sort float-right icon");
                iNumInstancia.setAttribute("id", "sortColumn" + sortColum + "");
                sortColum = sortColum + 1;
                iNumInstancia.setAttribute("onClick", "sort(this.id)");
                iNumInstancia.setAttribute("aria-hidden", "true");
                let thNumInstanciaTexto = document.createTextNode("Instance");
                thNumInstancia.appendChild(iNumInstancia);
                thNumInstancia.appendChild(thNumInstanciaTexto);

                //TH-NIVEL
                let thNivel = document.createElement('TH');
                let thNivelTexto = document.createTextNode("Level");
                thNivel.appendChild(thNivelTexto);

                //TH-LABEL
                let thLabel = document.createElement('TH');
                let thLabelTexto = document.createTextNode("Label");
                thLabel.appendChild(thLabelTexto);

                //TH-MENSJAE
                let thMensaje = document.createElement('TH');
                let thMensajeTexto = document.createTextNode("Message");
                thMensaje.appendChild(thMensajeTexto);

                //TBODY-Creanto atributos
                let tbody = document.createElement('TBODY');
                tbody.setAttribute("class", "tbody " + archivosTexto["Index " + archivo + ""]);
                tbody.setAttribute("id", archivosTexto["Index " + archivo + ""]);

                tr.appendChild(thFecha);
                tr.appendChild(thHora);
                tr.appendChild(thNombre);
                tr.appendChild(thVersion);
                tr.appendChild(thNumInstancia);
                tr.appendChild(thNivel);
                tr.appendChild(thLabel);
                tr.appendChild(thMensaje);
                thead.appendChild(tr);
                table.appendChild(thead);
                table.appendChild(tbody);
                nuevoDiv.appendChild(table);



                document.body.appendChild(divBotones);
                document.body.appendChild(nuevoButton);

                document.body.appendChild(nuevoDiv);


                obtenerLogs(archivosTexto["Index " + archivo + ""]);


                //BORRAR ARCHIVO
                document.getElementById(archivosTexto["Index " + archivo + ""] + "borrar").addEventListener('click', function () {
                    var data = null;
                    var xhr = new XMLHttpRequest();
                    xhr.withCredentials = false;
                    xhr.addEventListener("readystatechange", function () {
                        if (this.readyState === 4) {
                            console.log(this.responseText);
                            obtenerDesdeBreeze();
                        }
                    });
                    xhr.open("DELETE", absolutepath+"InputLogger/web/Log/" + archivosTexto["Index " + archivo + ""]);
                    xhr.send(data);
                }, false);

            }

            Accordion();



        }

    });


    xhr.open("GET", absolutepath+"Grabaciones/web/Log/");

    xhr.send(data);

}




function descargarArchivo(nombreArchivo) {

}


/*
 * Acordion
 */
function Accordion() {
    for (var i = 0; i < acc.length; i++) {
        acc[i].addEventListener("click", function () {
            /* Toggle between adding and removing the "active" class,
             to highlight the button that controls the panel */
            console.log(this.classList[1]);
            var nombreArchivo = this.classList[1];
            this.classList.toggle("active");

            /* Toggle between hiding and showing the active panel */
            var panel = this.nextElementSibling;
            if (panel.style.display === "block") {
                console.log("dentro");
                panel.style.display = "none";
            } else {

                panel.style.display = "block";




            }

        });
    }

}

var obtenerLogsVar = 0;
function obtenerLogs(nombreArchivo) {
    var data = null;

    var xhr = new XMLHttpRequest();
    xhr.withCredentials = false;

    xhr.addEventListener("readystatechange", function () {
        if (this.readyState === 4) {
//        console.log(this.responseText);

            // By lines
            var lines = this.responseText.split('\n');

            for (var line = 0; line < lines.length - 1; line++) {
//            console.log(lines[line]);
                var fecha = lines[line].split(' ');
//            console.log("fecha[1]" + line)
//            console.log(fecha);
                let hora = fecha[1].split('_');
//            console.log(hora[0]);



                var tbody = document.getElementById(nombreArchivo); //<tbody>

                let nuevoTBodyTr = document.createElement("tr");

                for (let j = 1; j <= 8; j++) {
                    let nuevoTrTd = document.createElement("td");
                    if (j === 1) {
                        let tdfecha = document.createElement('td');
                        var texto = document.createTextNode(fecha[0]);
                        tdfecha.appendChild(texto);
                        nuevoTrTd.appendChild(tdfecha);
                    }
                    if (j === 2) {
                        let tdHora = document.createElement('td');
                        var texto = document.createTextNode(hora[0]);
                        tdHora.appendChild(texto);
                        nuevoTrTd.appendChild(tdHora);
                    }
                    if (j === 3) {
                        let tdNombre = document.createElement('td');
                        var texto = document.createTextNode(hora[1]);
                        tdNombre.appendChild(texto);
                        nuevoTrTd.appendChild(tdNombre);
                    }
                    if (j === 4) {
                        let tdVersion = document.createElement('td');
                        var texto = document.createTextNode(hora[2]);
                        tdVersion.appendChild(texto);
                        nuevoTrTd.appendChild(tdVersion);
                    }
                    if (j === 5) {
                        let tdInstance = document.createElement('td');
                        var texto = document.createTextNode(hora[3]);
                        tdInstance.appendChild(texto);
                        nuevoTrTd.appendChild(tdInstance);
                    }
                    if (j === 6) {
                        let tdNivel = document.createElement('td');
                        var texto = document.createTextNode(fecha[2]);
                        tdNivel.appendChild(texto);
                        nuevoTrTd.appendChild(tdNivel);
                    }
                    if (j === 7) {
                        let tdNivel = document.createElement('td');
                        var texto = document.createTextNode(hora[4]);
                        tdNivel.appendChild(texto);
                        nuevoTrTd.appendChild(tdNivel);

                    }
                    if (j === 8) {

                        var mensaje = lines[line].split(' ');
                        var appendMensaje = [];
                        for (let k = 3; k <= mensaje.length; k++) {
                            appendMensaje.push(
                                    mensaje[k]
                                    );
                        }
                        var append = appendMensaje.join(' ');
                        let tdMensaje = document.createElement('td');
                        var texto = document.createTextNode(append);
                        tdMensaje.appendChild(texto);
                        nuevoTrTd.appendChild(tdMensaje);
                    }
                    nuevoTBodyTr.appendChild(nuevoTrTd);
                }
                tbody.appendChild(nuevoTBodyTr);
            }
            var archivo = nombreArchivo.replace(".txt", "");
            $("#TableNumber"+obtenerLogsVar.toString()).tableExport({
                headings: true, // (Boolean), display table headings (th/td elements) in the <thead>
                formats: ["xls", "txt"], // (String[]), filetypes for the export
                fileName: archivo, // (id, String), filename for the downloaded file
                bootstrap: true, // (Boolean), style buttons using bootstrap
                position: "top", // (top, bottom), position of the caption element relative to table
                ignoreRows: null, // (Number, Number[]), row indices to exclude from the exported file(s)
                ignoreCols: null, // (Number, Number[]), column indices to exclude from the exported file(s)
                ignoreCSS: ".tableexport-ignore", // (selector, selector[]), selector(s) to exclude from the exported file(s)
                emptyCSS: ".tableexport-empty", // (selector, selector[]), selector(s) to replace cells with an empty string in the exported file(s)
                trimWhitespace: false              // (Boolean), remove all leading/trailing newlines, spaces, and tabs from cell text in the exported file(s)
            });
            
            obtenerLogsVar = obtenerLogsVar + 1;
        }
    });

    xhr.open("GET", absolutepath+"InputLogger/web/Log/" + nombreArchivo);
    xhr.send(data);

}


/*
 * Recargar tabla
 */
function validar() {
    $(".tbody").empty();
    for (var k = 0; k < acc.length; k++) {
        obtenerLogs(acc[k].classList[1]);
    }
}

/*
 * 
 * @param {type} contenidoEnBlob
 * @param {type} nombreArchivo
 * @returns {undefined}
 * Funcion se utiliza para descargar archivo
 */
function descargarArchivo(contenidoEnBlob, nombreArchivo) {
    var reader = new FileReader();
    reader.onload = function (event) {
        var save = document.createElement('a');
        save.href = event.target.result;
        save.target = '_blank';
        save.download = nombreArchivo || 'Logger.dat';
        var clicEvent = new MouseEvent('click', {
            'view': window,
            'bubbles': true,
            'cancelable': true
        });
        save.dispatchEvent(clicEvent);
        (window.URL || window.webkitURL).revokeObjectURL(save.href);
    };
    reader.readAsDataURL(contenidoEnBlob);
}
/*
 * 
 * @param {type} datos
 * @returns {Blob}
 * Crear el archivo con formato text/plain
 */
function generarTexto(datos) {
    var texto = [];
    texto.push(datos);
    //El contructor de Blob requiere un Array en el primer parámetro
    //así que no es necesario usar toString. el segundo parámetro
    //es el tipo MIME del archivo
    return new Blob(texto, {
        type: 'text/plain'
    });
}

function sort(id) {
    var column = document.getElementById(id).parentElement.parentElement.parentElement.parentElement;
    var th = document.getElementById(id).parentElement;
    if (th.id === 'Fecha') {
        sortTable(column.id, 1);
    }
    if (th.id === 'Hora') {
        sortTable(column.id, 3);
    }
    if (th.id === "Nombre") {
        sortTable(column.id, 5);
    }
    if (th.id === "Instancia") {
        sortTable(column.id, 9);
    }


//    sortTable(column.id, 9);
}


function sortTable(tableId, n) {
    var table, rows, switching, i, x, y, shouldSwitch, dir, switchcount = 0;
    table = document.getElementById(tableId);
    switching = true;
    // Set the sorting direction to ascending:
    dir = "asc";
    /* Make a loop that will continue until
     no switching has been done: */
    while (switching) {
        // Start by saying: no switching is done:
        switching = false;
        rows = table.rows;
        /* Loop through all table rows (except the
         first, which contains table headers): */
        for (i = 1; i < (rows.length - 1); i++) {
            // Start by saying there should be no switching:
            shouldSwitch = false;
            /* Get the two elements you want to compare,
             one from current row and one from the next: */
            x = rows[i].getElementsByTagName("TD")[n];
            y = rows[i + 1].getElementsByTagName("TD")[n];
            /* Check if the two rows should switch place,
             based on the direction, asc or desc: */
            if (dir === "asc") {
                if (x.innerHTML.toLowerCase() > y.innerHTML.toLowerCase()) {
                    // If so, mark as a switch and break the loop:
                    shouldSwitch = true;
                    break;
                }
            } else if (dir === "desc") {
                if (x.innerHTML.toLowerCase() < y.innerHTML.toLowerCase()) {
                    // If so, mark as a switch and break the loop:
                    shouldSwitch = true;
                    break;
                }
            }
        }
        if (shouldSwitch) {
            /* If a switch has been marked, make the switch
             and mark that a switch has been done: */
            rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
            switching = true;
            // Each time a switch is done, increase this count by 1:
            switchcount++;
        } else {
            /* If no switching has been done AND the direction is "asc",
             set the direction to "desc" and run the while loop again. */
            if (switchcount === 0 && dir === "asc") {
                dir = "desc";
                switching = true;
            }
        }
    }
}



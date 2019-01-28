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

    } else {
        window.location.href = "index.html";
    }

}

function cerrarSesion() {
    sessionStorage.clear();
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

//Obtener datos del formulario
var sumbit = document.getElementById('submit_linux_command');
var formulario = document.getElementById('fomulario_linux_command');
var action = formulario.getAttribute('action');

//Variables para asignar EventListener a los botones con clase accordeon
var acc = document.getElementsByClassName("accordion");
let contador = 0;

/*
 * Acordion
 */
function Accordion() {
//    console.log(acc);
    for (var i = 0; i < acc.length; i++) {
//        console.log("accordion");

        acc[i].addEventListener("click", function () {
            /* Toggle between adding and removing the "active" class,
             to highlight the button that controls the panel */
            console.log(this.classList[1]);
            var nombreArchivo = this.classList[1];
            this.classList.toggle("active");

            /* Toggle between hiding and showing the active panel */
            var panel = this.nextElementSibling;
//            console.log(panel);
            if (panel.style.display === "block") {
//                console.log("panel.style.display === block");
                panel.style.display = "none";
            } else {
//                console.log("else");
                panel.style.display = "block";
            }

        });
    }

}
var tableNumber = 0;

function doGetCommand() {
    var fomulario = new FormData(formulario);
//    console.log(formulario);
    var object = {};
    fomulario.forEach(function (value, key) {
        object[key] = value;
    });
//    console.log(object.number);
//    console.log(object.servicio);
//    console.log(object.archivo);
    var data = null;
    var xhr = new XMLHttpRequest();
    xhr.withCredentials = false;

    xhr.addEventListener("readystatechange", function () {
        if (this.readyState === 4) {
            var lines = this.responseText.split('\n');

            let nuevoButton = document.createElement('BUTTON');
            let nombreTexto = document.createTextNode(object.command);
            nuevoButton.appendChild(nombreTexto);
            nuevoButton.setAttribute("class", "accordion " + contador);
            let nuevoDiv = document.createElement('DIV');
            nuevoDiv.setAttribute("class", "panel");
//            /*
//             * 
//             * Botones
//             */
//            let divBotones = document.createElement('DIV');
//            divBotones.setAttribute("class", "btn-group btn-group-lg");
//            //BOTON DESCARGAR
//            let botonDescargar = document.createElement('BUTTON');
//            botonDescargar.setAttribute("type", "button");
//            botonDescargar.setAttribute("class", "btn btn-default");
//            botonDescargar.setAttribute("id", contador + "descargar");
//            let textoBotonDescargar = document.createTextNode("Descargar");
//            botonDescargar.appendChild(textoBotonDescargar);

//            divBotones.appendChild(botonDescargar);
            /*
             * 
             * Creación de la tabla
             */
            let table = document.createElement('TABLE');
            table.setAttribute("class", "table table-striped table-sm");
            table.setAttribute("id", "command" + tableNumber);


            let thead = document.createElement('THEAD');
            let tr = document.createElement('TR');
            //TH-RESULTADOS
            let thResultados = document.createElement('TH');
            thResultados.setAttribute("id", "th-sm" + contador);
            let iResultados = document.createElement('i');
            iResultados.setAttribute("class", "fa fa-sort float-right");
            iResultados.setAttribute("aria-hidden", "true");
            let thResultadosTexto = document.createTextNode("Resultados");
            thResultados.appendChild(iResultados);
            thResultados.appendChild(thResultadosTexto);
            //TH-Numero-Resultados
            let thlineas = document.createElement('TH');
            thlineas.setAttribute("id", "th-sm1" + contador);
            let ilineas = document.createElement('i');
            ilineas.setAttribute("class", "fa fa-sort float-right");
            ilineas.setAttribute("aria-hidden", "true");
            let thHoraTexto = document.createTextNode("Líneas");
            thlineas.appendChild(ilineas);
            thlineas.appendChild(thHoraTexto);

            //TBODY-Creanto atributos
            let tbody = document.createElement('TBODY');
            tbody.setAttribute("class", "tbody " + contador);
            tbody.setAttribute("id", contador);

            tr.appendChild(thlineas);
            tr.appendChild(thResultados);



            thead.appendChild(tr);
            table.appendChild(thead);
            table.appendChild(tbody);
            nuevoDiv.appendChild(table);

//            document.body.appendChild(divBotones);
            document.body.appendChild(nuevoButton);
            document.body.appendChild(nuevoDiv);




            for (var line = 0; line < lines.length - 1; line++) {

                var tbodyelement = document.getElementById(contador); //<tbody>
                let nuevoTBodyTr = document.createElement("tr");

                for (let j = 1; j <= 2; j++) {
                    let nuevoTrTd = document.createElement("td");
                    if (j === 1) {
                        let tdlines = document.createElement('td');
                        var texto = document.createTextNode(line.toString());
                        tdlines.appendChild(texto);
                        nuevoTrTd.appendChild(tdlines);
                    }
                    if (j === 2) {
                        let tdLogs = document.createElement('td');
                        var texto = document.createTextNode(lines[line]);
                        tdLogs.appendChild(texto);
                        nuevoTrTd.appendChild(tdLogs);
                    }
                    nuevoTBodyTr.appendChild(nuevoTrTd);
                }
                tbody.appendChild(nuevoTBodyTr);
            }

//            //DESCARGAR ARCHIVO
//            document.getElementById(contador + "descargar").addEventListener('click', function () {
//                var data = null;
//                var xhr = new XMLHttpRequest();
//                xhr.withCredentials = false;
//
//                xhr.addEventListener("readystatechange", function () {
//                    if (this.readyState === 4) {
//                        var lines = this.responseText.split('\n');
//                        descargarArchivo(generarTexto(lines), contador);
//                    }
//                });
//
//                xhr.open("GET", absolutepath+"Command?command=" + object.command);
//                xhr.send(data);
//
//            }, false);


            acc[contador].addEventListener("click", function () {
                /* Toggle between adding and removing the "active" class,
                 to highlight the button that controls the panel */
//                console.log(this.classList[1]);
                var nombreArchivo = this.classList[1];
                this.classList.toggle("active");

                /* Toggle between hiding and showing the active panel */
                var panel = this.nextElementSibling;
//                console.log(panel);
                if (panel.style.display === "block") {
//                    console.log("panel.style.display === block");
                    panel.style.display = "none";
                } else {
//                    console.log("else");
                    panel.style.display = "block";
                }

            });
            $("#command" +tableNumber.toString()).tableExport({
                headings: true, // (Boolean), display table headings (th/td elements) in the <thead>
                formats: ["xls", "txt"], // (String[]), filetypes for the export
                fileName: String, // (id, String), filename for the downloaded file
                bootstrap: true, // (Boolean), style buttons using bootstrap
                position: "top", // (top, bottom), position of the caption element relative to table
                ignoreRows: null, // (Number, Number[]), row indices to exclude from the exported file(s)
                ignoreCols: null, // (Number, Number[]), column indices to exclude from the exported file(s)
                ignoreCSS: ".tableexport-ignore", // (selector, selector[]), selector(s) to exclude from the exported file(s)
                emptyCSS: ".tableexport-empty", // (selector, selector[]), selector(s) to replace cells with an empty string in the exported file(s)
                trimWhitespace: false              // (Boolean), remove all leading/trailing newlines, spaces, and tabs from cell text in the exported file(s)
            });
            contador++;
            tableNumber++;
        }

    });

    xhr.open("GET", absolutepath+"Command?command=" + object.command);
    xhr.send(data);

}

//Event Listener al botón Submit
sumbit.addEventListener('click', function (e) {
    e.preventDefault();
    doGetCommand();
});

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
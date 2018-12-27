/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

validarSession();

function validarSession() {
    var session = sessionStorage.getItem('usuarioActivo');
    console.log(session);
    if (session === "true") {
       
    } else {
        window.location.href = "index.html";
    }

}
function cerrarSesion() {
    sessionStorage.clear();
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
            if (panel.style.display === "block") {
    
                panel.style.display = "none";
            } else {

                panel.style.display = "block";




            }

        });
    }

}

function doGetAAAEngagementLogs() {
    var fomulario = new FormData(formulario);
//    console.log(formulario);
    var object = {};
    fomulario.forEach(function (value, key) {
        object[key] = value;
    });
//    console.log(object.filter);
//    console.log(object.number);
//    var json = JSON.stringify(object);
    var data = null;

    var xhr = new XMLHttpRequest();
    xhr.withCredentials = false;

    xhr.addEventListener("readystatechange", function () {
        if (this.readyState === 4) {


            var lines = this.responseText.split('\n');
//            console.log(lines);

            var contenidoLogs = this.responseText;

            let nuevoButton = document.createElement('BUTTON');
            let nombreTexto = document.createTextNode(object.filter);
            nuevoButton.appendChild(nombreTexto);
            nuevoButton.setAttribute("class", "accordion " + object.filter);
            let nuevoDiv = document.createElement('DIV');
            nuevoDiv.setAttribute("class", "panel");
            /*
             * 
             * Botones
             */
            let divBotones = document.createElement('DIV');
            divBotones.setAttribute("class", "btn-group btn-group-lg");
            //BOTON DESCARGAR
            let botonDescargar = document.createElement('BUTTON');
            botonDescargar.setAttribute("type", "button");
            botonDescargar.setAttribute("class", "btn btn-default");
            botonDescargar.setAttribute("id", object.filter + "descargar");
            let textoBotonDescargar = document.createTextNode("Descargar");
            botonDescargar.appendChild(textoBotonDescargar);

            divBotones.appendChild(botonDescargar);
            /*
             * 
             * Creación de la tabla
             */
            let table = document.createElement('TABLE');
            table.setAttribute("class", "table table-striped table-sm");
            table.setAttribute("id", "dtBasicExample");


            let thead = document.createElement('THEAD');
            let tr = document.createElement('TR');
            //TH-RESULTADOS
            let thResultados = document.createElement('TH');
            thResultados.setAttribute("id", "th-sm" + object.filter);
            let iResultados = document.createElement('i');
            iResultados.setAttribute("class", "fa fa-sort float-right");
            iResultados.setAttribute("aria-hidden", "true");
            let thResultadosTexto = document.createTextNode("Resultados");
            thResultados.appendChild(iResultados);
            thResultados.appendChild(thResultadosTexto);
            //TH-Numero-Resultados
            let thlineas = document.createElement('TH');
            thlineas.setAttribute("id", "th-sm1" + object.filter);
            let ilineas = document.createElement('i');
            ilineas.setAttribute("class", "fa fa-sort float-right");
            ilineas.setAttribute("aria-hidden", "true");
            let thHoraTexto = document.createTextNode("Líneas");
            thlineas.appendChild(ilineas);
            thlineas.appendChild(thHoraTexto);

            //TBODY-Creanto atributos
            let tbody = document.createElement('TBODY');
            tbody.setAttribute("class", "tbody " + object.filter);
            tbody.setAttribute("id", object.filter);

            tr.appendChild(thlineas);
            tr.appendChild(thResultados);



            thead.appendChild(tr);
            table.appendChild(thead);
            table.appendChild(tbody);
            nuevoDiv.appendChild(table);

            document.body.appendChild(divBotones);
            document.body.appendChild(nuevoButton);
            document.body.appendChild(nuevoDiv);




            for (var line = 0; line < lines.length - 1; line++) {

                var tbodyelement = document.getElementById(object.filter); //<tbody>
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
                tbodyelement.appendChild(nuevoTBodyTr);
            }

            //DESCARGAR ARCHIVO
            document.getElementById(object.filter + "descargar").addEventListener('click', function () {
                var data = null;

                var xhr = new XMLHttpRequest();
                xhr.withCredentials = false;

                xhr.addEventListener("readystatechange", function () {
                    if (this.readyState === 4) {
                        var lines = this.responseText.split('\n');
                        descargarArchivo(generarTexto(lines), object.filter);
                    }
                });

                xhr.open("GET", "https://breeze2-132.collaboratory.avaya.com/services/AAADEVLOGGER/EngagementDesignerLogs?number=" + object.number + "&filter=" + object.filter);
                xhr.send(data);

            }, false);



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
            contador++;

        }
    });

    xhr.open("GET", "https://breeze2-132.collaboratory.avaya.com/services/AAADEVLOGGER/EngagementDesignerLogs?number=" + object.number + "&filter=" + object.filter);

    xhr.send(data);

}

//Event Listener al botón Submit
sumbit.addEventListener('click', function (e) {
    e.preventDefault();
    doGetAAAEngagementLogs();
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

/*
 * 
 * @returns {undefined}
 * función para acomodar la fehca
 */
function acomodarValores() {
//    console.log("Acomodar Valores");
    var table, rows, switching, i, x, y, shouldSwitch, dir, switchcount = 0;
    table = document.getElementById("dtBasicExample");
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
            n = 0;
            x = rows[i].getElementsByTagName("TD")[n];
//            console.log(x);
            y = rows[i + 1].getElementsByTagName("TD")[n];
//            console.log(y);
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
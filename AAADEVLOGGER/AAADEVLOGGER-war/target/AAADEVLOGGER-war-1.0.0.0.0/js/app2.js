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
        obtenerDesdeBreeze();
    } else {
        window.location.href = "index.html";
    }

}


function cerrarSesion() {
    sessionStorage.clear();
}

var acc = document.getElementsByClassName("accordion");




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
                let textoBotonReload = document.createTextNode("Recargar");
                botonReload.appendChild(textoBotonReload);
                //BOTON BORRAR    
                let botonBorrar = document.createElement('BUTTON');
                botonBorrar.setAttribute("type", "button");
                botonBorrar.setAttribute("class", "btn btn-danger");
                botonBorrar.setAttribute("id", archivosTexto["Index " + archivo + ""] + "borrar");
                let textoBotonBorrar = document.createTextNode("Borrar");
                botonBorrar.appendChild(textoBotonBorrar);

                //BOTON DESCARGAR
                let botonDescargar = document.createElement('BUTTON');
                botonDescargar.setAttribute("type", "button");
                botonDescargar.setAttribute("class", "btn btn-default");
                botonDescargar.setAttribute("id", archivosTexto["Index " + archivo + ""] + "descargar");
                let textoBotonDescargar = document.createTextNode("Descargar");
                botonDescargar.appendChild(textoBotonDescargar);

                divBotones.appendChild(botonReload);
                divBotones.appendChild(botonBorrar);
                divBotones.appendChild(botonDescargar);
                /*
                 * 
                 * Creación de la tabla
                 */
                let table = document.createElement('TABLE');
                table.setAttribute("class", "table table-striped table-sm");
                table.setAttribute("id", "dtBasicExample");
                table.setAttribute("style", "text-align:center;");
                /*
                 * 
                 * Creación del Thead
                 */
                let thead = document.createElement('THEAD');
                let tr = document.createElement('TR');
                //TH-FECHA
                let thFecha = document.createElement('TH');
                thFecha.setAttribute("id", "th-sm" + archivo);
                let iFecha = document.createElement('i');
                iFecha.setAttribute("class", "fa fa-sort float-right");
                iFecha.setAttribute("aria-hidden", "true");
                let thFechaTexto = document.createTextNode("Fecha");
                thFecha.appendChild(iFecha);
                thFecha.appendChild(thFechaTexto);
                //TH-HORA
                let thHora = document.createElement('TH');
                thHora.setAttribute("id", "th-sm" + (archivo + 1));
                let iHora = document.createElement('i');
                iHora.setAttribute("class", "fa fa-sort float-right");
                iHora.setAttribute("aria-hidden", "true");
                let thHoraTexto = document.createTextNode("Hora");
                thHora.appendChild(iHora);
                thHora.appendChild(thHoraTexto);
                //TH-NOMBRE
                let thNombre = document.createElement('TH');
                thNombre.setAttribute("id", "th-sm" + (archivo + 2));
                let iNombre = document.createElement('i');
                iNombre.setAttribute("class", "fa fa-sort float-right");
                iNombre.setAttribute("aria-hidden", "true");
                let thNombreTexto = document.createTextNode("Nombre");
                thNombre.appendChild(iNombre);
                thNombre.appendChild(thNombreTexto);
                //TH-VERSION
                let thVersion = document.createElement('TH');
                thVersion.setAttribute("id", "th-sm" + (archivo + 3));
                let iVersion = document.createElement('i');
                iVersion.setAttribute("class", "fa fa-sort float-right");
                iVersion.setAttribute("aria-hidden", "true");
                let thVersionTexto = document.createTextNode("Version");
                thVersion.appendChild(iVersion);
                thVersion.appendChild(thVersionTexto);
                //TH-Numero-Instancia
                let thNumInstancia = document.createElement('TH');
                thNumInstancia.setAttribute("id", "th-sm" + (archivo + 4));
                let iNumInstancia = document.createElement('i');
                iNumInstancia.setAttribute("class", "fa fa-sort float-right");
                iNumInstancia.setAttribute("aria-hidden", "true");
                let thNumInstanciaTexto = document.createTextNode("Numero de Instancia");
                thNumInstancia.appendChild(iNumInstancia);
                thNumInstancia.appendChild(thNumInstanciaTexto);
                //TH-NIVEL
                let thNivel = document.createElement('TH');
                thNivel.setAttribute("id", "th-sm" + archivo);
                let iNivel = document.createElement('i');
                iNivel.setAttribute("class", "fa fa-sort float-right");
                iNivel.setAttribute("aria-hidden", "true");
                let thNivelTexto = document.createTextNode("Nivel");
                thNivel.appendChild(iNivel);
                thNivel.appendChild(thNivelTexto);
                //TH-LABEL
                let thLabel = document.createElement('TH');
                let thLabelTexto = document.createTextNode("Label");
                thLabel.appendChild(thLabelTexto);
                //TH-MENSJAE
                let thMensaje = document.createElement('TH');
                let thMensajeTexto = document.createTextNode("Mensaje");
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


                //DESCARGAR ARCHIVO
                document.getElementById(archivosTexto["Index " + archivo + ""] + "descargar").addEventListener('click', function () {
                    var data = null;

                    var xhr = new XMLHttpRequest();
                    xhr.withCredentials = false;

                    xhr.addEventListener("readystatechange", function () {
                        if (this.readyState === 4) {
                            var lines = this.responseText.split('\n');
                            descargarArchivo(generarTexto(lines), archivosTexto["Index " + archivo + ""]);
                        }
                    });

                    xhr.open("GET", "https://breeze2-132.collaboratory.avaya.com/services/AAADEVLOGGER/InputLogger/web/Transcript/" + archivosTexto["Index " + archivo + ""]);
                    xhr.send(data);

                }, false);


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
                    xhr.open("DELETE", "https://breeze2-132.collaboratory.avaya.com/services/AAADEVLOGGER/InputLogger/web/Transcript/" + archivosTexto["Index " + archivo + ""]);
                    xhr.send(data);
                }, false);

                var acomodarFecha = document.getElementById('th-sm0');
                var acomodarHora = document.getElementById('th-sm1');
                var acomodarNombre = document.getElementById('th-sm2');
                var acomodarNivel = document.getElementById('th-sm3');

                acomodarFecha.addEventListener('click', function () {
                    acomodarValores();
                });

                acomodarHora.addEventListener('click', function () {
                    sortTableHora();
                });

                acomodarNombre.addEventListener('click', function () {
                    sortNombre();
                });

                acomodarNivel.addEventListener('click', function () {
                    sortNivel();
                });

            }
            Accordion();


        }
    });

    xhr.open("GET", "https://breeze2-132.collaboratory.avaya.com/services/AAADEVLOGGER/Grabaciones/web/Transcript/");

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
        }
    });

    xhr.open("GET", "https://breeze2-132.collaboratory.avaya.com/services/AAADEVLOGGER/InputLogger/web/Transcript/" + nombreArchivo);
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
/*
 * 
 * @returns {undefined}
 * función para acomodar el nombre
 */
function sortNombre() {
//    console.log("Acomodar Nombre");
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
            n = 4;
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
/*
 * 
 * @returns {undefined}
 * Función para acomodar niveles
 */
function sortNivel() {
//    console.log("Acomodar Nombre");
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
            n = 10;
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
/*
 * 
 * @returns {undefined}
 * función para acomodar hora
 */
function sortTableHora() {

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
            x = rows[i].children[1].innerText;
//            console.log(x);
            y = rows[i + 1].children[1].innerText;
//            console.log(y);
            /* Check if the two rows should switch place,
             based on the direction, asc or desc: */
            if (dir === "asc") {
                if (x.toLowerCase() > y.toLowerCase()) {
                    // If so, mark as a switch and break the loop:
                    shouldSwitch = true;
                    break;
                }
            } else if (dir === "desc") {
                if (x.toLowerCase() < y.toLowerCase()) {
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
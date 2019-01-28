/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


let info2 = null;
var contador = 0;
var agregarContacto = document.getElementById('agregar');
var formulario = document.getElementById('formulario_crear_usuario');
var divCrear = document.getElementById('crear_contacto');
var tableBody = document.getElementsByTagName('tbody');
var divExistentes = document.getElementsByClassName('existentes');
var tablaRegistrados = document.getElementById('registrados');
var checkBoxes = document.getElementsByClassName('borrar_contacto');
var btn_borrar = document.getElementById('btn_borrar');
var inputBuscador = document.getElementById('buscador');
var totalRegistros = document.getElementById('total');

//BOTON PARA BORRAR TODOS 24 / 09 /2018
var checkTodos = document.getElementById('borrar_todos');


//Absolute Path 14/01/2019
var absolutepath = getAbsolutePath();



function getAbsolutePath() {
    var loc = window.location;
    var pathName = loc.pathname.substring(0, loc.pathname.lastIndexOf('/') + 1);
    return loc.href.substring(0, loc.href.length - ((loc.pathname + loc.search + loc.hash).length - pathName.length));
}


validarSession();

function validarSession() {
    var session = sessionStorage.getItem('usuarioActivo');
    if (session === "true") {
        actualizarRegistro();
        var section = document.getElementById('section');
        section.className += 'activeLink';
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


function actualizar() {
    $("#tbody").empty();
    validarSession();
}

function registroExitoso(grabacion) {
    //crear DIV y agregar un ID
    var divMensaje = document.createElement('DIV');
    divMensaje.setAttribute('id', 'mensaje');
    //Agregar Texto

    var texto = document.createTextNode('Creado: ' + grabacion);
    divMensaje.appendChild(texto);
    divCrear.insertBefore(divMensaje, divCrear.childNodes[4]);
    //Agregar la clase mostrar
    divMensaje.classList.add('mostrar');
    //ocultar el mensaje de creación
    setTimeout(function () {
        divMensaje.classList.add('ocultar');
        setTimeout(function () {
            var divPadreMensaje = divMensaje.parentNode;
            divPadreMensaje.removeChild(divMensaje);
        }, 800);
    }, 800);

}

function crearGrabacion() {
    var form_datos = new FormData(formulario);
    for ([key, value] of form_datos.entries()) {
    }
    var xhr = new XMLHttpRequest();
    xhr.open('POST', action, true);
    xhr.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4 && xhr.status === 200) {
            var resultado = xhr.responseText;
            var json = JSON.parse(resultado);

            if (json.status === "file saved successfully on web server") {
                registroExitoso(json.grabacion);
                construirTemplate(json.grabacion);
            }
            for_check();
            actualizarNumero();
        }

    };
    xhr.send(form_datos);

}

function for_check() {
    for (var i = 0; i < checkBoxes.length; i++) {
        checkBoxes[i].addEventListener('change', function () {
            if (this.checked) {
                this.parentNode.parentNode.classList.add('activo');
            } else {
                this.parentNode.parentNode.classList.remove('activo');
            }
        });
    }
}



function actualizarRegistro() {
    var data = null;
    var xhr = new XMLHttpRequest();
    xhr.withCredentials = false;
    console.log("actualizar Registro");
    xhr.addEventListener("readystatechange", function () {
        if (this.readyState === 4) {

            let myObj = JSON.parse(this.responseText);
            console.log(Object.keys(myObj).length);

            for (let i = 0; i <= Object.keys(myObj).length - 1; i++) {
                let tbody = document.querySelector('.tbody'); //<tbody>
                let nuevoTBodyTr = document.createElement("tr");
                nuevoTBodyTr.setAttribute("id", myObj["Index " + i + ""]);
                let nuevoTBodyTh = document.createElement("th");

                nuevoTBodyTh.setAttribute("class", "wavs " + contador);
                let wav = document.createTextNode(myObj["Index " + i + ""]);
                nuevoTBodyTh.appendChild(wav);
                nuevoTBodyTr.appendChild(nuevoTBodyTh);
                contador++;
                for (let j = 1; j <= 5; j++) {
                    let nuevoTrTd = document.createElement("td");
                    let nuevoaudio = document.createElement("AUDIO");
                    if (j === 1) {
                        var data = null;
                        var xhr = new XMLHttpRequest();
                        xhr.withCredentials = false;
                        xhr.addEventListener("readystatechange", function () {
                            if (this.readyState === 4) {
                                var Fecha = JSON.parse(this.responseText);
                                var FechaText = document.createTextNode(Fecha.Fecha);
                                nuevoTrTd.appendChild(FechaText);
                            }
                        });

                        xhr.open("GET", absolutepath+"GetFileCreation?archivo=Conversaciones&nombreWav=" + (myObj["Index " + i + ""]));

                        xhr.send(data);
                    }
                    if (j === 2) {

                        var data = null;
                        var xhr = new XMLHttpRequest();
                        xhr.withCredentials = false;
                        xhr.addEventListener("readystatechange", function () {
                            if (this.readyState === 4) {
                                var Hora = JSON.parse(this.responseText);
                                var HoraText = document.createTextNode(Hora.Hora);
                                nuevoTrTd.appendChild(HoraText);
                            }
                        });

                        xhr.open("GET", absolutepath+"GetFileCreation?archivo=Conversaciones&nombreWav=" + (myObj["Index " + i + ""]));

                        xhr.send(data);

                    }
                    if (j === 3) {
                        var wav2 = (myObj["Index " + i + ""]);

                        info2 = document.createElement("input");
                        info2.setAttribute("type", "button");
                        info2.setAttribute("id", wav2);
                        info2.setAttribute("onclick", "copyPath()");
                        info2.setAttribute("title", "Copiar al ClipBoard url audio");
                        info2.setAttribute("class", "copyPath");
                        nuevoTrTd.appendChild(info2);


                    }
                    if (j === 4) {
                        var data = null;

                        var xhr = new XMLHttpRequest();
                        xhr.withCredentials = false;
                        let wav2 = (myObj["Index " + i + ""]);
                        xhr.addEventListener("readystatechange", function () {
                            if (this.readyState === 4) {
                                base64 = this.responseText;
                                var unicode = this.responseText;
                                nuevoaudio.setAttribute("class", "democlass");
                                nuevoaudio.controls = true;
                                nuevoaudio.setAttribute("src", "data:audio/wav;base64, " + unicode + "");
                                nuevoTrTd.appendChild(nuevoaudio);
                            }
                        });
                        console.log(wav2);
                        xhr.open("GET", absolutepath + "GetBase64?audio=" + wav2 + "&archivo=Conversaciones");
                        xhr.send(data);

                    }


                    if (j === 5) {
                        var wav2 = (myObj["Index " + i + ""]);

                        info2 = document.createElement("input");
                        info2.setAttribute("type", "checkbox");
                        info2.setAttribute("name", wav2);
                        info2.classList.add("borrar_contacto");
                        nuevoTrTd.setAttribute("class", "Borrar");
                        nuevoTrTd.appendChild(info2);

                    }

                    nuevoTBodyTr.appendChild(nuevoTrTd);
                }
                tbody.appendChild(nuevoTBodyTr);
            }

        }

        for_check();
        actualizarNumero();



    });

    xhr.open("GET", absolutepath+"Archivos/web/Conversaciones/");

    xhr.send(data);

}

function copyPath() {
    let tds = event.path[2].id;
    console.log(tds);
    var el = document.createElement('textarea');
    el.value = absolutepath+"FileSaveServlet/web/Conversaciones/" + tds;
    document.body.appendChild(el);
    el.select();
    document.execCommand('copy');
    document.body.removeChild(el);
}



function eliminarHTML(grabacion_borrada) {

    for (i = 0; i < grabacion_borrada.length; i++) {
        var elementoBorrar = document.getElementById(grabacion_borrada[i]);
        tableBody[0].removeChild(elementoBorrar);
        actualizarNumero();
    }
}

function mostrarEliminado() {
    //Crear div y agregar ID
    var divEliminado = document.createElement('DIV');
    divEliminado.setAttribute('id', 'borrado');

    //Agregar texto
    var texto = document.createTextNode('Eliminado de la lista de grabaciones');
    divEliminado.appendChild(texto);
    divExistentes[0].insertBefore(divEliminado, divExistentes[0].childNodes[0]);
    //


    //Agregar clase de Css
    divEliminado.classList.add('mostrar');

    setTimeout(function () {
        divEliminado.classList.add('ocultar');
        setTimeout(function () {
            var divPadreMensaje = divEliminado.parentNode;
            divPadreMensaje.removeChild(divEliminado);
        }, 800);
    }, 800);

}

function contactosEliminar(grabaciones) {

    var data = null;

    var xhr = new XMLHttpRequest();
    xhr.withCredentials = false;

    xhr.addEventListener("readystatechange", function () {
        if (this.readyState === 4) {
            var resultadoBorrar = xhr.responseText;
            var json = JSON.parse(resultadoBorrar);

            if (json.status === "file deleted successfully on web server") {
                eliminarHTML(grabaciones);
                mostrarEliminado();

            } else {
                alert("NO se ha podido borrar la grabación " + grabaciones);
            }
        }
    });
    for (i = 0; i <= grabaciones.length - 1; i++) {
        xhr.open("DELETE", absolutepath+"FileSaveServlet/web/Conversaciones/" + grabaciones[i]);
        xhr.send(data);
    }

}

/**
 * Función para validar si un check box ha sido seleccionado
 * @returns {undefined}
 */
function checkBoxSeleccionado() {
    var grabaciones = [];
    for (i = 0; i < checkBoxes.length; i++) {
        if (checkBoxes[i].checked === true) {
            grabaciones.push(checkBoxes[i].name);
        }
    }
    contactosEliminar(grabaciones);
}

/**
 * Función que se utiliza para actualizar el número de resultados.
 * @returns {undefined}
 */
function actualizarNumero() {
    //Variable para todos los registros
    var registros = tableBody[0].getElementsByTagName('tr');
    var cantidad = 0;
    var ocultos = 0;
    totalRegistros.innerHTML = registros.length;
    for (var i = 0; i < registros.length; i++) {
        var elementos = registros[i];
        if (elementos.style.display === 'table-row') {
            cantidad++;
            totalRegistros.innerHTML = cantidad;
        } else if (elementos.style.display === 'none') {
            ocultos++;
            if (ocultos === registros.length) {
                ocultos -= registros.length;
                totalRegistros.innerHTML = ocultos;
            }
        }
    }
}

/**
 * Funcion para ocultar los registros que no coinciden con la búsqueda
 * @param {type} grabacion_buscar
 * @returns {undefined}
 */
function ocultarRegistros(grabacion_buscar) {
    //Variable para todos los registros
    var registros = tableBody[0].getElementsByTagName('tr');
    //Expresión regular que busca el nombre con case insensitive
    var expresion = new RegExp(grabacion_buscar, "i");

    for (var i = 0; i < registros.length; i++) {
        registros[i].classList.add('ocultar');
        registros[i].style.display = 'none';

        if (registros[i].childNodes[0].textContent.replace(/\s/g, "").search(expresion) !== -1 || grabacion_buscar === '') {
            registros[i].classList.add('mostrar');
            registros[i].classList.remove('ocultar');
            registros[i].style.display = 'table-row';
        }
    }

    actualizarNumero();

}




btn_borrar.addEventListener('click', function () {
    checkBoxSeleccionado();
});

inputBuscador.addEventListener('input', function () {
    ocultarRegistros(this.value);
});


//Boton para borrar todos los elementos 24 / 09 /2018 
checkTodos.addEventListener('click', function () {
    if (this.checked) {
        var todosRegistros = tableBody[0].getElementsByTagName('tr');
        for (var i = 0; i < checkBoxes.length; i++) {
            checkBoxes[i].checked = true;
            todosRegistros[i].classList.add('activo');
        }
    } else {
        var todosRegistros = tableBody[0].getElementsByTagName('tr');
        for (var i = 0; i < checkBoxes.length; i++) {
            checkBoxes[i].checked = false;
            todosRegistros[i].classList.remove('activo');
        }
    }
});
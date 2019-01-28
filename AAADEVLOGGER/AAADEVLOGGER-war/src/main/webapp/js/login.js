/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

//Absolute Path 14/01/2019
var absolutepath = getAbsolutePath();



function getAbsolutePath() {
    var loc = window.location;
    var pathName = loc.pathname.substring(0, loc.pathname.lastIndexOf('/') + 1);
    return loc.href.substring(0, loc.href.length - ((loc.pathname + loc.search + loc.hash).length - pathName.length));
}


//Obtener datos del formulario
var sumbit = document.getElementById('submit_login');
var formulario = document.getElementById('fomulario_login');
var action = formulario.getAttribute('action');
//Obtener el Dominio
var URLdomain = window.location.host;

//Event Listener al botón Submit
sumbit.addEventListener('click', function (e) {
    e.preventDefault();
    doGetArchivo();
});


function doGetArchivo() {

    var fomulario = new FormData(formulario);
//    console.log(formulario);
    var object = {};
    fomulario.forEach(function (value, key) {
        object[key] = value;
    });
    var data = null;

    var xhr = new XMLHttpRequest();
    xhr.withCredentials = false;

    xhr.addEventListener("readystatechange", function () {
        if (this.readyState === 4) {
            var json = JSON.parse(this.responseText);
            console.log(object.pais);
            if (object.pais === "" || object.pais.length === 0 || /^\s+$/.test(object.pais)) {
                Swal({
                    type: 'error',
                    title: 'Error',
                    text: 'Favor de escribir en campo País'

                });
            } else if (object.cliente === "" || object.cliente.length === 0 || /^\s+$/.test(object.cliente) || object.cliente.match(/Avaya/) || object.cliente.match(/AVAYA/)) {
                Swal({
                    type: 'error',
                    title: 'Error',
                    text: 'Favor No indicar Avaya en la sección de Cliente'

                });
            } else if (!(/\S+@\S+\.\S+/.test(object.email))) {
                Swal({
                    type: 'error',
                    title: 'Error',
                    text: 'Favor llenar correctamente el campo de Email'

                });
            } else if (object.psw === "" || object.psw.length === 0 || /^\s+$/.test(object.psw)) {
                Swal({
                    type: 'error',
                    title: 'Error',
                    text: 'Favor de escribir en campo Password'
                });
            } else {

                for (var i = 0; i < json.length; i++) {
                    if (object.email === json[i].username && object.psw === json[i].password) {
                        console.log("Correcto");
                        sessionStorage.setItem('usuarioActivo', true);
                        Swal({
                            position: 'center',
                            type: 'success',
                            title: 'Log in exitoso',
                            showConfirmButton: false,
                            timer: 3000
                        });
                        makePost(json[i].username, object.pais, object.cliente);
                        break;
                    } else {
                        console.log("Incorrecto");
                        Swal({
                            type: 'error',
                            title: 'Error',
                            text: 'Usuario y/o contrasseña incorrectos'
                        });
                    }
                }
            }
        }
    });

    xhr.open("GET", "https://breeze2-132.collaboratory.avaya.com/services/AAADEVLOGGER/ReadText/web/LogIn/Access.txt");

    xhr.send(data);
}


function makePost(usuario, pais, cliente) {


    var data = null;
    var xhr = new XMLHttpRequest();
    xhr.withCredentials = false;

    xhr.addEventListener("readystatechange", function () {
        if (this.readyState === 4) {
            console.log(this.responseText);
            var response = JSON.parse(this.responseText);
            console.log(response.status);
            window.location.href = "logmenu.html";
        }
    });

    xhr.open("POST", "https://breeze2-132.collaboratory.avaya.com/services/AAADEVLOGGER/LogAccess?usuario=" + usuario + "&pais=" + pais + "&cliente=" + cliente);

    xhr.send(data);
}

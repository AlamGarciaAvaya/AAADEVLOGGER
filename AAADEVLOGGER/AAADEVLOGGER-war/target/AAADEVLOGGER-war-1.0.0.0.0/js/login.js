/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
//Obtener datos del formulario
var sumbit = document.getElementById('submit_login');
var formulario = document.getElementById('fomulario_login');
var action = formulario.getAttribute('action');

var absolutePath = getAbsolutePath();

function getAbsolutePath() {
    var loc = window.location;
    var pathName = loc.pathname.substring(0, loc.pathname.lastIndexOf('/') + 1);
    return loc.href.substring(0, loc.href.length - ((loc.pathname + loc.search + loc.hash).length - pathName.length));
}


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
    console.log(object.email);

    var data = null;

    var xhr = new XMLHttpRequest();
    xhr.withCredentials = false;

    xhr.addEventListener("readystatechange", function () {
        if (this.readyState === 4) {
            var json = JSON.parse(this.responseText);

            if (object.pais === "" || object.cliente === "" || object.email === "" || object.psw === "") {
                Swal({
                    type: 'error',
                    title: 'Error',
                    text: 'Favor de llenar todos los campos',

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
                            text: 'Usuario y/o contrasseña incorrectos',
                        });
                    }
                }

            }
        }
    });
    xhr.open("GET", absolutePath+"ReadText/web/LogIn/Access.txt");

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

    xhr.open("POST", absolutePath+"LogAccess?usuario=" + usuario +"&pais="+pais+"&cliente="+cliente);

    xhr.send(data);
}

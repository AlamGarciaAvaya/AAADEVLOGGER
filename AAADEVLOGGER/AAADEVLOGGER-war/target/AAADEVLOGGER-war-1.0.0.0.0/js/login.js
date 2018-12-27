/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
//Obtener datos del formulario
var sumbit = document.getElementById('submit_login');
var formulario = document.getElementById('fomulario_login');
var action = formulario.getAttribute('action');

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
                    
                    makePost(json[i].username);
                    
                    
                    
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
    });

    xhr.open("GET", "https://breeze2-132.collaboratory.avaya.com/services/AAADEVLOGGER/ReadText/web/LogIn/Access.txt");

    xhr.send(data);
}


function makePost(usuario) {


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

    xhr.open("POST", "https://breeze2-132.collaboratory.avaya.com/services/AAADEVLOGGER/LogAccess?usuario=" + usuario);

    xhr.send(data);
}

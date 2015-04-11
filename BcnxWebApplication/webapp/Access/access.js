$(document).ready(function(){
    var isChrome = window.chrome;
    if(isChrome) {
        var userLogin = localStorage.userLogin;
        var stateLogin = localStorage.stateLogin;
        var codeLogin = localStorage.codeLogin;
        if(userLogin && stateLogin && codeLogin ){
            if(codeLogin=="403"){
                window.location.href = _ip+_app+"/Changepass.html";
            }
            if(codeLogin=="200"){
                window.location.href = _ip+_app;
            }
        }
        else{
            window.location.href = _ip+_app+"/login.html";
        }
    } else {
        alert("This browser is not support please run this Application on chrome !!");
    }
});
$(document).ready(function(){
    $('#btLogin').click(function(){
        var txtUser = $("#txtUser").val();
        var txtPass = $("#txtPass").val();
            var formLogin = {"userId":txtUser, "passwd":txtPass};
            var urlLogin = _ip+_svc+"/user/login";
            $.post(urlLogin,formLogin,function(data){
                console.log(data.code);
                if(data.code =="200" || data.code=="403"){
                    localStorage.clear();
                    localStorage.setItem("userLogin", txtUser);
                    localStorage.setItem("stateLogin", 1);
                    localStorage.setItem("codeLogin", data.code);
                    window.location.href = _ip+_acc;
                }
            }).fail(function(jqXHR, textStatus, errorThrown){
                    var err = JSON.parse(jqXHR.responseText);
                    $(err).each(function(index,er){
                        $('.eventLogin').empty();
                        $('.eventLogin').append("UserId/Password Incorrect!!");
                    });
            });
    });
});
$(document).ready(function(){
    if(!localStorage.userLogin && !localStorage.stateLogin && !localStorage.codeLogin ){
        window.location.href = _ip+_acc;
        return false;
    }
    else{
        if(localStorage.codeLogin =="403"){
            $("html").show();
            $('#btChangePass').click(function(){
                var chUser = $("#userChange").val();
                var chOldPass = $("#oldPassChange").val();
                var chNewPass = $("#newPassChange").val();
                var chConPass = $("#conPassChange").val();

                var formChange = {"userId":chUser, "passwd":chOldPass, "nPasswd":chNewPass, "cPasswd":chConPass}
                var urlChange = _ip+_svc+"/user/update";
                $.ajax({
                    url: urlChange,
                    type: 'PUT',
                    data: formChange
                }).done(function( success, textStatus, jQxhr) {
                        if(success.code=="200"){
                            localStorage.clear();
                            alert("Password has been change, go login");
                            window.location.href = _ip+_acc;
                        }
                    }).fail(function(jqXHR, textStatus, errorThrown){
                        var err = JSON.parse(jqXHR.responseText);
                        $(err).each(function(index,er){
                            $('.eventChange').empty();
                            $('.eventChange').append("UserId/Password/Confirm Incorrect!!");
                        });
                    });
            });
        }
        else{
            window.location.href = _ip+_acc;
            return false;

        }

    }

});
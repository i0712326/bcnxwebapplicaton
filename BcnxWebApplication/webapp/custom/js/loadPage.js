$(document).ready(function(){
    var myContent = $("#myContent");
    var myBc = $("#myBreadcrumb");
    myContent.empty();
    var urlHome = _ip+_acc+"/content/HomeContent.html";
    myContent.load(urlHome);
    var bc = '<li class="active">Home</li>';
    myBc.empty();
    myBc.append(bc);

    if(!localStorage.userLogin && !localStorage.stateLogin && !localStorage.codeLogin ){
         window.location.href = _ip+_acc;
         return false;
    }
    else{
        if(localStorage.codeLogin =="200"){
            $("html").show();
            $(".currUserLog").append(localStorage.userLogin);
            $('#home').click(function(){
                myContent.empty();
                myContent.load(urlHome);
                myBc.empty();
                myBc.append(bc);
            });
            $('#compose').click(function(){
                myContent.empty();
                var urlCompose = _ip+_acc+"/content/ComposeTxnContent.html";
                myContent.load(urlCompose);
                var bc = '<li>Home</li><li>Dispute</li><li class="active">Compose</li>';
                myBc.empty();
                myBc.append(bc);
            });
            $('#incoming').click(function(){
                myContent.empty();
                var urlIncoming = _ip+_acc+"/content/IncomingTxnContent.html";
                $("#myContent").load(urlIncoming);
                var bc = '<li>Home</li><li>Dispute</li><li class="active">Incoming</li>';
                myBc.empty();
                myBc.append(bc);

            });
            $('#outgoing').click(function(){
                myContent.empty();
                var urlOutgoing = _ip+_acc+"/content/OutgoingTxnContent.html";
                $("#myContent").load(urlOutgoing);
                var bc = '<li>Home</li><li>Dispute</li><li class="active">Outgoing</li>';
                myBc.empty();
                myBc.append(bc);
            });
            $('#settle').click(function(){
                myContent.empty();
                var urlSettle = _ip+_acc+"/content/SettlementTxnContent.html";
                $("#myContent").load(urlSettle);
                var bc = '<li>Home</li><li>Settlement</li><li class="active">Settle</li>';
                myBc.empty();
                myBc.append(bc);

            });
            $('#btLogout').click(function(){
                var paramOut ={"userId":localStorage.userLogin};
                var urlLogout =_ip+_svc+"/user/logout";
                $.ajax({
                    url: urlLogout,
                    type: 'PUT',
                    data: paramOut
                }).done(function( success, textStatus, jQxhr) {
                        if(success.code=="200"){
                            localStorage.clear();
                            localStorage.removeItem("userLogin");
                            localStorage.removeItem("stateLogin");
                            localStorage.removeItem("codeLogin");
                            window.location.href = _ip+_app;
                        }

                    });
            });
        }
        else{
            window.location.href = _ip+_app;
            return false;
        }

    }

});
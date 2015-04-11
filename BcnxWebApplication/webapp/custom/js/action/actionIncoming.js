$(document).ready(function(){
    $('#tabIncoming').tabs();
    var rrn =localStorage.rrnIn;
    var procc =localStorage.proccIn;
    var slot =localStorage.slotIn;
    var stan =localStorage.stanIn;
    var mti =localStorage.mtiIn;
    var userIn =localStorage.usrIn;
    var incomingParam={"rrn":rrn,"proc":procc,"slot":slot,"stan":stan,"mti":mti};
    var urlIncoming=_ip+_svc+"/dispute/get/txn";
    $.get(urlIncoming,incomingParam, function(list){
        $(list).each(function(index,o){
            $(".iAct").append(o.procc+" : "+ o.rc.procCode.remark);
            $(".iReason").append(o.rc.code+" : "+ o.rc.des);
            $(".iRemark").append(o.remark);
            var _orgAmtP = o.amount;
            var _orgFeeP = o.fee;
            $(".noAmtPart").removeAttr("disabled");
            $(".noFeePart").removeAttr("disabled");
            $(".noAmtPart").val(_orgAmtP);
            $(".noFeePart").val(_orgFeeP);
            $("#rePart").change(function(){
                if($(this).is(':checked')){
                    $("#rePart").val("Y");
                    $(".noAmtPart").attr("disabled","disabled");
                    $(".noFeePart").attr("disabled","disabled");
                    $(".amtPt").removeAttr("disabled");
                    $(".feePt").removeAttr("disabled");
                    $(".amtPt").select();
                    $(".amtPt").blur(function(){
                        var _blurAmt = $(".amtPt").val();
                        if(_blurAmt > _orgAmtP){
                            $(".amtPt").val(_orgAmtP);
                        }
                        if(_blurAmt <= _orgAmtP){
                            $(".amtPt").val(_blurAmt);
                        }
                    });
                }
                else{
                    $("#rePart").val("N");
                    $(".amtPt").attr("disabled","disabled");
                    $(".feePt").attr("disabled","disabled");
                    $(".noAmtPart").removeAttr("disabled");
                    $(".noFeePart").removeAttr("disabled");
                    $(".noAmtPart").val(_orgAmtP);
                    $(".noFeePart").val(_orgFeeP);
                    $(".amtPt").val(_orgAmtP);
                    $(".feePt").val(_orgFeeP);
                }
            });
            
            
            $(".iCurr").append(o.bcnxSettle.bcnxTxn.curr);
            $(".iDate").append(o.date+" "+ o.time);
            $(".iLocation").append(o.bcnxSettle.bcnxTxn.location);
            $(".iTermId").append(o.bcnxSettle.bcnxTxn.termId);
            $(".iIss").append(o.bcnxSettle.bcnxTxn.iss);
            $(".iAcq").append(o.bcnxSettle.bcnxTxn.acq);
            $(".iStatus").append(o.status);

            $(".tDate").append(o.bcnxSettle.date);
            $(".tTime").append(o.bcnxSettle.time);
            $(".tMti").append(o.bcnxSettle.bcnxTxn.mti);
            $(".tCard").append(o.bcnxSettle.bcnxTxn.card);
            $(".tRrn").append(o.bcnxSettle.bcnxTxn.rrn);
            $(".tProc").append(o.bcnxSettle.bcnxTxn.proc);
            $(".tAmt").append((o.bcnxSettle.bcnxTxn.amount).formatMoney(2));
            $(".tFee").append((o.bcnxSettle.bcnxTxn.fee).formatMoney(2));
            $(".tRes").append(o.bcnxSettle.bcnxTxn.res);
            $(".tSlot").append(o.bcnxSettle.bcnxTxn.slot);
            $(".tStan").append(o.bcnxSettle.bcnxTxn.stan);
            $(".tMcc").append(o.bcnxSettle.bcnxTxn.mcc);
            $(".tLocation").append(o.bcnxSettle.bcnxTxn.location);
            $(".tTermId").append(o.bcnxSettle.bcnxTxn.termId);
            $(".tCountry").append(o.bcnxSettle.bcnxTxn.country);
            $(".tCurr").append(o.bcnxSettle.bcnxTxn.curr);
            $(".tExp").append(o.bcnxSettle.bcnxTxn.exp);
            $(".tAppr").append(o.bcnxSettle.bcnxTxn.appr);
            $(".tPos").append(o.bcnxSettle.bcnxTxn.pos);
            $(".tCondCode").append(o.bcnxSettle.bcnxTxn.condCode);
            $(".tAcq").append(o.bcnxSettle.bcnxTxn.acq);
            $(".tIss").append(o.bcnxSettle.bcnxTxn.iss);
            $(".tTp").append(o.bcnxSettle.cardType.type);
            $(".tCtp").append(o.bcnxSettle.cardType.remark);
            $(".tMember").append(o.user.member.memId);
            $(".tEmail").append(o.user.email);
            $(".tEntry").append(o.user.member.entry);
            $(".tTel").append(o.user.member.tel);
            $(".tFax").append(o.user.member.fax);
            
            localStorage.setItem("newAmt", o.amount);
            localStorage.setItem("newFee", o.fee);
            
            var urlPrintIn =_ip+_acc+"/include/printIn.html";
            $(".printIn").load(urlPrintIn);
            
            if(o.procc == "500002" || o.procc == "700001" || o.procc == "800001"){
            	$("#btResSave" ).addClass( "disabledMe" );
                $("#btResSave").attr('disabled','disabled');

                $("#resAct").attr('disabled','disabled');
                $("#reasonCodeIn").attr('disabled','disabled');
                $("#resFile").attr('disabled','disabled');
            	
            }

            if(o.procc =="500002"){
                var urlFile = _ip+_svc+"/copyrequest/download/";
                	urlFile = urlFile+o.fileName;
                var downloadFile = '<a id="dFile" class="dFile empty" title="'+o.fileName+'" href="'+urlFile+'">'+"<i class='fa fa-download'> "+ o.fileName+'</a>';
                $(".dFile").append(downloadFile);
            }
            if(o.procc =="800001"){
                var urlFile = _ip+_svc+"/represent/download/";
                	urlFile = urlFile+o.fileName;
                var downloadFile = '<a id="dFile" class="dFile empty" title="'+o.fileName+'" href="'+urlFile+'">'+"<i class='fa fa-download'> "+o.fileName+'</a>';
                $(".dFile").append(downloadFile);
            }

            $("#resIncoming #resRrn").val(o.bcnxSettle.bcnxTxn.rrn);
            $("#resIncoming #resSlot").val(o.bcnxSettle.bcnxTxn.slot);
            $("#resIncoming #resStan").val(o.bcnxSettle.bcnxTxn.stan);
            $("#resIncoming #resMti").val(o.bcnxSettle.bcnxTxn.mti);
            
            $(".amtPt").val(o.amount);
            $(".feePt").val(o.fee);
            
            $("#resIncoming #resUsr").val(userIn);
            
            var optActionCpr = "<option value='500002'>Copy Response</option>";
            var optActionRep = "<option value='800001'>Representment</option>";
            if(o.procc =="500001"){
                $('#resAct').empty();
                $('#resAct').append("<option value='0'>Action</option>");
                $('#resAct').append(optActionCpr);
            }
            if(o.procc =="600001"){
                $('#resAct').empty();
                $('#resAct').append("<option value='0'>Action</option>");
                $('#resAct').append(optActionRep);
            }
        });
    });

    $("#resAct").change(function(){
        var resAct = $('#resAction #resAct').val();
        var url="";
        if(resAct=="500002"){
            url=_ip+_svc+"/reason/get/500002";
        }
        if(resAct=="800001"){
            url=_ip+_svc+"/reason/get/800001";
        }
        $.get(url, function(list){
            $('#reasonCodeIn').empty();
            $('#reasonCodeIn').append("<option value='0'>--</option>");
            $(list).each(function(index,o){
                var option = '<option value="'+o.code+'" title="'+o.des+'">'+ o.code+'</option>';
                $('#reasonCodeIn').append(option);
            });
        });
    });
    $('#btResSave').click(function(event){
        event.preventDefault();
        $("#msgIncoming").dialog({
            autoOpen: false,
            height: 250,
            width: 420,
            title: 'Result',
            buttons: {
                "Close": function() {
                    localStorage.removeItem("code");
                    localStorage.removeItem("msg");
                    $(this).dialog( "close" );
                }
            },
            modal:true
        });
        //function to show dialog result message
        function msgIncoming(url){
            $("#msgIncoming").load(encodeURI(url));
            $("#msgIncoming").dialog("open");
        }
        //save action filter by proccessing code
        var formData = new FormData( $('#resIncoming').get()[0]);
        var procc =$("#resAct").val();
        var rea =$("#reasonCodeIn").val();
        var resFile =$("#resFile").val();
         var urlMsg = _ip+_acc+"/include/msg.html";
        if(procc !=0 && rea !=0 && resFile !=""){
            var url="";
            if(procc=="500002"){
                url = _ip+_svc+"/copyrequest/response";
                $.ajax({
                    url: url,
                    method: 'put',
                    dataType: 'json',
                    data: formData,
                    processData: false,
                    contentType: false
                }).done(function( success, textStatus, jQxhr) {
                        localStorage.setItem("code", success.code);
                        localStorage.setItem("msg", success.message);
                        msgIncoming(urlMsg);
                        return false;
                    }).fail(function( jqXHR, textStatus, errorThrown ) {
                        var err = JSON.parse(jqXHR.responseText);
                        $(err).each(function(index,er){
                            localStorage.setItem("code", er.code);
                            localStorage.setItem("msg", er.message);
                            msgIncoming(urlMsg);
                            return false;
                        });
                    });
            }
            if(procc=="800001"){
                url = _ip+_svc+"/represent/save";
                $.ajax({
                    url: url,
                    method: 'post',
                    dataType: 'json',
                    data: formData,
                    processData: false,
                    contentType: false
                }).done(function( success, textStatus, jQxhr) {
                        localStorage.setItem("code", success.code);
                        localStorage.setItem("msg", success.message);
                        msgIncoming(urlMsg);
                        return false;
                }).fail(function( jqXHR, textStatus, errorThrown ) {
                        var err = JSON.parse(jqXHR.responseText);
                        $(err).each(function(index,er){
                            localStorage.setItem("code", er.code);
                            localStorage.setItem("msg", er.message);
                            msgIncoming(urlMsg);
                            return false;
                        });
                });
            }
        }
        //throw excption when no action
        else{
            localStorage.setItem("code", 401);
            localStorage.setItem("msg", "Please choose an action");
            msgIncoming(urlMsg);
            return false;
        }
    });
    $('#btPrintIncoming').click(function(){
        function PrintIn(elem)
        {
            PopupIn($(elem).html());
        }
        function PopupIn(data)
        {
            var mywindow = window.open('', 'Transaction Action', 'height=800,width=1000');
            mywindow.document.write('<html><head><title>Print Transaction</title>');
            mywindow.document.write('</head><body >');
            mywindow.document.write(data);
            mywindow.document.write('</body></html>');

            mywindow.document.close(); // necessary for IE >= 10
            mywindow.focus(); // necessary for IE >= 10

            mywindow.print();
            mywindow.close();

            return true;
        }

        PrintIn("#printIn");
    });

});
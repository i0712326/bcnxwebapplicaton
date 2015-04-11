$(document).ready(function(){
$('#tabCompose').tabs();
var getRrn =localStorage.rrnCom;
var getCard =localStorage.cardCom;
var getFrom =localStorage.fromCom;
var getTo =localStorage.toCom;
var getUserId =localStorage.userIdCom;

var getParam={"card":getCard+"%","rrn":getRrn+"%","stan":"%","from":getFrom,"to":getTo,"rows":50,"page":1};
var getUrl=_ip+_svc+"/settle/get";
$.get(getUrl,getParam, function(list){
    $(".empty").empty();
    $(".sCard").append(list.rows[0].card);
    $(".sRrn").append(list.rows[0].rrn);
    $(".sProc").append(list.rows[0].proc);
    //$(".dynamicAmount").val((list.rows[0].amt).formatMoney(2));
    //$(".dynamicFee").val((list.rows[0].bcnxTxn.fee).formatMoney(2));
    $(".sRes").append(list.rows[0].res);
    $(".sLocation").append(list.rows[0].bcnxTxn.location);
    $(".sTermId").append(list.rows[0].bcnxTxn.termId);
    $(".sIss").append(list.rows[0].bcnxTxn.iss);
    $(".sAcq").append(list.rows[0].bcnxTxn.acq);
    $(".sCurr").append(list.rows[0].bcnxTxn.curr);
    $(".sDate").append(list.rows[0].date+" "+list.rows[0].time);
    $(".dDate").append(list.rows[0].date);
    $(".dTime").append(list.rows[0].time);
    $(".dMti").append(list.rows[0].bcnxTxn.mti);
    $(".dCard").append(list.rows[0].bcnxTxn.card);
    $(".dRrn").append(list.rows[0].bcnxTxn.rrn);
    $(".dProc").append(list.rows[0].bcnxTxn.proc);
    $(".dAmt").append((list.rows[0].bcnxTxn.amount).formatMoney(2));
    $(".dFee").append((list.rows[0].bcnxTxn.fee).formatMoney(2));
    $(".dRes").append(list.rows[0].bcnxTxn.res);
    $(".dSlot").append(list.rows[0].bcnxTxn.slot);
    $(".dStan").append(list.rows[0].bcnxTxn.stan);
    $(".dMcc").append(list.rows[0].bcnxTxn.mcc);
    $(".dLocation").append(list.rows[0].bcnxTxn.location);
    $(".dTermId").append(list.rows[0].bcnxTxn.termId);
    $(".dCountry").append(list.rows[0].bcnxTxn.country);
    $(".dCurr").append(list.rows[0].bcnxTxn.curr);
    $(".dExp").append(list.rows[0].bcnxTxn.exp);
    $(".dAppr").append(list.rows[0].bcnxTxn.appr);
    $(".dPos").append(list.rows[0].bcnxTxn.pos);
    $(".dConCode").append(list.rows[0].bcnxTxn.condCode);
    $(".dAcq").append(list.rows[0].bcnxTxn.acq);
    $(".dIss").append(list.rows[0].bcnxTxn.iss);
    $(".dTp").append(list.rows[0].cardType.type);
    $(".dRemark").append(list.rows[0].cardType.remark);

    $("#rqMti").val(list.rows[0].bcnxTxn.mti);
    $("#rqCard").val(list.rows[0].bcnxTxn.card);
    $("#rqRrn").val(list.rows[0].rrn);
    $("#rqStan").val(list.rows[0].bcnxTxn.stan);
    $("#rqAcq").val(list.rows[0].bcnxTxn.acq);
    $("#rqIss").val(list.rows[0].bcnxTxn.iss);
    $("#rqSlot").val(list.rows[0].bcnxTxn.slot);
    $("#rqProc").val(list.rows[0].bcnxTxn.proc);
    $("#rqAmount").val(list.rows[0].bcnxTxn.amount);
    $("#rqFee").val(list.rows[0].bcnxTxn.fee);
    $("#rqUserId").val(getUserId);
    var setRemark = $("#setRemark").val();
    $("#rqRemark").val(setRemark);

    var _orgAmt = (list.rows[0].amt);
    var _orgFee = (list.rows[0].bcnxTxn.fee);
    var _amt = $(".dynamicAmount").val(_orgAmt);
    var _fee = $(".dynamicFee").val(_orgFee);
    $("#part").change(function(){
        if($(this).is(':checked')){
            $("#part").val("Y");
            $(".dynamicAmount").removeAttr("disabled");
            $(".dynamicFee").removeAttr("disabled");
            $(".dynamicAmount").select();
            $(".dynamicFee").val(0);
            $(".dynamicAmount").blur(function(){
                var _blurAmt = $(".dynamicAmount").val();
                //console.log(_blurAmt);
                if(_blurAmt > _orgAmt){
                    $(".dynamicAmount").val(_orgAmt);
                }
                if(_blurAmt <= _orgAmt){
                    $(".dynamicAmount").val();
                }
            });
        }
        else{
            $("#part").val("N");
            $(".dynamicAmount").attr("disabled","disabled");
            $(".dynamicFee").attr("disabled","disabled");
            $(".dynamicAmount").val(_orgAmt);
            $(".dynamicFee").val(_orgFee);
        }
    });
    var response = list.rows[0].res;
    var resProcc = list.rows[0].bcnxTxn.proc;
    console.log(resProcc.substring(0,1));
    if(response != "00" || (resProcc.substring(0,1)) == "3"){
        $("#btsave" ).addClass( "disabledMe" );
        $("#btsave").attr('disabled','disabled');

        $("#act").attr('disabled','disabled');
        $("#reasonCode").attr('disabled','disabled');
    }

    //choose action and reason code
    $("#act").change(function(){
        var act = $('#action #act').val();
        var url="";
        if(act == "0"){
        }
        if(act=="500001"){
            url=_ip+_svc+"/reason/get/500001";
        }
        if(act=="600001"){
            url=_ip+_svc+"/reason/get/600001";
        }
        if(act=="700001"){
            url=_ip+_svc+"/reason/get/700001";
        }
        $.get(url, function(list){
            $('#reasonCode').empty();
            $('#reasonCode').append("<option value='0'>--</option>");
            $(list).each(function(index,o){
                var option = '<option value="'+o.code+'" title="'+o.des+'">'+ o.code+'</option>';
                $('#reasonCode').append(option);
            });
        });
    });
    //save action
    $('#btsave').click(function(){
        var act  = $('#act').val();
        var rea  = $('#reasonCode').val();
        var mti  = $('#rqMti').val();
        var card = $('#rqCard').val();
        var rrn  = $('#rqRrn').val();
        var stan = $('#rqStan').val();
        var acq  = $('#rqAcq').val();
        var iss  = $('#rqIss').val();
        var slot = $('#rqSlot').val();
        var usr  = $('#rqUserId').val();
        var proc = $('#act').val();
        var setRemark = $('#setRemark').val();
        var part = $('#part').val();
        var amount = $('.dynamicAmount').val();
        var fee =($('.dynamicFee').val());
        amount  = Number(amount.replace(/[^0-9\.]+/g,""));
        fee     = Number(fee.replace(/[^0-9\.]+/g,""));
        ///////////////////////////////////////////////////////////////////show result
        $("#msgCom").dialog({
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
        function msgCompose(urlCom){
            $("#msgCom").load(encodeURI(urlCom));
            $("#msgCom").dialog("open");
        }
        var urlMsgCom = _ip+_acc+"/include/msg.html";
        ///////////////////////////////////////////////////////////////////show result
        //save action filter by proccessing code
        if(act !=0 && rea !=0 ){
            var url="";
            var param = {'mti':mti, 'rrn':rrn, 'slot':slot, 'stan':stan, 'proc':proc, 'rea':rea, 'remark':setRemark, 'part':part, 'amount':amount, 'fee':fee, 'iss':iss, 'acq':acq, 'usrId':usr };
            if(act=="500001"){
                url = _ip+_svc+"/copyrequest/save";
            }
            if(act=="600001"){
                url = _ip+_svc+"/chargeback/save";
            }
            if(act=="700001"){
                url = _ip+_svc+"/adjustment/save";
            }
            $.post(url,param,function(data){
                localStorage.setItem("code", data.code);
                localStorage.setItem("msg", data.message);
                localStorage.setItem("newAmt", amount);
                localStorage.setItem("newFee", fee);
                
                msgCompose(urlMsgCom);
                $("#btPrintCom").show();


                //return false;
            }).fail(function(jqXHR, textStatus, errorThrown){
                    var err = JSON.parse(jqXHR.responseText);
                    $(err).each(function(index,er){
                        localStorage.setItem("code", er.code);
                        localStorage.setItem("msg", er.message);
                        msgCompose(urlMsgCom);
                        $("#btPrintCom").show();
                        //return false;
                    });
                });
        }
        //throw excption when no action
        else{
            localStorage.setItem("code", 401);
            localStorage.setItem("msg", "Please choose an action");
            msgCompose(urlMsgCom);
            return false;
        }
    });
    $('#btPrintCom').click(function(){
        localStorage.setItem("rrnComP",$('#rqRrn').val());
        localStorage.setItem("stanComP",$('#rqStan').val());
        localStorage.setItem("slotComP",$('#rqSlot').val());
        localStorage.setItem("procComP",$('#act').val());
        $("#printCom").load(_ip+_acc+"/include/printCps.html");

    });

    //table grid for related transaction
    var tableRelated = $("#listRelated");
    var mtiRelated   = $('#rqMti').val();
    var rrnRelated   = $('#rqRrn').val();
    var slotRelated  = $('#rqSlot').val();
    var stanRelated  = $('#rqStan').val();
    var url = _ip+_svc+"/dispute/get/related";
    url = url+"?mti="+mtiRelated+"&rrn="+rrnRelated+"&slot="+slotRelated+"&stan="+stanRelated;
    var url1 = encodeURI(url);
    tableRelated.jqGrid({
        url:url1,
        datatype: "json",
        colNames:["Date","Time","Card", "RRN", "PROC","Amount","Fee", "Res", "Action","Reason", "Issuer", "Acquirer"],
        colModel: [
            {
                name: "date",
                sortable: false,
                align: "center",
                editable: true,
                disabled:true
            },
            {
                name: "bcnxSettle.time",
                sortable: false,
                align: "center",
                editable: true,
                disabled:true
            },
            {
                name: "bcnxSettle.bcnxTxn.card",
                sortable: false,
                align: "center",
                editable: true,
                disabled:true
            },

            {
                name: "bcnxSettle.bcnxTxn.rrn",
                align: "center",
                sortable: false,
                editable: true
            },
            {
                name: "bcnxSettle.bcnxTxn.proc",
                align: "center",
                sortable: false,
                editable: true
            },
            {
                name: "amount",
                align: "right",
                sortable: false,
                editable: true,
                formatter:'currency',
                formatoptions: {thousandsSeparator:',',decimalPlaces: 2}
            },
            {
                name: "fee",
                jsonmap:"bcnxTxn.fee",
                sortable: false,
                align: "right",
                editable: true,
                formatter:'currency',
                formatoptions: {thousandsSeparator:',',decimalPlaces: 2}
            },
            {
                name: "bcnxSettle.bcnxTxn.res",
                sortable: false,
                align: "center",
                editable: true
            },
            {
                name: "procc",
                sortable: false,
                align: "center",
                editable: true
            },
            {
                name: "rc.code",
                sortable: false,
                align: "center",
                editable: true
            },

            {
                name: "iss",
                sortable: false,
                align: "center",
                editable: true
            },
            {
                name: "acq",
                sortable: false,
                align: "center",
                editable: true
            }
        ],
        rowNum:10,
        rowList:[10,20,30],
        pager: '#pagerRelated',
        sortname: 'id',
        viewrecords: true,
        sortorder: "desc",
        caption:"Related",
        width:900,
        height:220,
        loadonce:true,
        shrinkToFit:true
    });
    tableRelated.jqGrid('navGrid','#pagerRelated',{edit:false,add:false,del:false});

});

});

/****************************************************************/
/*End of action for transactions. Updated on 17 FEB 2015 9:34 AM*/
/****************************************************************/
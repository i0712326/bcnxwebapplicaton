$(document).ready(function(){
    var today = new Date();
    var dd = today.getDate();
    var mm = today.getMonth()+1; //January is 0!
    var yyyy = today.getFullYear();
    if(dd<10){
        dd='0'+dd
    }
    if(mm<10){
        mm='0'+mm
    }
    var today = yyyy+'-'+mm+'-'+dd;
    $('#sdate').val(today);
    $('#edate').val(today);
    $('#sdate').datepicker({ dateFormat: 'yy-mm-dd' });
    $('#edate').datepicker({ dateFormat: 'yy-mm-dd' });
    $("#sCardIn").focus();
    //table grid Incoming transaction action
    var userHeight = screen.height-500;
    //var usr =   $('#activeUser').val();
    var usr =   localStorage.userLogin;
    var urlOut =   _ip+_svc+"/outgoing/get";
    urlOut =   urlOut+"?usrId="+usr;
    var tableOutgoing =$('#listOutgoing');
    tableOutgoing.jqGrid({
        url:encodeURI(urlOut),
        datatype: "json",
        colNames:["Slot","Date","Time","Card", "RRN","Stan","PROC","Amount","Fee", "Res", "Action","Reason", "Issuer", "Acquirer"],
        colModel: [
            {
                name: "slot",
                sortable: false,
                align: "center",
                editable: true,
                hidden:true
            },
            {
                name: "date",
                sortable: false,
                align: "center",
                editable: true,
                disabled:true,
                width:100
            },
            {
                name: "time",
                sortable: false,
                align: "center",
                editable: true,
                disabled:true,
                width:80
            },
            {
                name: "bcnxSettle.bcnxTxn.card",
                sortable: false,
                align: "center",
                editable: true,
                disabled:true,
                width:150
            },
            {
                name: "bcnxSettle.bcnxTxn.rrn",
                align: "center",
                sortable: false,
                editable: true,
                width:100
            },
            {
                name: "stan",
                sortable: false,
                align: "center",
                editable: true,
                width:100
            },
            {
                name: "bcnxSettle.bcnxTxn.proc",
                align: "center",
                sortable: false,
                editable: true,
                width:100
            },
            {
                name: "amount",
                align: "right",
                sortable: false,
                editable: true,
                formatter:'currency',
                formatoptions: {thousandsSeparator:',',decimalPlaces: 2},
                width:150
            },
            {
                name: "fee",
                sortable: false,
                align: "right",
                editable: true,
                formatter:'currency',
                formatoptions: {thousandsSeparator:',',decimalPlaces: 2},
                width:150
            },
            {
                name: "bcnxSettle.bcnxTxn.res",
                sortable: false,
                align: "center",
                editable: true,
                index:'reason',
                width:50
            },
            {
                name: "procc",
                sortable: false,
                align: "center",
                editable: true,
                index:'procc',
                width:100
            },
            {
                name: "rc.code",
                sortable: false,
                align: "center",
                editable: true,
                width:80
            },
            {
                name: "iss",
                sortable: false,
                align: "center",
                editable: true,
                width:80
            },
            {
                name: "acq",
                sortable: false,
                align: "center",
                editable: true,
                width:80
            }
        ],
        rownumbers: true,
        rownumWidth:50,
        rowNum:50,
        rowList:[50,100,150],
        pager: '#pagerOutgoing',
        sortname: 'id',
        sortorder: "desc",
       // autowidth:true,
        shrinkToFit:true,
        height:userHeight,
        width:$(".panel-body").width()-30,
        loadComplete: function() {
            $(this).find(">tbody>tr.jqgrow:odd").addClass("myAltRowClassOdd");
            var ids = tableOutgoing.jqGrid("getDataIDs"), l = ids.length, i, rowId, status;
            for (i = 0; i < l; i++) {
                rowId = ids[i];
                status = $(this).jqGrid("getCell", rowId, "bcnxSettle.bcnxTxn.res");
                if (status !="00" && status !="91") {
                    $('#' + $.jgrid.jqID(rowId)).addClass('myWarningClass');
                }
                if (status ==="91") {
                    $('#' + $.jgrid.jqID(rowId)).addClass('myErrorClass');
                }
            }
        },
        ondblClickRow: function(){
            var selRow = tableOutgoing.jqGrid('getGridParam', 'selrow');
            var rrn = tableOutgoing.jqGrid('getCell', selRow, 'bcnxSettle.bcnxTxn.rrn');
            var proc = tableOutgoing.jqGrid('getCell', selRow, 'procc');
            var slot = tableOutgoing.jqGrid('getCell', selRow, 'slot');
            var stan = tableOutgoing.jqGrid('getCell', selRow, 'stan');
            if(selRow){
                var urlOut = _ip+_acc+"/include/actionOutgoing.html";
                localStorage.setItem("rrnOut", rrn);
                localStorage.setItem("procOut", proc);
                localStorage.setItem("slotOut", slot);
                localStorage.setItem("stanOut", stan);

                $("#dialogOutgoing").dialog({
                    autoOpen: false,
                    height: 700,
                    width: 1000,
                    title: 'Outgoing',
                    modal: true
                });
                $("#dialogOutgoing").load(encodeURI(urlOut));
                $("#dialogOutgoing").dialog("open");
                return false;
            }
        }
    });
    tableOutgoing.jqGrid('navGrid','#pagerOutgoing',{ add:false, edit:false, del:false, search:false, refresh:true });
    //searching data clause by proccessing code and date
    $('#searchOutgoing').click(function(data){
        var card = $('.scard').val();
        var rrn  = $('.srrn').val();
        var stan = $('.sstan').val();
        var proc = $('.act').val();
        var from = $('.ssdate').val();
        var to = $('.sedate').val();

        var urlOutSearch = _ip+_svc+"/outgoing/search?";
        urlOutSearch =urlOutSearch+"usrId="+usr+"&card="+card+"&rrn="+rrn+"&stan="+stan+"&proc="+proc+"%&start="+from+"&end="+to;
        tableOutgoing.setGridParam({url:encodeURI(urlOutSearch)});
        tableOutgoing.trigger("reloadGrid");
    });
});
/********************************************************/
/*End of outgoing action. Updated on 17 FEB 2015 9:34 AM*/
/********************************************************/
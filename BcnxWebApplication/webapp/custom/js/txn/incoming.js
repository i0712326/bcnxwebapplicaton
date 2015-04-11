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
    var urlIn =   _ip+_svc+"/incoming/get";
        urlIn =   urlIn+"?usrId="+usr;
    var tableIncoming =$('#listIncoming');
    tableIncoming.jqGrid({
        url:encodeURI(urlIn),
        datatype: "json",
        colNames:["MTI","Slot","Proc","Date","Time","Card", "RRN","Stan", "PROC","Amount","Fee", "Res", "Action","Reason", "Issuer", "Acquirer"],
        colModel: [
            {
                name: "bcnxSettle.mti",
                sortable: false,
                align: "center",
                editable: true,
                hidden:true
            },
            {
                name: "bcnxSettle.slot",
                sortable: false,
                align: "center",
                editable: true,
                hidden:true
            },
            {
                name: "procc",
                sortable: false,
                align: "center",
                editable: true,
                hidden:true
            },
            {
                name: "date",
                sortable: true,
                align: "center",
                editable: true,
                disabled:false,
                sorttype: "date",
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
                name: "bcnxSettle.stan",
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
                jsonmap:"fee",
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
                width:50
            },
            {
                name: "procc",
                sortable: false,
                align: "center",
                editable: true,
                width:100
            },
            {
                name: "rc.code",
                sortable: true,
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
        loadComplete: function() {
            $(this).find(">tbody>tr.jqgrow:odd").addClass("myAltRowClassOdd");
            var ids = tableIncoming.jqGrid("getDataIDs"), l = ids.length, i, rowId, status, pStatus;
            for (i = 0; i < l; i++) {
                rowId = ids[i];
                status = $(this).jqGrid("getCell", rowId, "bcnxSettle.bcnxTxn.res");
                pStatus = $(this).jqGrid("getCell", rowId, "procc");
                if (status !="00" && status !="91") {
                    $('#' + $.jgrid.jqID(rowId)).addClass('myWarningClass');
                }
                if (status ==="91") {
                    $('#' + $.jgrid.jqID(rowId)).addClass('myErrorClass');
                }
                if(pStatus !="500001" && pStatus !="600001" && pStatus !="700001"){
                    $('#' + $.jgrid.jqID(rowId)).addClass('myResponseClass');
                }
            }
        },
        onSelectRow: function(){

        },
        ondblClickRow: function(){
            var selRow = tableIncoming.jqGrid('getGridParam', 'selrow');
            var rrn = tableIncoming.jqGrid('getCell', selRow, 'bcnxSettle.bcnxTxn.rrn');
            var procc = tableIncoming.jqGrid('getCell', selRow, 'procc');
            var slot = tableIncoming.jqGrid('getCell', selRow, 'bcnxSettle.slot');
            var stan = tableIncoming.jqGrid('getCell', selRow, 'bcnxSettle.stan');
            var mti = tableIncoming.jqGrid('getCell', selRow, 'bcnxSettle.mti');
            if(selRow){
                var urlActIncoming = _ip+_acc+"/include/actionIncoming.html";
                localStorage.setItem("rrnIn", rrn);
                localStorage.setItem("proccIn", procc);
                localStorage.setItem("slotIn", slot);
                localStorage.setItem("stanIn", stan);
                localStorage.setItem("mtiIn", mti);
                localStorage.setItem("usrIn", usr);
                $("#dialogIncoming").dialog({
                    autoOpen: false,
                    height: 650,
                    width: 1000,
                    title: 'Incoming',
                    modal: true
                });
                $("#dialogIncoming").load(encodeURI(urlActIncoming));
                $("#dialogIncoming").dialog("open");
                return false;
            }
        },
        rownumbers: true,
        rownumWidth:50,
        rowNum:50,
        rowList:[50,100,150],
        pager: '#pagerIncoming',
        sortable:true,
        sortname: "date",
        sortorder: "desc",
        viewrecords: true,
       // autowidth:true,
        shrinkToFit:true,
        height:userHeight,
        width:$(".panel-body").width()-30
       // loadonce:true
    });
    tableIncoming.jqGrid('navGrid','#pagerIncoming',{ add:false, edit:false, del:false, search:false, refresh:true });
    //searching data clause by proccessing code and date
    $('#searchIncoming').click(function(data){
        var card = $('.scard').val();
        var rrn  = $('.srrn').val();
        var stan = $('.sstan').val();
        var proc = $('.act').val();
        var from = $('.ssdate').val();
        var to = $('.sedate').val();

        var urlInSearch = _ip+_svc+"/incoming/search?";
        urlInSearch =urlInSearch+"usrId="+usr+"&card="+card+"&rrn="+rrn+"&stan="+stan+"&proc="+proc+"%&start="+from+"&end="+to;
        tableIncoming.setGridParam({url:encodeURI(urlInSearch)});
        tableIncoming.setGridParam({sortname:'date', sortorder: 'desc'}).trigger("reloadGrid");
    });
});
/********************************************************/
/*End of incoming action. Updated on 17 FEB 2015 9:34 AM*/
/********************************************************/
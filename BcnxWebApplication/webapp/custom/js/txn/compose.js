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
    var userId = localStorage.userLogin;
    $(".ccard").focus();
    var userHeight = screen.height-500;
    //table grid transactions
    var tableCompose = $("#composeTxn");
    tableCompose.jqGrid({
        datatype: "json",
        colNames: ["MTI","Location","Date","Time","Card", "RRN","Stan", "PROC","Amount","Fee", "Response","ATM ID", "Issuer", "Acquirer"],
        colModel: [
            {
                name: "mti",
                sortable: false,
                editable: true,
                hidden:true
            },
            {
                name: "bcnxTxn.location",
                sortable: false,
                editable: true,
                hidden:true
            },
            {
                name: "date",
                sortable: false,
                align: "center",
                editable: true,
                disabled:true,
                width:80
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
                name: "bcnxTxn.card",
                sortable: false,
                align: "center",
                editable: true,
                disabled:true,
                width:150
            },
            {
                name: "rrn",
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
                name: "proc",
                align: "center",
                sortable: false,
                editable: true,
                width:100
            },
            {
                name: "amt",
                align: "right",
                sortable: false,
                editable: true,
                formatter:'currency',
                formatoptions: {thousandsSeparator:',',decimalPlaces: 2},
                width:150
            },
            {
                name: "fee",
                jsonmap:"bcnxTxn.fee",
                sortable: false,
                align: "right",
                editable: true,
                formatter:'currency',
                formatoptions: {thousandsSeparator:',',decimalPlaces: 2},
                width:150
            },
            {
                name: "res",
                sortable: false,
                align: "center",
                editable: true,
                width:50
            },
            {
                name: "termId",
                sortable: false,
                align: "center",
                editable: true,
                width:100
            },
            {
                name: "iss",
                sortable: false,
                align: "center",
                editable: true,
                width:100

            },
            {
                name: "acq",
                sortable: false,
                align: "center",
                editable: true,
                width:100
            }
        ],
        loadComplete: function() {
           // $(this).find(">tbody>tr.jqgrow:odd").addClass("myAltRowClassOdd");
            var ids = tableCompose.jqGrid("getDataIDs"), l = ids.length, i, rowId, status;
            for (i = 0; i < l; i++) {
                rowId = ids[i];
                status = $(this).jqGrid("getCell", rowId, "res");
                if (status !="00" && status !="91") {
                    $('#' + $.jgrid.jqID(rowId)).addClass('myWarningClass');
                }
                if (status ==="91") {
                    $('#' + $.jgrid.jqID(rowId)).addClass('myErrorClass');
                }
            }
        },
        ondblClickRow: function(){
            var selRow = tableCompose.jqGrid('getGridParam', 'selrow');
            var rrn = tableCompose.jqGrid('getCell', selRow, 'rrn');
            var card = tableCompose.jqGrid('getCell', selRow, 'bcnxTxn.card');
            var from = $('#frmSearch #sdate').val().trim();
            var to = $('#frmSearch #edate').val().trim();
            if(selRow){
                localStorage.setItem("rrnCom", rrn);
                localStorage.setItem("cardCom", card);
                localStorage.setItem("fromCom", from);
                localStorage.setItem("toCom", to);
                localStorage.setItem("userIdCom", userId);

                var urlComPose = _ip+_acc+"/include/actionCompose.html";
                $("#dialogCompose").dialog({
                    autoOpen: false,
                    height: 700,
                    width: 1000,
                    title: 'Transaction',
                    modal: true
                });
                $("#dialogCompose").load(encodeURI(urlComPose));
                $("#dialogCompose").dialog("open");
                return false;
            }
        },
        height:userHeight,
        width:$(".panel-body").width()-30,
        pager: "#composePager",
        rowNum: 50,
        rownumbers: true,
        viewrecords:true,
        rownumWidth:50,
        rowList: [50, 100, 150],
        jsonReader:{
            root:'rows',
            page:'page',
            total:'total',
            records:'records',
            repeatitems:false
        },
        // autowidth:true,
        shrinkToFit:true
    }).jqGrid('navGrid','#composePager',{ add:false, edit:false, del:false, search:false, refresh:true });
    //search transaction
    $('#searchCompose').click(function(data){
        var card = $('.ccard').val();
        var rrn  = $('.crrn').val();
        var stan = $('.cstan').val();
        var from = $('.csdate').val();
        var to = $('.cedate').val();

        var urlComps = _ip+_svc+"/settle/get?";
        urlComps =urlComps+"card="+card+"&rrn="+rrn+"&stan="+stan+"&from="+from+"&to="+to;
        tableCompose.setGridParam({url:encodeURI(urlComps)});
        tableCompose.trigger("reloadGrid");
    });
});
/****************************************************************/
/*End compose. Updated on 17 FEB 2015 9:34 AM*/
/****************************************************************/
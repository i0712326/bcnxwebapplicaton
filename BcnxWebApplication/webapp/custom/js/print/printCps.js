function PrintElemCom(elem)
{
    Popup($(elem).html());
}

function Popup(data)
{
    var mywindow = window.open('', 'Transaction Action', 'height=400,width=600');
    mywindow.document.write('<html><head><title>my div</title>');
    // mywindow.document.write('<link rel="stylesheet" href="main.css" type="text/css" />');
    mywindow.document.write('</head><body >');
    mywindow.document.write(data);
    mywindow.document.write('</body></html>');

    mywindow.document.close(); // necessary for IE >= 10
    mywindow.focus(); // necessary for IE >= 10

    mywindow.print();
    mywindow.close();

    return true;
}
$(document).ready(function(){
    $(".myPrint").css({
        "float":"right"
    });
    $(".pH4").css({
        "text-decoration": "underline"
    });
    $(".tbPrint").css({
        "font-size": "12px",
        "width":"100%"
    });
    $(".tbPrint1").css({
        "font-size": "12px"
    });
    $(".tbPrint .text-left, .tbPrint1 .text-left").css({
        "text-align": "left"
    });
    $(".tbPrint .text-right, .tbPrint1 .text-right").css({
        "text-align": "right",
        "font-weight": "bold"
    });
    $(".tbPrint .text-center").css({
        "text-align": "center"
    })
    $(".tbPrint .text-bold").css({
        "font-weight": "bold"
    })
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
    var today = dd+'/'+mm+'/'+yyyy;
    var pRrn =localStorage.rrnComP;
    var pProc =localStorage.procComP;
    var pSlot =localStorage.slotComP;
    var pStan =localStorage.stanComP;
    var pNewAmt = localStorage.newAmt;
    var pNewFee = localStorage.newFee;
    var pParam={"rrn":pRrn,"proc":pProc,"slot":pSlot,"stan":pStan};
    var urlPrint=_ip+_svc+"/dispute/get/txn";
    $(".pDate").append(today);
    $.get(urlPrint,pParam, function(list){
        $(list).each(function(index,o){
            var amount = o.amount;
            amount=amount.formatMoney(2);
            var fee = o.fee;
            fee=fee.formatMoney(2);
            var pdAmount = o.bcnxSettle.bcnxTxn.amount
            pdAmount=pdAmount.formatMoney(2);
            var pdFee =  o.bcnxSettle.bcnxTxn.fee;
            pdFee=pdFee.formatMoney(2);
            pNewAmt =parseInt(pNewAmt);
            pNewFee =parseInt(pNewFee);
            pNewAmt = pNewAmt.formatMoney(2);
            pNewFee = pNewFee.formatMoney(2);
            $('.aProc').append(o.rc.procCode.remark);
            $('.aRea').append(o.rc.des);
            $('.aRemark').append(o.remark);
            $('.aAmount').append(pNewAmt);
            $('.aFee').append(pNewFee);
            $('.aDate').append(o.date);
            $('.aStatus').append(o.status);
            $('.pdDate').append(o.bcnxSettle.date);
            $('.pdTime').append(o.bcnxSettle.time);
            $('.pdMti').append(o.bcnxSettle.bcnxTxn.mti);
            $('.pdCard').append(o.bcnxSettle.bcnxTxn.card);
            $('.pdRrn').append(o.bcnxSettle.bcnxTxn.rrn);
            $('.pdProc').append(o.bcnxSettle.bcnxTxn.proc);
            $('.pdAmt').append(pdAmount);
            $('.pdFee').append(pdFee);
            $('.pdRes').append(o.bcnxSettle.bcnxTxn.res);
            $('.pdSlot').append(o.bcnxSettle.bcnxTxn.slot);
            $('.pdStan').append(o.bcnxSettle.bcnxTxn.stan);
            $('.pdMcc').append(o.bcnxSettle.bcnxTxn.mcc);
            $('.pdLoc').append(o.bcnxSettle.bcnxTxn.location);
            $('.pdTrmId').append(o.bcnxSettle.bcnxTxn.termId);
            $('.pdCountry').append(o.bcnxSettle.bcnxTxn.country);
            $('.pdCurr').append(o.bcnxSettle.bcnxTxn.curr);
            $('.pdExp').append(o.bcnxSettle.bcnxTxn.exp);
            $('.pdAppr').append(o.bcnxSettle.bcnxTxn.appr);
            $('.pdPos').append(o.bcnxSettle.bcnxTxn.pos);
            $('.pdConCode').append(o.bcnxSettle.bcnxTxn.condCode);
            $('.pdAcq').append(o.bcnxSettle.bcnxTxn.acq);
            $('.pdIss').append(o.bcnxSettle.bcnxTxn.iss);
            $('.pdType').append(o.bcnxSettle.cardType.type);
            $('.pdCardType').append(o.bcnxSettle.cardType.remark);
            $('.mMember').append(o.user.name);
            $('.mEmail').append(o.user.email);
            $('.mEntry').append(o.user.member.entry);
            $('.mTel').append(o.user.member.tel);
            $('.mFax').append(o.user.member.fax);
            PrintElemCom('#myPrint');
        });
    });
});
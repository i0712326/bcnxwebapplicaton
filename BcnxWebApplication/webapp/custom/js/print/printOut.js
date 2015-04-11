$(document).ready(function(){
    var today = new Date();
    var dd = today.getDate();
    var mm = today.getMonth()+1; //January is 0!
    var yyyy = today.getFullYear();
    if(dd<10){
        dd='0'+dd;
    }
    if(mm<10){
        mm='0'+mm;
    }
    var today = dd+'/'+mm+'/'+yyyy;

    var pRrn =localStorage.rrnOut;
    var pProc =localStorage.procOut;
    var pSlot =localStorage.slotOut;
    var pStan =localStorage.stanOut;
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
            var pdAmount = o.bcnxSettle.bcnxTxn.amount;
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
            $('.aFee').append(pdFee);
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

        });
    });
});
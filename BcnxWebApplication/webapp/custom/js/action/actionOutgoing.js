$(document).ready(function(){
    $('#outgoingTab').tabs();
    var rrn =localStorage.rrnOut;
    var proc =localStorage.procOut;
    var slot =localStorage.slotOut;
    var stan =localStorage.stanOut;
    var param={"rrn":rrn,"proc":proc,"slot":slot,"stan":stan};
    var urlActOut=_ip+_svc+"/dispute/get/txn";
    $.get(urlActOut,param, function(list){
        $(list).each(function(index,o){
            var amount = o.amount;
            amount=amount.formatMoney(2);
            var fee = o.fee;
            fee=fee.formatMoney(2);
            var orgAmount = o.bcnxSettle.bcnxTxn.amount;
            orgAmount=orgAmount.formatMoney(2);
            var orgFee =  o.bcnxSettle.bcnxTxn.fee;
            orgFee=orgFee.formatMoney(2);
            $('.act').append(o.procc+" : "+ o.rc.procCode.remark);
            $('.rea').append(o.rc.code+" : "+ o.rc.des);
            $('.remark').append(o.remark);
            $('.amt').append(amount);
            $('.fee').append(fee);
            $('.curr').append(o.bcnxSettle.bcnxTxn.curr);
            $('.date').append(o.date+" "+ o.time);
            $('.loc').append(o.bcnxSettle.bcnxTxn.location);
            $('.trmId').append(o.bcnxSettle.bcnxTxn.termId);
            $('.iss').append(o.iss);
            $('.acq').append(o.acq);
            $('.status').append(o.status);
            $('.orgDate').append(o.bcnxSettle.date);
            $('.orgTime').append(o.bcnxSettle.time);
            $('.orgMti').append(o.bcnxSettle.bcnxTxn.mti);
            $('.orgCard').append(o.bcnxSettle.bcnxTxn.card);
            $('.orgRrn').append(o.bcnxSettle.bcnxTxn.rrn);
            $('.orgProc').append(o.bcnxSettle.bcnxTxn.proc);
            $('.orgAmt').append(orgAmount);
            $('.orgFee').append(orgFee);
            $('.orgRes').append(o.bcnxSettle.bcnxTxn.res);
            $('.orgSlot').append(o.bcnxSettle.bcnxTxn.slot);
            $('.orgStan').append(o.bcnxSettle.bcnxTxn.stan);
            $('.orgMcc').append(o.bcnxSettle.bcnxTxn.mcc);
            $('.orgLoc').append(o.bcnxSettle.bcnxTxn.location);
            $('.orgTrmId').append(o.bcnxSettle.bcnxTxn.termId);
            $('.orgCountry').append(o.bcnxSettle.bcnxTxn.country);
            $('.orgCurr').append(o.bcnxSettle.bcnxTxn.curr);
            $('.orgExp').append(o.bcnxSettle.bcnxTxn.exp);
            $('.orgAppr').append(o.bcnxSettle.bcnxTxn.appr);
            $('.orgPos').append(o.bcnxSettle.bcnxTxn.pos);
            $('.orgConCode').append(o.bcnxSettle.bcnxTxn.condCode);
            $('.orgAcq').append(o.bcnxSettle.bcnxTxn.acq);
            $('.orgIss').append(o.bcnxSettle.bcnxTxn.iss);
            $('.orgType').append(o.bcnxSettle.cardType.type);
            $('.orgCardType').append(o.bcnxSettle.cardType.remark);
            $('.orcMem').append(o.user.name);
            $('.orgEmail').append(o.user.email);
            $('.orgEntry').append(o.user.member.entry);
            $('.orgTel').append(o.user.member.tel);
            $('.orgFax').append(o.user.member.fax);
            localStorage.setItem("newAmt", o.amount);
            localStorage.setItem("newFee", o.fee);
            var urlPrintOut =_ip+_acc+"/include/printOut.html";
            $(".printOut").load(urlPrintOut);
        });
    });
    $('#btPrintOutgoing').click(function(){
        function PrintOut(elem)
        {
            PopupOut($(elem).html());
        }

        function PopupOut(data)
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

        PrintOut("#printOut");
    });

});
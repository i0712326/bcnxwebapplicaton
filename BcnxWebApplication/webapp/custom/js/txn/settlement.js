$(document).ready(function(){
    var today = new Date();
    var yesterday = new Date();
    yesterday.setDate(today.getDate()-1);
    var dd = yesterday.getDate();
    var mm = yesterday.getMonth()+1; //January is 0!
    var yyyy = yesterday.getFullYear();

    if(dd<10){
        dd='0'+dd
    }
    if(mm<10){
        mm='0'+mm
    }
     yesterday = yyyy+'-'+mm+'-'+dd;

    //var usr =   $('#activeUser').val();
    var usr =   localStorage.userLogin;
    $('#stlDate').val(yesterday);
    $('#stlDate').datepicker({ dateFormat: 'yy-mm-dd' });
    $('.empty').empty();
    var stlDate = $('#stlDate').val();
    var param={"date":stlDate,"id":usr};
    var url=_ip+_svc+"/summary/get";
    $.get(url,param, function(list){
        $(list).each(function(index,o){

            var revAmt = o.revAmt;
            var revFee = o.revFee;
            var revTot = o.revTot;
            revAmt = revAmt.formatMoney(2);
            revFee = revFee.formatMoney(2);
            revTot = revTot.formatMoney(2);
            $('.revNum').append(o.revNum);
            $('.revAmt').append(revAmt);
            $('.revFee').append(revFee);
            $('.revTot').append(revTot);

            var errAmt = o.errAmt;
            var errFee = o.errFee;
            var errTot = o.errTot;
            errAmt = errAmt.formatMoney(2);
            errFee = errFee.formatMoney(2);
            errTot = errTot.formatMoney(2);
            $('.errNum').append(o.errNum);
            $('.errAmt').append(errAmt);
            $('.errFee').append(errFee);
            $('.errTot').append(errTot);


            var outCprAmt = o.ouCprAmt;
            var outCprFee = o.ouCprFee;
            var outCprTot = 0;
            outCprAmt = outCprAmt.formatMoney(2);
            outCprFee = outCprFee.formatMoney(2);
            outCprTot = outCprTot.formatMoney(2);
            $('.outCprNum').append(o.ouCprNum);
            $('.outCprAmt').append(outCprAmt);
            $('.outCprFee').append(outCprFee);
            $('.outCprTot').append(outCprTot);

            var outCrrAmt = o.ouCrsAmt;
            var outCrrFee = o.ouCrsFee;
            var outCrrTot = 0;
            outCrrAmt = outCrrAmt.formatMoney(2);
            outCrrFee = outCrrFee.formatMoney(2);
            outCrrTot = outCrrTot.formatMoney(2);
            $('.outCrrNum').append(o.ouCrsNum);
            $('.outCrrAmt').append(outCrrAmt);
            $('.outCrrFee').append(outCrrFee);
            $('.outCrrTot').append(outCrrTot);

            var inCprAmt = o.inCprAmt;
            var inCprFee = o.inCprFee;
            var inCprTot = 0;
            inCprAmt = inCprAmt.formatMoney(2);
            inCprFee = inCprFee.formatMoney(2);
            inCprTot = inCprTot.formatMoney(2);
            $('.inCprNum').append(o.inCprNum);
            $('.inCprAmt').append(inCprAmt);
            $('.inCprFee').append(inCprFee);
            $('.inCprTot').append(inCprTot);

            var inCrrAmt = o.inCrsAmt;
            var inCrrFee = o.inCrsFee;
            var inCrrTot = 0;
            inCrrAmt = inCrrAmt.formatMoney(2);
            inCrrFee = inCrrFee.formatMoney(2);
            inCrrTot = inCrrTot.formatMoney(2);
            $('.inCrrNum').append(o.inCrsNum);
            $('.inCrrAmt').append(inCrrAmt);
            $('.inCrrFee').append(inCrrFee);
            $('.inCrrTot').append(inCrrTot);


            var issAmt = o.issAmt;
            var issFee = o.issFee;
            var issTot = o.issTot;
            issAmt = issAmt.formatMoney(2);
            issFee = issFee.formatMoney(2);
            issTot = issTot.formatMoney(2);
            $('.issNum').append(o.issNum);
            $('.issAmt').append(issAmt);
            $('.issFee').append(issFee);
            $('.issTot').append(issTot);

            var outChbAmt = o.ouChbAmt;
            var outChbFee = o.ouChbFee;
            var outChbTot = o.ouChbTot;
            outChbAmt = outChbAmt.formatMoney(2);
            outChbFee = outChbFee.formatMoney(2);
            outChbTot = outChbTot.formatMoney(2);
            $('.outChbNum').append(o.ouChbNum);
            $('.outChbAmt').append(outChbAmt);
            $('.outChbFee').append(outChbFee);
            $('.outChbTot').append(outChbTot);

            var inAdjAmt = o.inAdjAmt;
            var inAdjFee = o.inAdjFee;
            var inAdjTot = o.inAdjTot;
            inAdjAmt = inAdjAmt.formatMoney(2);
            inAdjFee = inAdjFee.formatMoney(2);
            inAdjTot = inAdjTot.formatMoney(2);
            $('.inAdjNum').append(o.inAdjNum);
            $('.inAdjAmt').append(inAdjAmt);
            $('.inAdjFee').append(inAdjFee);
            $('.inAdjTot').append(inAdjTot);

            var inRpmAmt = o.inRpmAmt;
            var inRpmFee = o.inRpmFee;
            var inRpmTot = o.inRpmTot;
            inRpmAmt = inRpmAmt.formatMoney(2);
            inRpmFee = inRpmFee.formatMoney(2);
            inRpmTot = inRpmTot.formatMoney(2);
            $('.inRpmNum').append(o.inRpmNum);
            $('.inRpmAmt').append(inRpmAmt);
            $('.inRpmFee').append(inRpmFee);
            $('.inRpmTot').append(inRpmTot);



            var acqAmt = o.acqAmt;
            var acqFee = o.acqFee;
            var acqTot = o.acqTot;
            acqAmt = acqAmt.formatMoney(2);
            acqFee = acqFee.formatMoney(2);
            acqTot = acqTot.formatMoney(2);
            $('.acqNum').append(o.acqNum);
            $('.acqAmt').append(acqAmt);
            $('.acqFee').append(acqFee);
            $('.acqTot').append(acqTot);

            var inChbAmt = o.inChbAmt;
            var inChbFee = o.inChbFee;
            var inChbTot = o.inChbTot;
            inChbAmt = inChbAmt.formatMoney(2);
            inChbFee = inChbFee.formatMoney(2);
            inChbTot = inChbTot.formatMoney(2);
            $('.inChbNum').append(o.inChbNum);
            $('.inChbAmt').append(inChbAmt);
            $('.inChbFee').append(inChbFee);
            $('.inChbTot').append(inChbTot);

            var outAdjAmt = o.ouAdjAmt;
            var outAdjFee = o.ouAdjFee;
            var outAdjTot = o.ouAdjTot;
            outAdjAmt = outAdjAmt.formatMoney(2);
            outAdjFee = outAdjFee.formatMoney(2);
            outAdjTot = outAdjTot.formatMoney(2);
            $('.outAdjNum').append(o.ouAdjNum);
            $('.outAdjAmt').append(outAdjAmt);
            $('.outAdjFee').append(outAdjFee);
            $('.outAdjTot').append(outAdjTot);

            var outRpmAmt = o.ouRpmAmt;
            var outRpmFee = o.ouRpmFee;
            var outRpmTot = o.ouRpmTot;
            outRpmAmt = outRpmAmt.formatMoney(2);
            outRpmFee = outRpmFee.formatMoney(2);
            outRpmTot = outRpmTot.formatMoney(2);
            $('.outRpmNum').append(o.ouRpmNum);
            $('.outRpmAmt').append(outRpmAmt);
            $('.outRpmFee').append(outRpmFee);
            $('.outRpmTot').append(outRpmTot);

            var netAmt = o.netAmt;
            netAmt = netAmt.formatMoney(2);
            $('.total-net-settlement').append(netAmt);

            //download file
            var sltFile= o.setlFile;
            var rcFile= o.recFile;
            var fileDate= o.date;
            var urlD = _ip+_svc+"/summary/download?";
            var urlSetle = urlD+"date="+fileDate+"&usrId="+usr+"&file="+sltFile;
            urlSetle =encodeURI(urlSetle);
            var urlRec = urlD+"date="+fileDate+"&usrId="+usr+"&file="+rcFile;
            urlRec =encodeURI(urlRec);

            var setFile = '<a id="lSetFile" class="lSetFile empty" title="'+o.setlFile+'" href="'+urlSetle+'">'+"<i class='fa fa-download'> Settlement file"+'</a>';
            var recFile = '<a id="lRecFile" class="lRecFile empty" title="'+o.recFile+'" href="'+urlRec+'">'+"<i class='fa fa-download'> Reconciliation file"+'</a>';

            $('.setFile').append(setFile);
            $('.recFile').append(recFile);

        });
    });


   $('#searchSet').click(function(){
       $('.empty').empty();
       var stlDate = $('#stlDate').val();
       var param={"date":stlDate,"id":usr};
       var url=_ip+_svc+"/summary/get";
       $.get(url,param, function(list){
           $(list).each(function(index,o){
               var revAmt = o.revAmt;
               var revFee = o.revFee;
               var revTot = o.revTot;
               revAmt = revAmt.formatMoney(2);
               revFee = revFee.formatMoney(2);
               revTot = revTot.formatMoney(2);
               $('.revNum').append(o.revNum);
               $('.revAmt').append(revAmt);
               $('.revFee').append(revFee);
               $('.revTot').append(revTot);

               var errAmt = o.errAmt;
               var errFee = o.errFee;
               var errTot = o.errTot;
               errAmt = errAmt.formatMoney(2);
               errFee = errFee.formatMoney(2);
               errTot = errTot.formatMoney(2);
               $('.errNum').append(o.errNum);
               $('.errAmt').append(errAmt);
               $('.errFee').append(errFee);
               $('.errTot').append(errTot);


               var outCprAmt = o.ouCprAmt;
               var outCprFee = o.ouCprFee;
               var outCprTot = 0;
               outCprAmt = outCprAmt.formatMoney(2);
               outCprFee = outCprFee.formatMoney(2);
               outCprTot = outCprTot.formatMoney(2);
               $('.outCprNum').append(o.ouCprNum);
               $('.outCprAmt').append(outCprAmt);
               $('.outCprFee').append(outCprFee);
               $('.outCprTot').append(outCprTot);

               var outCrrAmt = o.ouCrsAmt;
               var outCrrFee = o.ouCrsFee;
               var outCrrTot = 0;
               outCrrAmt = outCrrAmt.formatMoney(2);
               outCrrFee = outCrrFee.formatMoney(2);
               outCrrTot = outCrrTot.formatMoney(2);
               $('.outCrrNum').append(o.ouCrsNum);
               $('.outCrrAmt').append(outCrrAmt);
               $('.outCrrFee').append(outCrrFee);
               $('.outCrrTot').append(outCrrTot);

               var inCprAmt = o.inCprAmt;
               var inCprFee = o.inCprFee;
               var inCprTot = 0;
               inCprAmt = inCprAmt.formatMoney(2);
               inCprFee = inCprFee.formatMoney(2);
               inCprTot = inCprTot.formatMoney(2);
               $('.inCprNum').append(o.inCprNum);
               $('.inCprAmt').append(inCprAmt);
               $('.inCprFee').append(inCprFee);
               $('.inCprTot').append(inCprTot);

               var inCrrAmt = o.inCrsAmt;
               var inCrrFee = o.inCrsFee;
               var inCrrTot = 0;
               inCrrAmt = inCrrAmt.formatMoney(2);
               inCrrFee = inCrrFee.formatMoney(2);
               inCrrTot = inCrrTot.formatMoney(2);
               $('.inCrrNum').append(o.inCrsNum);
               $('.inCrrAmt').append(inCrrAmt);
               $('.inCrrFee').append(inCrrFee);
               $('.inCrrTot').append(inCrrTot);


               var issAmt = o.issAmt;
               var issFee = o.issFee;
               var issTot = o.issTot;
               issAmt = issAmt.formatMoney(2);
               issFee = issFee.formatMoney(2);
               issTot = issTot.formatMoney(2);
               $('.issNum').append(o.issNum);
               $('.issAmt').append(issAmt);
               $('.issFee').append(issFee);
               $('.issTot').append(issTot);

               var outChbAmt = o.ouChbAmt;
               var outChbFee = o.ouChbFee;
               var outChbTot = o.ouChbTot;
               outChbAmt = outChbAmt.formatMoney(2);
               outChbFee = outChbFee.formatMoney(2);
               outChbTot = outChbTot.formatMoney(2);
               $('.outChbNum').append(o.ouChbNum);
               $('.outChbAmt').append(outChbAmt);
               $('.outChbFee').append(outChbFee);
               $('.outChbTot').append(outChbTot);

               var inAdjAmt = o.inAdjAmt;
               var inAdjFee = o.inAdjFee;
               var inAdjTot = o.inAdjTot;
               inAdjAmt = inAdjAmt.formatMoney(2);
               inAdjFee = inAdjFee.formatMoney(2);
               inAdjTot = inAdjTot.formatMoney(2);
               $('.inAdjNum').append(o.inAdjNum);
               $('.inAdjAmt').append(inAdjAmt);
               $('.inAdjFee').append(inAdjFee);
               $('.inAdjTot').append(inAdjTot);

               var inRpmAmt = o.inRpmAmt;
               var inRpmFee = o.inRpmFee;
               var inRpmTot = o.inRpmTot;
               inRpmAmt = inRpmAmt.formatMoney(2);
               inRpmFee = inRpmFee.formatMoney(2);
               inRpmTot = inRpmTot.formatMoney(2);
               $('.inRpmNum').append(o.inRpmNum);
               $('.inRpmAmt').append(inRpmAmt);
               $('.inRpmFee').append(inRpmFee);
               $('.inRpmTot').append(inRpmTot);



               var acqAmt = o.acqAmt;
               var acqFee = o.acqFee;
               var acqTot = o.acqTot;
               acqAmt = acqAmt.formatMoney(2);
               acqFee = acqFee.formatMoney(2);
               acqTot = acqTot.formatMoney(2);
               $('.acqNum').append(o.acqNum);
               $('.acqAmt').append(acqAmt);
               $('.acqFee').append(acqFee);
               $('.acqTot').append(acqTot);

               var inChbAmt = o.inChbAmt;
               var inChbFee = o.inChbFee;
               var inChbTot = o.inChbTot;
               inChbAmt = inChbAmt.formatMoney(2);
               inChbFee = inChbFee.formatMoney(2);
               inChbTot = inChbTot.formatMoney(2);
               $('.inChbNum').append(o.inChbNum);
               $('.inChbAmt').append(inChbAmt);
               $('.inChbFee').append(inChbFee);
               $('.inChbTot').append(inChbTot);

               var outAdjAmt = o.ouAdjAmt;
               var outAdjFee = o.ouAdjFee;
               var outAdjTot = o.ouAdjTot;
               outAdjAmt = outAdjAmt.formatMoney(2);
               outAdjFee = outAdjFee.formatMoney(2);
               outAdjTot = outAdjTot.formatMoney(2);
               $('.outAdjNum').append(o.ouAdjNum);
               $('.outAdjAmt').append(outAdjAmt);
               $('.outAdjFee').append(outAdjFee);
               $('.outAdjTot').append(outAdjTot);

               var outRpmAmt = o.ouRpmAmt;
               var outRpmFee = o.ouRpmFee;
               var outRpmTot = o.ouRpmTot;
               outRpmAmt = outRpmAmt.formatMoney(2);
               outRpmFee = outRpmFee.formatMoney(2);
               outRpmTot = outRpmTot.formatMoney(2);
               $('.outRpmNum').append(o.ouRpmNum);
               $('.outRpmAmt').append(outRpmAmt);
               $('.outRpmFee').append(outRpmFee);
               $('.outRpmTot').append(outRpmTot);


               var netAmt = o.netAmt;
               netAmt = netAmt.formatMoney(2);
               $('.total-net-settlement').append(netAmt);

               //download file
               var sltFile= o.setlFile;
               var rcFile= o.recFile;
               var fileDate= o.date;
               var urlD = _ip+_svc+"/summary/download?";
               var urlSetle = urlD+"date="+fileDate+"&usrId="+usr+"&file="+sltFile;
               urlSetle =encodeURI(urlSetle);
               var urlRec = urlD+"date="+fileDate+"&usrId="+usr+"&file="+rcFile;
               urlRec =encodeURI(urlRec);

               var setFile = '<a id="lSetFile" class="lSetFile empty" title="'+o.setlFile+'" href="'+urlSetle+'">'+"<i class='fa fa-download'> Settlement file"+'</a>';
               var recFile = '<a id="lRecFile" class="lRecFile empty" title="'+o.recFile+'" href="'+urlRec+'">'+"<i class='fa fa-download'> Reconciliation file"+'</a>';

               $('.setFile').append(setFile);
               $('.recFile').append(recFile);

           });
       });

   });
});
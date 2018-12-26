

function ticketprocess(){

    if (localStorage.userid != undefined && localStorage.log != undefined){
           
           var phone = $("#tmobile").val();
           var desc = $("#tdesc").val();
           if (phone != "" && desc != ""){

            var nilai = '{ "custid":"'+localStorage.userid+'","name":"'+localStorage.user+'","phone":"'+phone+'","description":"'+desc+'" }';
            $.ajax({
                type: 'POST',
                url: api+"api/complain",
                data:  nilai,
                dataType: 'json',
                success: function(data) {
                    toast('No Ticket Keluhan Anda : '+data.error);
                    setTimeout(function(){ window.location = "index.html"; }, 3500);
                },
                error: function(e) 
                {
                    var stts = JSON.parse(e.responseText);
                    if (e.status === 401){
                        toast(stts.error); 
                    }else{
                        toast('Failed to communicate to server');
                    }
                } 
            })
            return false;   

           }else{ toast('No Handphone & Keterangan Diperlukan'); }
    }
}
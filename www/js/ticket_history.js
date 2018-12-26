var start = 0;
var limit = 5;
var reachedMax = false;

get_order();

$(window).scroll(function(){    
    if ($(window).scrollTop() == $(document).height() - $(window).height()){
        get_order();
    }
});

function get_order(){
       
    $(document).ready(function (e) {   
        
        var nilai = '{ "custid":"'+localStorage.userid+'", "limit":"'+limit+'", "start":"'+start+'" }';
        
        if (reachedMax)
            return;

        $.ajax({
            type: 'POST',
            url: api+'api/get_complain',
            data : nilai,
            dataType: 'json',
            success: function(data)
            {   
                var con = "";
                var total = 0;
if (data.content != null && data.content != 'reachedMax'){

                for (i=0; i<data.content.length; i++){
                    var datax = data.content;
                    total = parseInt(datax[i].total)+parseInt(datax[i].shipping);

con = con+
"<div class=\"rw\">"+
"<div class=\"container-fluid\">"+
    "<span class=\"ff2\" style=\"padding-right: 25px;\">"+datax[i].ticketno+"</span>"+
    "<span class=\"date\">"+datax[i].dates+"</span>"+
    "<span class=\"ff2\" style=\"float: right;\">"+datax[i].status.toUpperCase()+"</span>"+
    "<hr style=\"margin: 0;padding: 3px 0;\">"+

    "<div class=\"col-xs-9\" style=\"padding: 0\">"+
        "<h5 style=\"font-weight: bold;\">"+localStorage.user+"</h5>"+
        "<span style=\"font-size: 11px;\">"+datax[i].description+"</span>"+
    "</div>"+
    "<div class=\"col-xs-12 mtop\" style=\"padding: 0;\">"+
        "<span> <b> Pelapor : </b> "+datax[i].reporter+" / "+datax[i].reporter_phone+" </span> &nbsp; "+
    "</div>"+
"</div>"+
"</div> <br>";
                
                } // end looping
                start += limit;
                $("#successbox").append(con);
}else{ reachedMax = true; }

            },
            error: function (request, status, error) {
                console.log('Request Failed...!'+error);
            }
        })
        return false;
                
    });  // end document ready	    
}
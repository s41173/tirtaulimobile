var api = "http://api.delica.co.id/cirest/index.php/";

$(document).ready(function () {

   $(document).ajaxStart(function(){
       $(".loader").css("display", "block");
   });
   $(document).ajaxComplete(function(){
       $(".loader").css("display", "none");
   });

   $(document).ajaxError(function(e){
     //  toast("No Internet Connection..!!");
     //  setTimeout(function(){ navigator.app.exitApp(); }, 3500);
   });

}); // end document ready

function toast(msg) {
   var x = document.getElementById("snackbar");
   x.innerHTML=msg;
   x.className = "show";
   setTimeout(function(){ x.className = x.className.replace("show", ""); }, 3000);
}

function toastpop(msg) {
   var x = document.getElementById("snackbarpop");
   x.innerHTML=msg;
   x.className = "show";
   setTimeout(function(){ x.className = x.className.replace("show", ""); }, 3000);
}

function capitalizeFirstLetter(string) {
   return string.charAt(0).toUpperCase() + string.slice(1);
}

function idr_format(val){
   while (/(\d+)(\d{3})/.test(val.toString())){
       val = val.toString().replace(/(\d+)(\d{3})/, '$1'+'.'+'$2');
   }
   var val = val;
   return val;
}

function otentikasi(page){
    
    $(document).ready(function(e){  

        var bodyId = document.body.id;   
        var nilai = '{ "custid":"'+localStorage.userid+'", "log":"'+localStorage.log+'" }';
        var mess = null;
        
        $.ajax({
            type: 'POST',
            url: api+'api/otentikasi',
            data : nilai,
            // contentType: "application/json",
            dataType: 'json',
            success: function(data)
            {},
            error: function (e) {
              
                if (page == 'ongoing'){ mess = "Please login to view your order"; }
                else if (page == 'wallet'){ mess = "Please login to view your balance"; }
                else if (page == 'book'){ mess = "Please login to view your book page"; }
                else if (page == 'order'){ mess = "Please login to view the order history page"; }
                else if (page == 'profil'){ mess = "Please login to view the profile page"; }
                else if (page == 'index'){ mess = "Please login to use this application"; }
                else if (page == 'topup'){ mess = "Please login to use topup application"; }
                
                var stts = JSON.parse(e.responseText);
                if (e.status === 401){
                    localStorage.removeItem("instalasi");
                    localStorage.removeItem("userid");
                    localStorage.removeItem("log");
                    toast(mess);
                    setTimeout(function(){ window.location = "login.html"; }, 3500);
                }else{
                    toast('Failed to communicate to server');
                    setTimeout(function(){ navigator.app.exitApp(); }, 3000);
                }
            }
        })
        return false;

    }); // end document ready
}

function logout(){

    // localStorage.removeItem("instalasi");
    // localStorage.removeItem("userid");
    // localStorage.removeItem("user");
    // localStorage.removeItem("log");
    // window.location = "login.html";

    navigator.notification.confirm('Are you sure want to logout ?'
            , function(button) {
                if (button == 2 || button == 0) {
       localStorage.removeItem("instalasi");
       localStorage.removeItem("userid");
       localStorage.removeItem("user");
       localStorage.removeItem("log");
        window.location = "login.html";
                }
            }
            , 'Logout ?'
            , ['No way', 'Logout']
    );
}

// ----------------------------- acl --------------------------------------------------------
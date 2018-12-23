
profil();
function profil(){
    
    var urlx = 'http://www.pdamtirtauli.com/cc/index.php/api/customers';
    if (localStorage.userid != undefined && localStorage.log != undefined){
        
        var nilai = '{ "no_pelanggan":"'+localStorage.instalasi+'", "id_pelanggan":"", "no_meter":"", "nama_pelanggan":"" }';
        $.ajax({
			type: 'POST',
			url: urlx,
			data:  nilai,
            contentType: "application/json",
            dataType: 'json',
			success: function(data) {
                var datax = data[0];
                $("#name").html(capitalizeFirstLetter(datax.Nama_Pelanggan));
                $("#ic").html(datax.ID_Pelanggan+" / "+datax.Jenis_Pelanggan);
                $("#instalasi").html(datax.No_Pelanggan);
                $("#metercode").html(datax.No_Meter);
                $("#address").html(datax.Alamat+' - '+datax.No_Rumah);
			},
			error: function(e) 
	    	{
                var stts = JSON.parse(e.responseText);
                if (e.status === 401){
                    toast(stts.error);
                }else{
                    toast('Failed to communicate to server');
                    setTimeout(function(){ navigator.app.exitApp(); }, 3000);
                }
	    	} 
		})
		return false;


    }else{
        setTimeout(function(){ window.location = "index.html"; }, 1000);
    }

}
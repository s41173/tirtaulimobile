
function setitem(){
    document.getElementById("tinstalasi").value = localStorage.instalasi;
}

function infoair(){

    if (localStorage.userid != undefined && localStorage.log != undefined){
           
           var urlx = 'http://www.pdamtirtauli.com/cc/index.php/api/infoair';
           var num = $("#tinstalasi").val();
           if (num != ""){

            var nilai = '{ "instalasi":"'+num+'" }';
            $.ajax({
                type: 'POST',
                url: urlx,
                data:  nilai,
                dataType: 'json',
                success: function(data) {
var result = "";                  
for (i=0; i<data.length; i++){   
    var trans = data[i];  
    result = result+"<tr> <td>"+trans.bulan+"-"+trans.tahun+"</td> <td>"+trans.pakai+" <sup>m3</sup> </td> <td>"+idr_format(trans.Jumlah)+"</td> <td>"+trans.lunas.toUpperCase()+"</td> </tr>";
}
$("#titleair").show();
$("#tableair").html("<tr> <th> Bulan </th> <th> Pemakaian </th> <th> Jumlah </th> <th> Ket </th> </tr>");
$("#tableair").append(result);
infononair();
                },
                error: function(e) 
                {
                    var stts = JSON.parse(e.responseText);
                    if (e.status === 404){
                        toast('Data tidak ditemukan');   
                    }else{
                        toast('Failed to communicate to server');
                    }
                } 
            })
            return false;   

           }else{ toast('Customer Phone No Required'); }
    }
}

function infononair(){

    if (localStorage.userid != undefined && localStorage.log != undefined){
           
           var urlx = 'http://www.pdamtirtauli.com/cc/index.php/api/infononair';
           var num = $("#tinstalasi").val();
           if (num != ""){

            var nilai = '{ "instalasi":"'+num+'" }';
            $.ajax({
                type: 'POST',
                url: urlx,
                data:  nilai,
                dataType: 'json',
                success: function(data) {              
var result = "";                  
for (i=0; i<data.length; i++){   
    var trans = data[i];  
    result = result+"<tr> <td>"+trans.bulan+"-"+trans.tahun+"</td> <td>"+trans.bukti1+"</td> <td>"+idr_format(trans.tagihan)+"</td> <td>"+trans.lunas.toUpperCase()+"</td> </tr>";
}
$("#titlenonair").show();
$("#tablenonair").html("<tr> <th> Bulan </th> <th> Referensi </th> <th> Jumlah </th> <th> Ket </th> </tr>");
$("#tablenonair").append(result);

                },
                error: function(e) 
                {
                    var stts = JSON.parse(e.responseText);
                    if (e.status === 404){
                        toast('Data Non Air tidak ditemukan');   
                    }else{
                        toast('Failed to communicate to server');
                    }
                } 
            })
            return false;   

           }else{ toast('Customer Phone No Required'); }
    }
}
$(document).ready(function() {
  $("#btnOk").click(function(){
    var city=$("#city").val();
    var code=$("#code").val();
    if(city.length>1){
      var urllink='http://api.openweathermap.org/data/2.5/weather?q=';
      urllink=urllink + city;
      if(code.length==2){
           urllink=urllink+','+code;
      }
      urllink=urllink+'&appid=86c5542317996d1c59638a917b09c0b8';

       $.ajax({
         url: urllink,
         data : { format: 'json' } ,// nemusi tu byt lebo neposielam žiadne data len prijmam 
         error : function(){ // ked nastane chyba a nepošle mi data
         // vypis chyby
         },
         dataType: 'json',
         success : function(data){ // ak je všetko ok pošle mi data 
            console.log("temp:"+data.main.temp);
            console.log("desc:"+data.weather[0].description); //[] pretože je to v poli 
         },
         type: 'GET' //  ked príjmam data  použijem GET

      });

    }
  });

});
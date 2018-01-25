
$(document).ready(function() {
   $('#btnOk').click(function() {
       var city=$("#city").val();
       var code=$("#code").val();
       
       if(city.length>1){
          var urllink='http://api.openweathermap.org/data/2.5/weather?q=';
           urllink=urllink + city;
           if(code.length==2)
               urllink=urllink+','+code;
           urllink=urllink+'&appid=86c5542317996d1c59638a917b09c0b8'
           
           $.ajax({
                url: urllink,
                data : { format: 'json' },  
            error : function(){
             //vypis chyby ak zlyha komunikacia so serverom
                $('.mainTable').html("Error! Invalid request!");
           },
            dataType: 'json',
            success : function(data){
                
                //dynamic table
                $('.mainTable').empty();
                var table=$('<table/>');
                var tr=getLine('City:', city);
                table.append(tr);
                $('.mainTable').append(table);
                
                var tr=getLine('Country:', $('#code').val());
                table.append(tr);
                
                var tr=getLine('Temperature:', parseFloat(data.main.temp-273.15).toFixed(1)+" ℃");
                table.append(tr);
                
                var tr=getLine('Humidity:', data.main.humidity+" %");
                table.append(tr);
                
                var tr=getLine('Description:', data.weather[0].description);
                table.append(tr);
                
                var tr=getLine('Pressure:', data.main.pressure+' hPa');
                table.append(tr);
                
                if($("#details").is(":checked") == true){
                    
                    
                    var tr=getLine('Sunrise:', data.sys.sunrise);
                    table.append(tr);
                    
                    var tr=getLine('Sunset:', data.sys.sunset);
                    table.append(tr);
                    
                    var tr=getLine('Wind:', data.wind.speed+' m/s');
                    table.append(tr); 
                    
                    var tr=getLine('Min temperature:', parseFloat(data.main.temp_min-273.15).toFixed(1)+" ℃");
                    table.append(tr);
                    
                    var tr=getLine('Max temperature:', parseFloat(data.main.temp_max-273.15).toFixed(1)+" ℃");
                    table.append(tr);
                    
                    var tr=getLine('Visibility:', data.visibility);
                    table.append(tr);
                };
                
            },
            type: 'GET'
           }); //AJAX
           
       } //if city.length riadok 5
       
   }); // CLICK
    
    function getLine(data1,data2){
        var tr=$('<tr/>');
        var td1=$('.<td/>');
        $(td1).append(data1);
        var td2=$('<td/>');
        $(td2).append(data2);
        tr.append(td1);
        tr.append(td2); 
        
        return tr;
    };
    
}); // READY

